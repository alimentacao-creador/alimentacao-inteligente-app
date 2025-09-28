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
          error_message: string | null
          event_type: string
          http_status: number | null
          id: string
          occurred_at: string
          payload: Json | null
          signature_valid: boolean | null
          source: Database["public"]["Enums"]["event_source"]
          user_id: string | null
        }
        Insert: {
          error_message?: string | null
          event_type: string
          http_status?: number | null
          id?: string
          occurred_at?: string
          payload?: Json | null
          signature_valid?: boolean | null
          source: Database["public"]["Enums"]["event_source"]
          user_id?: string | null
        }
        Update: {
          error_message?: string | null
          event_type?: string
          http_status?: number | null
          id?: string
          occurred_at?: string
          payload?: Json | null
          signature_valid?: boolean | null
          source?: Database["public"]["Enums"]["event_source"]
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
          {
            foreignKeyName: "events_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
      meal_images: {
        Row: {
          ai_model: string | null
          analyzed_at: string | null
          calories_estimated: number | null
          captured_at: string | null
          confidence: number | null
          created_at: string
          id: string
          image_url: string
          ingredients: Json | null
          notes: string | null
          nutrients: Json | null
          suggestions: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_model?: string | null
          analyzed_at?: string | null
          calories_estimated?: number | null
          captured_at?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          image_url: string
          ingredients?: Json | null
          notes?: string | null
          nutrients?: Json | null
          suggestions?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_model?: string | null
          analyzed_at?: string | null
          calories_estimated?: number | null
          captured_at?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          image_url?: string
          ingredients?: Json | null
          notes?: string | null
          nutrients?: Json | null
          suggestions?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications_queue: {
        Row: {
          created_at: string
          id: string
          payload: Json | null
          scheduled_at: string | null
          status: string
          tries: number
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payload?: Json | null
          scheduled_at?: string | null
          status?: string
          tries?: number
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payload?: Json | null
          scheduled_at?: string | null
          status?: string
          tries?: number
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
      progress_monthly: {
        Row: {
          avg_bpm: number | null
          avg_load_kg: number | null
          bmi_avg: number | null
          id: string
          month: number
          total_calories: number | null
          total_reps: number | null
          total_sets: number | null
          total_time_seconds: number | null
          updated_at: string
          user_id: string
          weight_kg_avg: number | null
          workouts_count: number | null
          year: number
        }
        Insert: {
          avg_bpm?: number | null
          avg_load_kg?: number | null
          bmi_avg?: number | null
          id?: string
          month: number
          total_calories?: number | null
          total_reps?: number | null
          total_sets?: number | null
          total_time_seconds?: number | null
          updated_at?: string
          user_id: string
          weight_kg_avg?: number | null
          workouts_count?: number | null
          year: number
        }
        Update: {
          avg_bpm?: number | null
          avg_load_kg?: number | null
          bmi_avg?: number | null
          id?: string
          month?: number
          total_calories?: number | null
          total_reps?: number | null
          total_sets?: number | null
          total_time_seconds?: number | null
          updated_at?: string
          user_id?: string
          weight_kg_avg?: number | null
          workouts_count?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_monthly_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_monthly_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_end: boolean | null
          canceled_at: string | null
          created_at: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          price_eur: number
          raw_payload: Json | null
          shopify_customer_id: string | null
          shopify_subscription_id: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_end_at: string | null
          trial_start_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_end?: boolean | null
          canceled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name: string
          price_eur?: number
          raw_payload?: Json | null
          shopify_customer_id?: string | null
          shopify_subscription_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_end_at?: string | null
          trial_start_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_end?: boolean | null
          canceled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          price_eur?: number
          raw_payload?: Json | null
          shopify_customer_id?: string | null
          shopify_subscription_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_end_at?: string | null
          trial_start_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
      usage_limits: {
        Row: {
          created_at: string
          date: string
          id: string
          meal_count: number | null
          msg_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          meal_count?: number | null
          msg_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meal_count?: number | null
          msg_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          alergias: string[] | null
          altura_cm: number | null
          consent_marketing: boolean | null
          consent_privacy: boolean | null
          consent_terms: boolean | null
          created_at: string
          data_nascimento: string | null
          email: string | null
          foto_url: string | null
          id: string
          ingestao_calorica_alvo: number | null
          lingua: string | null
          nivel_atividade: Database["public"]["Enums"]["activity_level"] | null
          nome: string | null
          objetivo: string | null
          peso_kg: number | null
          plano_atual: string | null
          preferencias: string[] | null
          sexo: Database["public"]["Enums"]["gender"] | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trial_end_at: string | null
          updated_at: string
        }
        Insert: {
          alergias?: string[] | null
          altura_cm?: number | null
          consent_marketing?: boolean | null
          consent_privacy?: boolean | null
          consent_terms?: boolean | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          foto_url?: string | null
          id: string
          ingestao_calorica_alvo?: number | null
          lingua?: string | null
          nivel_atividade?: Database["public"]["Enums"]["activity_level"] | null
          nome?: string | null
          objetivo?: string | null
          peso_kg?: number | null
          plano_atual?: string | null
          preferencias?: string[] | null
          sexo?: Database["public"]["Enums"]["gender"] | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trial_end_at?: string | null
          updated_at?: string
        }
        Update: {
          alergias?: string[] | null
          altura_cm?: number | null
          consent_marketing?: boolean | null
          consent_privacy?: boolean | null
          consent_terms?: boolean | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          foto_url?: string | null
          id?: string
          ingestao_calorica_alvo?: number | null
          lingua?: string | null
          nivel_atividade?: Database["public"]["Enums"]["activity_level"] | null
          nome?: string | null
          objetivo?: string | null
          peso_kg?: number | null
          plano_atual?: string | null
          preferencias?: string[] | null
          sexo?: Database["public"]["Enums"]["gender"] | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trial_end_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      weights_log: {
        Row: {
          altura_cm: number | null
          data_registo: string
          id: string
          peso_kg: number | null
          user_id: string
        }
        Insert: {
          altura_cm?: number | null
          data_registo?: string
          id?: string
          peso_kg?: number | null
          user_id: string
        }
        Update: {
          altura_cm?: number | null
          data_registo?: string
          id?: string
          peso_kg?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "weights_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weights_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
      workout_exercises: {
        Row: {
          bpm: number | null
          created_at: string
          exercise_name: string
          id: string
          load_kg: number | null
          notes: string | null
          order_index: number | null
          performed_at: string | null
          reps: number | null
          rest_seconds: number | null
          rpe: number | null
          sets: number | null
          time_seconds: number | null
          updated_at: string
          user_id: string
          workout_id: string
        }
        Insert: {
          bpm?: number | null
          created_at?: string
          exercise_name: string
          id?: string
          load_kg?: number | null
          notes?: string | null
          order_index?: number | null
          performed_at?: string | null
          reps?: number | null
          rest_seconds?: number | null
          rpe?: number | null
          sets?: number | null
          time_seconds?: number | null
          updated_at?: string
          user_id: string
          workout_id: string
        }
        Update: {
          bpm?: number | null
          created_at?: string
          exercise_name?: string
          id?: string
          load_kg?: number | null
          notes?: string | null
          order_index?: number | null
          performed_at?: string | null
          reps?: number | null
          rest_seconds?: number | null
          rpe?: number | null
          sets?: number | null
          time_seconds?: number | null
          updated_at?: string
          user_id?: string
          workout_id?: string
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
            foreignKeyName: "workout_exercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
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
          created_at: string
          id: string
          notes: string | null
          title: string
          updated_at: string
          user_id: string
          week_day: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          title: string
          updated_at?: string
          user_id: string
          week_day?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          title?: string
          updated_at?: string
          user_id?: string
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
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_overview"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      v_user_overview: {
        Row: {
          altura_cm: number | null
          bmi: number | null
          email: string | null
          month: number | null
          nome: string | null
          peso_kg: number | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          total_calories: number | null
          total_time_seconds: number | null
          trial_end_at: string | null
          user_id: string | null
          workouts_count: number | null
          year: number | null
        }
        Relationships: []
      }
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
