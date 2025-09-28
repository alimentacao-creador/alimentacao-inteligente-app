import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Workout {
  id?: string;
  title: string;
  week_day: number;
  exercises: {
    exercise_name: string;
    sets: number;
    reps: number;
    time_seconds?: number;
  }[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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

    if (req.method === 'GET') {
      // Get all workouts for user
      const { data: workouts, error } = await supabase
        .from('workouts')
        .select(`
          *,
          workout_exercises (
            id,
            exercise_name,
            sets,
            reps,
            time_seconds
          )
        `)
        .eq('user_id', user.id)
        .order('week_day');

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch workouts' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(workouts),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'POST') {
      // Create new workout
      const workoutData = await req.json() as Workout;
      
      if (!workoutData.title || workoutData.week_day === undefined) {
        return new Response(
          JSON.stringify({ error: 'Title and week_day are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create workout
      const { data: workout, error: workoutError } = await supabase
        .from('workouts')
        .insert({
          user_id: user.id,
          title: workoutData.title,
          week_day: workoutData.week_day
        })
        .select()
        .single();

      if (workoutError) {
        console.error('Workout creation error:', workoutError);
        return new Response(
          JSON.stringify({ error: 'Failed to create workout' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Add exercises if provided
      if (workoutData.exercises && workoutData.exercises.length > 0) {
        const exercisesData = workoutData.exercises.map(exercise => ({
          workout_id: workout.id,
          user_id: user.id,
          exercise_name: exercise.exercise_name,
          sets: exercise.sets,
          reps: exercise.reps,
          time_seconds: exercise.time_seconds || null
        }));

        const { error: exercisesError } = await supabase
          .from('workout_exercises')
          .insert(exercisesData);

        if (exercisesError) {
          console.error('Exercises creation error:', exercisesError);
          // Delete the workout if exercises failed
          await supabase.from('workouts').delete().eq('id', workout.id);
          return new Response(
            JSON.stringify({ error: 'Failed to create workout exercises' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      // Log the event
      await supabase.from('events_log').insert({
        user_id: user.id,
        event_type: 'workout_created',
        source: 'api',
        payload: { 
          workout_id: workout.id,
          exercises_count: workoutData.exercises?.length || 0
        }
      });

      // Return the complete workout with exercises
      const { data: completeWorkout } = await supabase
        .from('workouts')
        .select(`
          *,
          workout_exercises (
            id,
            exercise_name,
            sets,
            reps,
            time_seconds
          )
        `)
        .eq('id', workout.id)
        .single();

      return new Response(
        JSON.stringify(completeWorkout),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in workouts function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});