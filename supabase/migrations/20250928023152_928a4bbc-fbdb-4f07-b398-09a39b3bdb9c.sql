-- Limpar tipos enum existentes e recriar estrutura completa
DROP TYPE IF EXISTS plan_type CASCADE;
DROP TYPE IF EXISTS subscription_status CASCADE;

-- Remover tabelas existentes
DROP TABLE IF EXISTS events_log CASCADE;
DROP TABLE IF EXISTS meal_images CASCADE; 
DROP TABLE IF EXISTS notifications_queue CASCADE;
DROP TABLE IF EXISTS progress_monthly CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS usage_limits CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS workout_exercises CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;

-- Tipos enum
CREATE TYPE plan_type AS ENUM ('free', 'premium');
CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'cancelled');

-- Tabela de utilizadores
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  nome TEXT,
  sexo TEXT CHECK (sexo IN ('masculino', 'feminino')),
  objetivo TEXT CHECK (objetivo IN ('perder_peso', 'ganhar_peso', 'manter_peso', 'ganhar_musculo')),
  peso_kg NUMERIC CHECK (peso_kg > 0),
  altura_cm NUMERIC CHECK (altura_cm > 0),
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
  plano_atual TEXT DEFAULT 'free',
  trial_end_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de subscrições
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'cancelled')),
  price_eur NUMERIC NOT NULL CHECK (price_eur >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de imagens de refeições
CREATE TABLE public.meal_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  nutrients JSONB,
  ingredients JSONB,
  calories_estimated INTEGER CHECK (calories_estimated >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de treinos
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  week_day INTEGER CHECK (week_day >= 0 AND week_day <= 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de exercícios dos treinos
CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID REFERENCES public.workouts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  sets INTEGER CHECK (sets > 0),
  reps INTEGER CHECK (reps > 0),
  time_seconds INTEGER CHECK (time_seconds >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de progresso mensal
CREATE TABLE public.progress_monthly (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  year INTEGER NOT NULL CHECK (year > 2020),
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  total_calories INTEGER DEFAULT 0 CHECK (total_calories >= 0),
  workouts_count INTEGER DEFAULT 0 CHECK (workouts_count >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, year, month)
);

-- Tabela de limites de uso
CREATE TABLE public.usage_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_count INTEGER DEFAULT 0 CHECK (meal_count >= 0),
  msg_count INTEGER DEFAULT 0 CHECK (msg_count >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Tabela de logs de eventos
CREATE TABLE public.events_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  source TEXT,
  event_type TEXT,
  payload JSONB,
  occurred_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de notificações
CREATE TABLE public.notifications_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  payload JSONB,
  tries INTEGER DEFAULT 0 CHECK (tries >= 0),
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_monthly ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_queue ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "users_self" ON public.users FOR ALL USING (auth.uid() = id);
CREATE POLICY "subscriptions_self" ON public.subscriptions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "meal_images_self" ON public.meal_images FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "workouts_self" ON public.workouts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "workout_exercises_self" ON public.workout_exercises FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "progress_monthly_self" ON public.progress_monthly FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "usage_limits_self" ON public.usage_limits FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "events_log_self" ON public.events_log FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "notifications_queue_self" ON public.notifications_queue FOR ALL USING (auth.uid() = user_id);