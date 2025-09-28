-- Enable Row Level Security on all tables
alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.meal_images enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.progress_monthly enable row level security;
alter table public.usage_limits enable row level security;
alter table public.events_log enable row level security;
alter table public.notifications_queue enable row level security;

-- Create RLS policies for users table
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- Create RLS policies for subscriptions
create policy "Users can view own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "Users can update own subscriptions" on public.subscriptions
  for update using (auth.uid() = user_id);

create policy "Users can insert own subscriptions" on public.subscriptions
  for insert with check (auth.uid() = user_id);

-- Create RLS policies for meal_images
create policy "Users can view own meal images" on public.meal_images
  for select using (auth.uid() = user_id);

create policy "Users can insert own meal images" on public.meal_images
  for insert with check (auth.uid() = user_id);

create policy "Users can update own meal images" on public.meal_images
  for update using (auth.uid() = user_id);

create policy "Users can delete own meal images" on public.meal_images
  for delete using (auth.uid() = user_id);

-- Create RLS policies for workouts
create policy "Users can view own workouts" on public.workouts
  for select using (auth.uid() = user_id);

create policy "Users can insert own workouts" on public.workouts
  for insert with check (auth.uid() = user_id);

create policy "Users can update own workouts" on public.workouts
  for update using (auth.uid() = user_id);

create policy "Users can delete own workouts" on public.workouts
  for delete using (auth.uid() = user_id);

-- Create RLS policies for workout_exercises
create policy "Users can view own workout exercises" on public.workout_exercises
  for select using (auth.uid() = user_id);

create policy "Users can insert own workout exercises" on public.workout_exercises
  for insert with check (auth.uid() = user_id);

create policy "Users can update own workout exercises" on public.workout_exercises
  for update using (auth.uid() = user_id);

create policy "Users can delete own workout exercises" on public.workout_exercises
  for delete using (auth.uid() = user_id);

-- Create RLS policies for progress_monthly
create policy "Users can view own progress" on public.progress_monthly
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress" on public.progress_monthly
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress" on public.progress_monthly
  for update using (auth.uid() = user_id);

-- Create RLS policies for usage_limits
create policy "Users can view own usage limits" on public.usage_limits
  for select using (auth.uid() = user_id);

create policy "Users can insert own usage limits" on public.usage_limits
  for insert with check (auth.uid() = user_id);

create policy "Users can update own usage limits" on public.usage_limits
  for update using (auth.uid() = user_id);

-- Create RLS policies for events_log
create policy "Users can view own events" on public.events_log
  for select using (auth.uid() = user_id);

create policy "Users can insert own events" on public.events_log
  for insert with check (auth.uid() = user_id);

-- Create RLS policies for notifications_queue
create policy "Users can view own notifications" on public.notifications_queue
  for select using (auth.uid() = user_id);

create policy "Users can insert own notifications" on public.notifications_queue
  for insert with check (auth.uid() = user_id);

create policy "Users can update own notifications" on public.notifications_queue
  for update using (auth.uid() = user_id);