-- Extensão necessária
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

-- MEAL IMAGES
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