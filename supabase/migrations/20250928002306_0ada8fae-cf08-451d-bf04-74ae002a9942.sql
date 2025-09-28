-- 001_init.sql — Alimentação Inteligente APP
-- Requisitos: Postgres 15+, Supabase

-- ========== EXTENSÕES ==========
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- ========== ENUMS ==========
do $$
begin
  if not exists (select 1 from pg_type where typname = 'gender') then
    create type public.gender as enum ('masculino','feminino','outro','nao_declara');
  end if;
  if not exists (select 1 from pg_type where typname = 'activity_level') then
    create type public.activity_level as enum ('sedentario','ligeiro','moderado','intenso','atleta');
  end if;
  if not exists (select 1 from pg_type where typname = 'subscription_status') then
    create type public.subscription_status as enum ('incomplete','trialing','active','past_due','canceled','unpaid');
  end if;
  if not exists (select 1 from pg_type where typname = 'event_source') then
    create type public.event_source as enum ('web','mobile','webhook_shopify','cron','system');
  end if;
end$$;

-- ========== HELPERS ==========
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

-- ========== TABELAS PRINCIPAIS ==========
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  nome text,
  foto_url text,
  lingua text default 'pt-PT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Saúde/perfil
  altura_cm numeric(5,2),
  peso_kg numeric(6,2),
  sexo public.gender default 'nao_declara',
  data_nascimento date,
  nivel_atividade public.activity_level default 'moderado',
  objetivo text,
  alergias text[],
  preferencias text[],

  -- Subscrição/estado
  subscription_status public.subscription_status default 'incomplete',
  plano_atual text default 'free', -- 'free'|'premium' (indicativo)
  trial_end_at timestamptz,
  ingestao_calorica_alvo integer,

  -- Consentimentos
  consent_marketing boolean default false,
  consent_terms boolean default false,
  consent_privacy boolean default false
);
create trigger trg_users_updated before update on public.users
for each row execute function public.set_updated_at();
create index if not exists idx_users_email on public.users(email);
create index if not exists idx_users_subscription_status on public.users(subscription_status);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  shopify_customer_id text,
  shopify_subscription_id text,
  plan_name text not null,
  price_eur numeric(10,2) not null default 14.99,
  currency text default 'EUR',
  status public.subscription_status not null default 'incomplete',
  trial_start_at timestamptz,
  trial_end_at timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_end boolean default false,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  raw_payload jsonb
);
create trigger trg_subs_updated before update on public.subscriptions
for each row execute function public.set_updated_at();
create index if not exists idx_subs_user on public.subscriptions(user_id);
create index if not exists idx_subs_status on public.subscriptions(status);

create table if not exists public.meal_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  image_url text not null,
  captured_at timestamptz default now(),
  analyzed_at timestamptz,
  ai_model text,
  calories_estimated integer,
  ingredients jsonb,
  nutrients jsonb,
  suggestions jsonb,
  confidence numeric(4,3),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_meals_updated before update on public.meal_images
for each row execute function public.set_updated_at();
create index if not exists idx_meals_user on public.meal_images(user_id);
create index if not exists idx_meals_created on public.meal_images(created_at);

create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  week_day int check (week_day between 1 and 7),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_workouts_updated before update on public.workouts
for each row execute function public.set_updated_at();
create index if not exists idx_workouts_user on public.workouts(user_id);
create index if not exists idx_workouts_weekday on public.workouts(week_day);

create table if not exists public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  exercise_name text not null,
  order_index int default 1,
  sets int,
  reps int,
  time_seconds int,
  bpm int,
  load_kg numeric(6,2),
  rpe numeric(3,1),
  rest_seconds int,
  performed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_workoutex_updated before update on public.workout_exercises
for each row execute function public.set_updated_at();
create index if not exists idx_workoutex_user on public.workout_exercises(user_id);
create index if not exists idx_workoutex_workout on public.workout_exercises(workout_id);
create index if not exists idx_workoutex_performed on public.workout_exercises(performed_at);

