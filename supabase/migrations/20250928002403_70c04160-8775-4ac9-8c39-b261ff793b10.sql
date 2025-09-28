-- Fix security issues found in the database linter
-- Remove SECURITY DEFINER from view and add proper search_path to functions

-- Fix view security issue
drop view if exists public.v_user_overview;
create or replace view public.v_user_overview as
select u.id as user_id, u.email, u.nome, u.subscription_status, u.trial_end_at,
       u.altura_cm, u.peso_kg, public.fn_user_bmi(u.id) as bmi,
       pm.year, pm.month, pm.total_calories, pm.workouts_count, pm.total_time_seconds
from public.users u
left join lateral (
  select * from public.progress_monthly p
  where p.user_id=u.id
  order by p.year desc, p.month desc
  limit 1
) pm on true;

-- Fix search_path for all functions
create or replace function public.set_updated_at()
returns trigger language plpgsql 
security definer set search_path = public
as $$
begin new.updated_at := now(); return new; end $$;

create or replace function public.fn_calculate_bmi(weight_kg numeric, height_cm numeric)
returns numeric language plpgsql 
security definer set search_path = public
as $$
declare h_m numeric;
begin
  if weight_kg is null or height_cm is null or height_cm = 0 then return null; end if;
  h_m := height_cm/100.0;
  return round(weight_kg/(h_m*h_m),2);
end $$;

create or replace function public.fn_user_bmi(u_id uuid)
returns numeric language sql
security definer set search_path = public
as $$
  select public.fn_calculate_bmi(peso_kg, altura_cm) from public.users where id = u_id;
$$;

create or replace function public.fn_progress_upsert(
  p_user_id uuid,
  p_ts timestamptz,
  p_add_calories int default 0,
  p_workout_added boolean default false,
  p_sets int default 0,
  p_reps int default 0,
  p_time_seconds int default 0,
  p_bpm int default null,
  p_load_kg numeric default null
) returns void language plpgsql 
security definer set search_path = public
as $$
declare y int := extract(year from p_ts);
        m int := extract(month from p_ts);
        bmi_val numeric := public.fn_user_bmi(p_user_id);
        weight_val numeric := (select peso_kg from public.users where id=p_user_id);
begin
  insert into public.progress_monthly as pm
    (user_id, year, month, total_calories, workouts_count, total_sets, total_reps, total_time_seconds, avg_bpm, avg_load_kg, weight_kg_avg, bmi_avg)
  values
    (p_user_id, y, m, p_add_calories, case when p_workout_added then 1 else 0 end, p_sets, p_reps, p_time_seconds, p_bpm, p_load_kg, weight_val, bmi_val)
  on conflict (user_id, year, month) do update set
    total_calories = coalesce(pm.total_calories,0)+excluded.total_calories,
    workouts_count = coalesce(pm.workouts_count,0)+excluded.workouts_count,
    total_sets = coalesce(pm.total_sets,0)+excluded.total_sets,
    total_reps = coalesce(pm.total_reps,0)+excluded.total_reps,
    total_time_seconds = coalesce(pm.total_time_seconds,0)+excluded.total_time_seconds,
    avg_bpm = case
      when pm.avg_bpm is null and excluded.avg_bpm is not null then excluded.avg_bpm
      when pm.avg_bpm is not null and excluded.avg_bpm is not null then round((pm.avg_bpm+excluded.avg_bpm)/2.0,2)
      else pm.avg_bmp end,
    avg_load_kg = case
      when pm.avg_load_kg is null and excluded.avg_load_kg is not null then excluded.avg_load_kg
      when pm.avg_load_kg is not null and excluded.avg_load_kg is not null then round((pm.avg_load_kg+excluded.avg_load_kg)/2.0,2)
      else pm.avg_load_kg end,
    weight_kg_avg = case
      when pm.weight_kg_avg is null and excluded.weight_kg_avg is not null then excluded.weight_kg_avg
      when pm.weight_kg_avg is not null and excluded.weight_kg_avg is not null then round((pm.weight_kg_avg+excluded.weight_kg_avg)/2.0,2)
      else pm.weight_kg_avg end,
    bmi_avg = case
      when pm.bmi_avg is null and excluded.bmi_avg is not null then excluded.bmi_avg
      when pm.bmi_avg is not null and excluded.bmi_avg is not null then round((pm.bmi_avg+excluded.bmi_avg)/2.0,2)
      else pm.bmi_avg end,
    updated_at = now();
