-- EXTENSÃO
create extension if not exists pgcrypto;

-- USERS
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  nome text,
  peso_kg numeric,
  altura_cm numeric,
  sexo text,
  objetivo text,
  subscription_status text default 'free',
  plano_atual text default 'free',
  trial_end_at timestamptz,
  created_at timestamptz default now()
);

-- SUBSCRIPTIONS
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  plan_name text,
  status text,
  price_eur numeric,
  created_at timestamptz default now()
);

-- MEALS
create table if not exists meal_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  image_url text,
  calories_estimated int,
  ingredients jsonb,
  nutrients jsonb,
  created_at timestamptz default now()
);

-- WORKOUTS
create table if not exists workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text,
  week_day int,
  created_at timestamptz default now()
);

create table if not exists workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid references workouts(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  exercise_name text,
  sets int,
  reps int,
  time_seconds int,
  created_at timestamptz default now()
);

-- PROGRESS
create table if not exists progress_monthly (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  year int,
  month int,
  total_calories int,
  workouts_count int,
  created_at timestamptz default now()
);

-- USAGE LIMITS
create table if not exists usage_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  date date,
  meal_count int default 0,
  msg_count int default 0,
  created_at timestamptz default now(),
  unique(user_id, date)
);

-- EVENTS LOG
create table if not exists events_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  event_type text,
  source text,
  occurred_at timestamptz default now(),
  payload jsonb
);

-- NOTIFICATIONS
create table if not exists notifications_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  type text,
  payload jsonb,
  status text default 'pending',
  tries int default 0,
  scheduled_at timestamptz,
  created_at timestamptz default now()
);

-- FUNÇÕES
create or replace function fn_calculate_bmi(weight_kg numeric, height_cm numeric)
returns numeric language sql as
$$
  select case when height_cm > 0 then round(weight_kg / ((height_cm/100)^2), 2) else null end;
$$;

create or replace function fn_plan_limits(u_id uuid)
returns table(meal_limit int, msg_limit int) language sql as
$$
  select case when u.subscription_status='premium' then 5 else 1 end as meal_limit,
         case when u.subscription_status='premium' then 30 else 10 end as msg_limit
  from users u where u.id=u_id;
$$;

create or replace function fn_check_limit(u_id uuid, feature text)
returns table(allowed boolean, remaining int) language plpgsql as
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
returns void language plpgsql as
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

-- RLS
alter table users enable row level security;
alter table subscriptions enable row level security;
alter table meal_images enable row level security;
alter table workouts enable row level security;
alter table workout_exercises enable row level security;
alter table progress_monthly enable row level security;
alter table usage_limits enable row level security;
alter table events_log enable row level security;

create policy "users_self" on users for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "subs_self" on subscriptions for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "meals_self" on meal_images for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "workouts_self" on workouts for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "workoutex_self" on workout_exercises for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "progress_self" on progress_monthly for select using (auth.uid()=user_id);
create policy "usage_self" on usage_limits for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "events_self" on events_log for select using (auth.uid()=user_id);