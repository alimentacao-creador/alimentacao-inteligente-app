-- Fix security issues for new functions by adding proper search_path
create or replace function fn_calculate_bmi(weight_kg numeric, height_cm numeric)
returns numeric 
language sql 
stable
security definer
set search_path = public
as
$$
  select case when height_cm > 0 then round(weight_kg / ((height_cm/100)^2), 2) else null end;
$$;

create or replace function fn_plan_limits(u_id uuid)
returns table(meal_limit int, msg_limit int) 
language sql 
stable
security definer
set search_path = public
as
$$
  select case when u.subscription_status='premium' then 5 else 1 end as meal_limit,
         case when u.subscription_status='premium' then 30 else 10 end as msg_limit
  from users u where u.id=u_id;
$$;

create or replace function fn_check_limit(u_id uuid, feature text)
returns table(allowed boolean, remaining int) 
language plpgsql 
stable
security definer
set search_path = public
as
$$
declare rec usage_limits;
begin
  select * into rec from usage_limits where user_id=u_id and date=current_date;
  if not found then
    insert into usage_limits(user_id,date) values (u_id,current_date) returning * into rec;
  end if;

  if feature='meal' then
    return query select (rec.meal_count < (select meal_limit from fn_plan_limits(u_id))),
                         ((select meal_limit from fn_plan_limits(u_id)) - rec.meal_count);
  elsif feature='msg' then
    return query select (rec.msg_count < (select msg_limit from fn_plan_limits(u_id))),
                         ((select msg_limit from fn_plan_limits(u_id)) - rec.msg_count);
  else
    return query select false,0;
  end if;
end;
$$;

create or replace function fn_increment_limit(u_id uuid, feature text, inc int default 1)
returns void 
language plpgsql 
security definer
set search_path = public
as
$$
begin
  insert into usage_limits(user_id,date) values (u_id,current_date) on conflict do nothing;
  if feature='meal' then
    update usage_limits set meal_count=meal_count+inc where user_id=u_id and date=current_date;
  elsif feature='msg' then
    update usage_limits set msg_count=msg_count+inc where user_id=u_id and date=current_date;
  end if;
end;
$$;