export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      events_log: {
        Row: {
          event_type: string | null
          id: string
          occurred_at: string | null
          payload: Json | null
          source: string | null
          user_id: string | null
        }
        Insert: {
          event_type?: string | null
          id?: string
          occurred_at?: string | null
          payload?: Json | null
          source?: string | null
          user_id?: string | null
        }
        Update: {
          event_type?: string | null
          id?: string
          occurred_at?: string | null
          payload?: Json | null
          source?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_images: {
        Row: {
          calories_estimated: number | null
          created_at: string | null
          id: string
          image_url: string | null
          ingredients: Json | null
          nutrients: Json | null
          user_id: string | null
        }
        Insert: {
          calories_estimated?: number | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          ingredients?: Json | null
          nutrients?: Json | null
          user_id?: string | null
        }
        Update: {
          calories_estimated?: number | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          ingredients?: Json | null
          nutrients?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications_queue: {
        Row: {
          created_at: string | null
          id: string
          payload: Json | null
          scheduled_at: string | null
          status: string | null
          tries: number | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payload?: Json | null
          scheduled_at?: string | null
          status?: string | null
          tries?: number | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payload?: Json | null
          scheduled_at?: string | null
          status?: string | null
          tries?: number | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_monthly: {
        Row: {
          created_at: string | null
          id: string
          month: number | null
          total_calories: number | null
          user_id: string | null
          workouts_count: number | null
          year: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          month?: number | null
          total_calories?: number | null
          user_id?: string | null
          workouts_count?: number | null
          year?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          month?: number | null
          total_calories?: number | null
          user_id?: string | null
          workouts_count?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_monthly_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          plan_name: string | null
          price_eur: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_name?: string | null
          price_eur?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_name?: string | null
          price_eur?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_limits: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          meal_count: number | null
          msg_count: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          meal_count?: number | null
          msg_count?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          meal_count?: number | null
          msg_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          altura_cm: number | null
          created_at: string | null
          email: string | null
          id: string
          nome: string | null
          objetivo: string | null
          peso_kg: number | null
          plano_atual: string | null
          sexo: string | null
          subscription_status: string | null
          trial_end_at: string | null
        }
        Insert: {
          altura_cm?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string | null
          objetivo?: string | null
          peso_kg?: number | null
          plano_atual?: string | null
          sexo?: string | null
          subscription_status?: string | null
          trial_end_at?: string | null
        }
        Update: {
          altura_cm?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string | null
          objetivo?: string | null
          peso_kg?: number | null
          plano_atual?: string | null
          sexo?: string | null
          subscription_status?: string | null
          trial_end_at?: string | null
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string | null
          exercise_name: string | null
          id: string
          reps: number | null
          sets: number | null
          time_seconds: number | null
          user_id: string | null
          workout_id: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_name?: string | null
          id?: string
          reps?: number | null
          sets?: number | null
          time_seconds?: number | null
          user_id?: string | null
          workout_id?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_name?: string | null
          id?: string
          reps?: number | null
          sets?: number | null
          time_seconds?: number | null
          user_id?: string | null
          workout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          user_id: string | null
          week_day: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
          week_day?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
          week_day?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_calculate_bmi: {
        Args: { height_cm: number; weight_kg: number }
        Returns: number
      }
      fn_check_limit: {
        Args: { feature: string; u_id: string }
        Returns: {
          allowed: boolean
          remaining: number
        }[]
      }
      fn_duplicate_workout: {
        Args: { p_new_week_day: number; p_workout_id: string }
        Returns: string
      }
      fn_increment_limit: {
        Args: { feature: string; inc?: number; u_id: string }
        Returns: undefined
      }
      fn_plan_limits: {
        Args: { u_id: string }
        Returns: {
          meal_limit: number
          msg_limit: number
        }[]
      }
      fn_plan_state: {
        Args: { u_id: string }
        Returns: string
      }
      fn_progress_upsert: {
        Args: {
          p_add_calories?: number
          p_bpm?: number
          p_load_kg?: number
          p_reps?: number
          p_sets?: number
          p_time_seconds?: number
          p_ts: string
          p_user_id: string
          p_workout_added?: boolean
        }
        Returns: undefined
      }
      fn_progress_weekly: {
        Args: { u_id: string }
        Returns: {
          from_date: string
          to_date: string
          total_calories: number
          total_reps: number
          total_sets: number
          total_time_seconds: number
          workouts_count: number
        }[]
      }
      fn_reset_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      fn_user_bmi: {
        Args: { u_id: string }
        Returns: number
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      activity_level:
        | "sedentario"
        | "ligeiro"
        | "moderado"
        | "intenso"
        | "atleta"
      event_source: "web" | "mobile" | "webhook_shopify" | "cron" | "system"
      gender: "masculino" | "feminino" | "outro" | "nao_declara"
      subscription_status:
        | "incomplete"
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_level: [
        "sedentario",
        "ligeiro",
        "moderado",
        "intenso",
        "atleta",
      ],
      event_source: ["web", "mobile", "webhook_shopify", "cron", "system"],
      gender: ["masculino", "feminino", "outro", "nao_declara"],
      subscription_status: [
        "incomplete",
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
      ],
    },
  },
} as const
