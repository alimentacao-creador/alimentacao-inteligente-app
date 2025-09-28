-- Adicionar funções auxiliares e trigger
CREATE OR REPLACE FUNCTION public.fn_calculate_bmi(weight_kg NUMERIC, height_cm NUMERIC)
RETURNS NUMERIC
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT CASE 
    WHEN height_cm > 0 THEN ROUND(weight_kg / ((height_cm/100)^2), 2) 
    ELSE NULL 
  END;
$$;

CREATE OR REPLACE FUNCTION public.fn_plan_limits(u_id UUID)
RETURNS TABLE(meal_limit INTEGER, msg_limit INTEGER)
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    CASE WHEN u.subscription_status='premium' THEN 5 ELSE 1 END as meal_limit,
    CASE WHEN u.subscription_status='premium' THEN 30 ELSE 10 END as msg_limit
  FROM users u WHERE u.id=u_id;
$$;

CREATE OR REPLACE FUNCTION public.fn_check_limit(u_id UUID, feature TEXT)
RETURNS TABLE(allowed BOOLEAN, remaining INTEGER)
LANGUAGE PLPGSQL
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE 
  rec usage_limits;
BEGIN
  SELECT * INTO rec FROM usage_limits WHERE user_id=u_id AND date=CURRENT_DATE;
  IF NOT FOUND THEN
    INSERT INTO usage_limits(user_id,date) VALUES (u_id,CURRENT_DATE) RETURNING * INTO rec;
  END IF;

  IF feature='meal' THEN
    RETURN QUERY SELECT 
      (rec.meal_count < (SELECT meal_limit FROM fn_plan_limits(u_id))),
      ((SELECT meal_limit FROM fn_plan_limits(u_id)) - rec.meal_count);
  ELSIF feature='msg' THEN
    RETURN QUERY SELECT 
      (rec.msg_count < (SELECT msg_limit FROM fn_plan_limits(u_id))),
      ((SELECT msg_limit FROM fn_plan_limits(u_id)) - rec.msg_count);
  ELSE
    RETURN QUERY SELECT FALSE, 0;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.fn_increment_limit(u_id UUID, feature TEXT, inc INTEGER DEFAULT 1)
RETURNS VOID
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO usage_limits(user_id,date) VALUES (u_id,CURRENT_DATE) ON CONFLICT DO NOTHING;
  IF feature='meal' THEN
    UPDATE usage_limits SET meal_count=meal_count+inc WHERE user_id=u_id AND date=CURRENT_DATE;
  ELSIF feature='msg' THEN
    UPDATE usage_limits SET msg_count=msg_count+inc WHERE user_id=u_id AND date=CURRENT_DATE;
  END IF;
END;
$$;

-- Trigger para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.users (id, email, nome)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();