end $$;

create or replace function public.fn_plan_state(u_id uuid)
returns text language sql
security definer set search_path = public
as $$
  select case
    when (u.subscription_status = 'trialing' and (u.trial_end_at is not null and now() <= u.trial_end_at))
      then 'free_trial'
    when u.subscription_status = 'active'
      then 'premium'
    else 'no_ia'
  end
  from public.users u
  where u.id = u_id;
$$;

create or replace function public.fn_plan_limits(u_id uuid)
returns table(meal_limit int, msg_limit int) language sql
security definer set search_path = public
as $$
  select case when s='free_trial' then 1 when s='premium' then 5 else 0 end as meal_limit,
         case when s='free_trial' then 10 when s='premium' then 30 else 0 end as msg_limit
  from (select public.fn_plan_state(u_id) as s) t;
$$;

create or replace function public.fn_check_limit(u_id uuid, feature text)
returns table(allowed boolean, remaining int) language plpgsql
security definer set search_path = public
as $$
declare d date := now()::date;
        meal_l int; msg_l int;
        usage_rec public.usage_limits;
        cur int;
begin
  select meal_limit, msg_limit into meal_l, msg_l from public.fn_plan_limits(u_id);
  select * into usage_rec from public.usage_limits where user_id=u_id and date=d;
  if usage_rec.id is null then
    insert into public.usage_limits(user_id, date) values (u_id, d) returning * into usage_rec;
  end if;

  if feature = 'meal' then
    cur := coalesce(usage_rec.meal_count,0);
    return query select (cur < meal_l) as allowed, greatest(meal_l - cur, 0) as remaining;
  elsif feature = 'msg' then
    cur := coalesce(usage_rec.msg_count,0);
    return query select (cur < msg_l) as allowed, greatest(msg_l - cur, 0) as remaining;
  else
    return query select false, 0;
  end if;
end $$;

create or replace function public.fn_increment_limit(u_id uuid, feature text, inc int default 1)
returns void language plpgsql
security definer set search_path = public
as $$
declare d date := now()::date;
begin
  insert into public.usage_limits(user_id, date) values (u_id, d)
  on conflict (user_id, date) do nothing;

  if feature = 'meal' then
    update public.usage_limits set meal_count = coalesce(meal_count,0) + inc
    where user_id=u_id and date=d;
  elsif feature = 'msg' then
    update public.usage_limits set msg_count = coalesce(msg_count,0) + inc
    where user_id=u_id and date=d;
  end if;
end $$;

create or replace function public.fn_reset_limits()
returns void language plpgsql
security definer set search_path = public
as $$
begin
  delete from public.usage_limits where date < current_date;
end $$;

create or replace function public.trg_meal_aggregate()
returns trigger language plpgsql
security definer set search_path = public
as $$
declare rec record;
begin
  rec := coalesce(new, old);
  if tg_op='INSERT' then
    perform public.fn_progress_upsert(rec.user_id, coalesce(rec.captured_at, rec.created_at), coalesce(rec.calories_estimated,0));
  elsif tg_op='UPDATE' then
    perform public.fn_progress_upsert(rec.user_id, coalesce(rec.captured_at, rec.created_at),
      greatest(coalesce(new.calories_estimated,0)-coalesce(old.calories_estimated,0),0));
  end if;
  return rec;
end $$;

create or replace function public.trg_workout_aggregate()
returns trigger language plpgsql
security definer set search_path = public
as $$
declare ts timestamptz := coalesce(new.performed_at, new.created_at);
begin
  if tg_op='INSERT' then
    perform public.fn_progress_upsert(new.user_id, ts, 0, true,
      coalesce(new.sets,0), coalesce(new.reps,0), coalesce(new.time_seconds,0), new.bpm, new.load_kg);
  elsif tg_op='UPDATE' then
    perform public.fn_progress_upsert(new.user_id, ts, 0, false,
      coalesce(new.sets,0), coalesce(new.reps,0), coalesce(new.time_seconds,0), new.bpm, new.load_kg);
  end if;
  return new;
end $$;