import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get plan limits
    const { data: planLimits, error: planError } = await supabase
      .rpc('fn_plan_limits', { u_id: user.id });

    if (planError || !planLimits || planLimits.length === 0) {
      console.error('Plan limits error:', planError);
      return new Response(
        JSON.stringify({ error: 'Failed to get plan limits' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const limits = planLimits[0];

    // Get current usage for today
    const { data: usage, error: usageError } = await supabase
      .from('usage_limits')
      .select('meal_count, msg_count')
      .eq('user_id', user.id)
      .eq('date', new Date().toISOString().split('T')[0])
      .single();

    const currentUsage = usage || { meal_count: 0, msg_count: 0 };

    // Get user subscription status
    const { data: userProfile } = await supabase
      .from('users')
      .select('subscription_status, plano_atual, trial_end_at')
      .eq('id', user.id)
      .single();

    const response = {
      subscription_status: userProfile?.subscription_status || 'free',
      plano_atual: userProfile?.plano_atual || 'free',
      trial_end_at: userProfile?.trial_end_at,
      limits: {
        meals: {
          max: limits.meal_limit,
          used: currentUsage.meal_count,
          remaining: Math.max(0, limits.meal_limit - currentUsage.meal_count)
        },
        messages: {
          max: limits.msg_limit,
          used: currentUsage.msg_count,
          remaining: Math.max(0, limits.msg_limit - currentUsage.msg_count)
        }
      },
      today: new Date().toISOString().split('T')[0]
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in limits function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});