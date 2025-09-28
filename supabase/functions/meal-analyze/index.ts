import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

interface MealAnalysis {
  calories_estimated: number;
  ingredients: string[];
  nutrients: {
    proteins: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
}

async function analyzeImageWithGemini(imageBase64: string): Promise<MealAnalysis> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            text: `Analyze this food image and provide a detailed nutritional breakdown. Return ONLY a valid JSON object with this exact structure:
            {
              "calories_estimated": number,
              "ingredients": ["ingredient1", "ingredient2"],
              "nutrients": {
                "proteins": number_in_grams,
                "carbs": number_in_grams,
                "fats": number_in_grams,
                "fiber": number_in_grams
              }
            }`
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: imageBase64
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.3,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  
  try {
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in Gemini response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse Gemini response:', text);
    throw new Error('Invalid response format from Gemini');
  }
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

    // Check meal limits
    const { data: limitData, error: limitError } = await supabase
      .rpc('fn_check_limit', { u_id: user.id, feature: 'meal' });

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
          error: 'Daily meal analysis limit reached',
          remaining: limitData[0].remaining
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { image_data } = await req.json();
    if (!image_data) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Remove data URL prefix if present
    const base64Data = image_data.replace(/^data:image\/[a-z]+;base64,/, '');

    // Analyze the image with Gemini
    const analysis = await analyzeImageWithGemini(base64Data);

    // Save meal analysis to database
    const { data: meal, error: mealError } = await supabase
      .from('meal_images')
      .insert({
        user_id: user.id,
        image_url: '', // Would store in Supabase Storage in production
        calories_estimated: analysis.calories_estimated,
        ingredients: analysis.ingredients,
        nutrients: analysis.nutrients
      })
      .select()
      .single();

    if (mealError) {
      console.error('Database error:', mealError);
      return new Response(
        JSON.stringify({ error: 'Failed to save meal analysis' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Increment meal limit
    await supabase.rpc('fn_increment_limit', { 
      u_id: user.id, 
      feature: 'meal',
      inc: 1
    });

    // Log the event
    await supabase.from('events_log').insert({
      user_id: user.id,
      event_type: 'meal_analyzed',
      source: 'api',
      payload: { 
        meal_id: meal.id,
        calories: analysis.calories_estimated,
        ingredients_count: analysis.ingredients.length
      }
    });

    return new Response(
      JSON.stringify({
        ...meal,
        remaining_analyses: limitData[0].remaining - 1
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in meal-analyze function:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});