create table if not exists public.progress_monthly (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  year int not null,
  month int not null check (month between 1 and 12),
  total_calories int default 0,
  workouts_count int default 0,
  total_sets int default 0,
  total_reps int default 0,
  total_time_seconds int default 0,
  avg_bpm numeric(5,2),
  avg_load_kg numeric(6,2),
  weight_kg_avg numeric(6,2),
  bmi_avg numeric(5,2),
  updated_at timestamptz not null default now(),
  unique(user_id, year, month)
);
create index if not exists idx_progress_user on public.progress_monthly(user_id);

-- Limites diários
create table if not exists public.usage_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  date date not null,
  meal_count int default 0,
  msg_count int default 0,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);
create index if not exists idx_usage_user_date on public.usage_limits(user_id, date);

-- Logs técnicos
create table if not exists public.events_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  source public.event_source not null,
  event_type text not null,
  occurred_at timestamptz not null default now(),
  payload jsonb,
  signature_valid boolean,
  http_status int,
  error_message text
);
create index if not exists idx_events_user on public.events_log(user_id);
create index if not exists idx_events_type on public.events_log(event_type);

-- Fila de notificações
create table if not exists public.notifications_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null, -- 'welcome','trial_ending','monthly_report','limit_alert','payment_failed'
  payload jsonb,
  status text not null default 'pending', -- pending, processing, sent, failed
  tries int not null default 0,
  scheduled_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_notifications_status on public.notifications_queue(status);

-- Registo de peso
create table if not exists public.weights_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  peso_kg numeric(6,2),
  altura_cm numeric(5,2),
  data_registo timestamptz not null default now()
);
create index if not exists idx_weights_user on public.weights_log(user_id);

-- ========== FUNÇÕES DE NEGÓCIO ==========
-- BMI
create or replace function public.fn_calculate_bmi(weight_kg numeric, height_cm numeric)
returns numeric language plpgsql as $$
declare h_m numeric;
begin
  if weight_kg is null or height_cm is null or height_cm = 0 then return null; end if;
  h_m := height_cm/100.0;
  return round(weight_kg/(h_m*h_m),2);
end $$;

create or replace function public.fn_user_bmi(u_id uuid)
returns numeric language sql as $$
  select public.fn_calculate_bmi(peso_kg, altura_cm) from public.users where id = u_id;
$$;

-- Upsert de progresso mensal
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
) returns void language plpgsql as $$
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
      else pm.avg_bpm end,
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

-- Sumário semanal
create or replace function public.fn_progress_weekly(u_id uuid)
returns table(
  from_date date, to_date date,
  total_calories int, workouts_count int, total_sets int, total_reps int, total_time_seconds int
) language sql security definer set search_path=public as $$
  select (now()-interval '6 days')::date, now()::date,
    coalesce(sum(mi.calories_estimated),0),
    coalesce(count(distinct we.performed_at::date),0),
    coalesce(sum(we.sets),0),
    coalesce(sum(we.reps),0),
    coalesce(sum(we.time_seconds),0)
  from public.users u
  left join public.meal_images mi on mi.user_id=u.id and mi.created_at >= (now()-interval '7 days')
  left join public.workout_exercises we on we.user_id=u.id and we.performed_at >= (now()-interval '7 days')
  where u.id = u_id;
$$;

-- Duplicar treino
create or replace function public.fn_duplicate_workout(p_workout_id uuid, p_new_week_day int)
returns uuid language plpgsql security definer set search_path=public as $$
declare src record; new_workout_id uuid := gen_random_uuid();
begin
  select * into src from public.workouts where id=p_workout_id;
  if not found then raise exception 'Workout não encontrado'; end if;
  insert into public.workouts(id,user_id,title,week_day,notes)
  values (new_workout_id, src.user_id, src.title||' (cópia)', p_new_week_day, src.notes);
  insert into public.workout_exercises(id,workout_id,user_id,exercise_name,order_index,sets,reps,time_seconds,bpm,load_kg,rpe,rest_seconds,notes)
  select gen_random_uuid(), new_workout_id, user_id, exercise_name, order_index, sets, reps, time_seconds, bpm, load_kg, rpe, rest_seconds, notes
  from public.workout_exercises where workout_id=p_workout_id;
  return new_workout_id;
end $$;

