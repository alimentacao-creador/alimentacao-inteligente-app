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
      algorithm_sign: {
        Args: { algorithm: string; secret: string; signables: string }
        Returns: string
      }
      analytics_build_usage_month: {
        Args: { p_month: string }
        Returns: undefined
      }
      analytics_revenue_from_payments: {
        Args: { p_day?: string }
        Returns: undefined
      }
      analytics_snapshot_usage_day: {
        Args: { p_day?: string }
        Returns: undefined
      }
      consume_limit: {
        Args: { p_resource: string; p_user: string }
        Returns: boolean
      }
      ensure_daily_usage: {
        Args: { p_user: string }
        Returns: undefined
      }
      expire_due_subscriptions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
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
      fn_subscricao_ativa: {
        Args: { p_user: string }
        Returns: {
          data_fim: string
          data_inicio: string
          estado: string
          plano: string
          user_id: string
        }[]
      }
      get_plan_limits: {
        Args: { p_user: string }
        Returns: {
          max_chats: number
          max_images: number
          max_recipes: number
          plan: Database["public"]["Enums"]["plan_type"]
        }[]
      }
      log_webhook: {
        Args: { p_event: string; p_payload: Json; p_source: string }
        Returns: undefined
      }
      process_payment: {
        Args: {
          p_amount: number
          p_currency?: string
          p_order_id?: string
          p_payload?: Json
          p_period_days?: number
          p_plan?: Database["public"]["Enums"]["plan_type"]
          p_platform?: string
          p_user: string
        }
        Returns: undefined
      }
      process_refund: {
        Args: {
          p_amount: number
          p_currency?: string
          p_order_id?: string
          p_payload?: Json
          p_platform?: string
          p_user: string
        }
        Returns: undefined
      }
      reactivate_free_for_inactive: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      rpc_consume_limit: {
        Args: { p_resource: string }
        Returns: boolean
      }
      rpc_get_access_state: {
        Args: Record<PropertyKey, never>
        Returns: {
          chats_today: number
          ends_at: string
          images_today: number
          max_chats: number
          max_images: number
          max_recipes: number
          plan: Database["public"]["Enums"]["plan_type"]
          recipes_today: number
          starts_at: string
          status: Database["public"]["Enums"]["subscription_status"]
        }[]
      }
      rpc_get_plan_limits: {
        Args: Record<PropertyKey, never>
        Returns: {
          max_chats: number
          max_images: number
          max_recipes: number
          plan: Database["public"]["Enums"]["plan_type"]
        }[]
      }
      rpc_process_payment: {
        Args: {
          p_amount: number
          p_currency?: string
          p_order_id?: string
          p_payload?: Json
          p_period_days?: number
          p_plan?: Database["public"]["Enums"]["plan_type"]
          p_platform?: string
          p_user: string
        }
        Returns: undefined
      }
      rpc_process_refund: {
        Args: {
          p_amount: number
          p_currency?: string
          p_order_id?: string
          p_payload?: Json
          p_platform?: string
          p_user: string
        }
        Returns: undefined
      }
      sign: {
        Args: { algorithm?: string; payload: Json; secret: string }
        Returns: string
      }
      try_cast_double: {
        Args: { inp: string }
        Returns: number
      }
      url_decode: {
        Args: { data: string }
        Returns: string
      }
      url_encode: {
        Args: { data: string }
        Returns: string
      }
      verify: {
        Args: { algorithm?: string; secret: string; token: string }
        Returns: {
          header: Json
          payload: Json
          valid: boolean
        }[]
      }
    }
    Enums: {
      estado_subscricao: "pending" | "active" | "cancelled" | "expired"
      plan_type: "free" | "premium"
      subscription_status: "pending" | "active" | "cancelled" | "expired"
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
      estado_subscricao: ["pending", "active", "cancelled", "expired"],
      plan_type: ["free", "premium"],
      subscription_status: ["pending", "active", "cancelled", "expired"],
    },
  },
} as const
