import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

async function generateCoachingResponse(userMessage: string, userContext: any): Promise<string> {
  const systemPrompt = `You are an expert nutrition and fitness coach for the Smart Nutrition App. 
  
User context:
- Name: ${userContext.nome || 'User'}
- Goal: ${userContext.objetivo || 'General health'}
- Current plan: ${userContext.plano_atual || 'free'}
- Weight: ${userContext.peso_kg || 'Not provided'} kg
- Height: ${userContext.altura_cm || 'Not provided'} cm

Provide personalized, encouraging, and actionable advice. Keep responses concise but helpful. 
Focus on nutrition, exercise, and healthy lifestyle habits.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: systemPrompt },
          { text: `User message: ${userMessage}` }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
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

    // Check message limits
    const { data: limitData, error: limitError } = await supabase
      .rpc('fn_check_limit', { u_id: user.id, feature: 'msg' });

    if (limitError || !limitData || limitData.length === 0) {
      console.error('Limit check error:', limitError);
      return new Response(
        JSON.stringify({ error: 'Failed to check limits' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!limitData[0].allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Daily message limit reached',
          remaining: limitData[0].remaining
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user profile for context
    const { data: userProfile } = await supabase
      .from('users')
      .select('nome, objetivo, plano_atual, peso_kg, altura_cm')
      .eq('id', user.id)
      .single();

    // Generate AI response
    const aiResponse = await generateCoachingResponse(message, userProfile || {});

    // Increment message limit
    await supabase.rpc('fn_increment_limit', { 
      u_id: user.id, 
      feature: 'msg',
      inc: 1
    });

    // Log the event
    await supabase.from('events_log').insert({
      user_id: user.id,
      event_type: 'ai_message_sent',
      source: 'api',
      payload: { 
        message_length: message.length,
        response_length: aiResponse.length
      }
    });

    return new Response(
      JSON.stringify({
        response: aiResponse,
        remaining_messages: limitData[0].remaining - 1
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-messages function:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});