-- Estado do plano (trial vs premium)
create or replace function public.fn_plan_state(u_id uuid)
returns text language sql as $$
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

-- Limites por plano (Free-trial: 1/10, Premium: 5/30)
create or replace function public.fn_plan_limits(u_id uuid)
returns table(meal_limit int, msg_limit int) language sql as $$
  select case when s='free_trial' then 1 when s='premium' then 5 else 0 end as meal_limit,
         case when s='free_trial' then 10 when s='premium' then 30 else 0 end as msg_limit
  from (select public.fn_plan_state(u_id) as s) t;
$$;

-- Checar limite ('meal' ou 'msg')
create or replace function public.fn_check_limit(u_id uuid, feature text)
returns table(allowed boolean, remaining int) language plpgsql as $$
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

-- Incrementar contador (pós-sucesso) — usar backend (service role)
create or replace function public.fn_increment_limit(u_id uuid, feature text, inc int default 1)
returns void language plpgsql as $$
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

-- Reset diário (limpa histórico antigo; os registos do dia criam-se on-demand)
create or replace function public.fn_reset_limits()
returns void language plpgsql as $$
begin
  delete from public.usage_limits where date < current_date;
end $$;

-- Triggers de agregação / progresso
create or replace function public.trg_meal_aggregate()
returns trigger language plpgsql as $$
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
drop trigger if exists trg_meal_aggregate on public.meal_images;
create trigger trg_meal_aggregate after insert or update of calories_estimated on public.meal_images
for each row execute function public.trg_meal_aggregate();

create or replace function public.trg_workout_aggregate()
returns trigger language plpgsql as $$
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
drop trigger if exists trg_workout_aggregate on public.workout_exercises;
create trigger trg_workout_aggregate after insert or update of performed_at, sets, reps, time_seconds, bpm, load_kg
on public.workout_exercises for each row execute function public.trg_workout_aggregate();

-- ========== RLS ==========
alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.meal_images enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.progress_monthly enable row level security;
alter table public.usage_limits enable row level security;
alter table public.events_log enable row level security;
alter table public.notifications_queue enable row level security;
alter table public.weights_log enable row level security;

-- Users
create policy users_self_select on public.users for select using (auth.uid() = id);
create policy users_self_update on public.users for update using (auth.uid() = id);
create policy users_self_insert on public.users for insert with check (auth.uid() = id);

-- Subscriptions
create policy subs_owner_select on public.subscriptions for select using (auth.uid() = user_id);

-- Meals
create policy meals_owner_select on public.meal_images for select using (auth.uid() = user_id);
create policy meals_owner_insert on public.meal_images for insert with check (auth.uid() = user_id);
create policy meals_owner_update on public.meal_images for update using (auth.uid() = user_id);
create policy meals_owner_delete on public.meal_images for delete using (auth.uid() = user_id);

-- Workouts
create policy workouts_owner_select on public.workouts for select using (auth.uid() = user_id);
create policy workouts_owner_insert on public.workouts for insert with check (auth.uid() = user_id);
create policy workouts_owner_update on public.workouts for update using (auth.uid() = user_id);
create policy workouts_owner_delete on public.workouts for delete using (auth.uid() = user_id);

-- Workout exercises
create policy workoutex_owner_select on public.workout_exercises for select using (auth.uid() = user_id);
create policy workoutex_owner_insert on public.workout_exercises for insert with check (auth.uid() = user_id);
create policy workoutex_owner_update on public.workout_exercises for update using (auth.uid() = user_id);
create policy workoutex_owner_delete on public.workout_exercises for delete using (auth.uid() = user_id);

-- Progress
create policy progress_owner_select on public.progress_monthly for select using (auth.uid() = user_id);

-- Usage limits (leitura pelo cliente; escrita via service role)
create policy usage_owner_select on public.usage_limits for select using (auth.uid() = user_id);

-- Logs/Notificações/Weights (leitura do próprio)
create policy events_owner_select on public.events_log for select using (auth.uid() = user_id);
create policy notif_owner_select on public.notifications_queue for select using (auth.uid() = user_id);
create policy weights_owner_select on public.weights_log for select using (auth.uid() = user_id);

-- ========== VIEW UTIL ==========
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