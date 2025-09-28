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
      análise_receita_diária: {
        Row: {
          brl_amount: number
          day: string
          eur_amount: number
          orders_count: number
        }
        Insert: {
          brl_amount?: number
          day: string
          eur_amount?: number
          orders_count?: number
        }
        Update: {
          brl_amount?: number
          day?: string
          eur_amount?: number
          orders_count?: number
        }
        Relationships: []
      }
      assinaturas: {
        Row: {
          cancelled_at: string | null
          created_at: string
          ends_at: string | null
          id: number
          plan: Database["public"]["Enums"]["plan_type"]
          source: string | null
          starts_at: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string
          ends_at?: string | null
          id?: number
          plan: Database["public"]["Enums"]["plan_type"]
          source?: string | null
          starts_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string
          ends_at?: string | null
          id?: number
          plan?: Database["public"]["Enums"]["plan_type"]
          source?: string | null
          starts_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      exercícios: {
        Row: {
          id: number
          name: string
          reps: string | null
          rest_sec: number | null
          sets: number | null
          treino_id: number
          weight_kg: number | null
        }
        Insert: {
          id?: number
          name: string
          reps?: string | null
          rest_sec?: number | null
          sets?: number | null
          treino_id: number
          weight_kg?: number | null
        }
        Update: {
          id?: number
          name?: string
          reps?: string | null
          rest_sec?: number | null
          sets?: number | null
          treino_id?: number
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exercícios_treino_id_fkey"
            columns: ["treino_id"]
            isOneToOne: false
            referencedRelation: "treinos"
            referencedColumns: ["id"]
          },
        ]
      }
      histórico_do_bate_papo: {
        Row: {
          created_at: string
          id: number
          message: string
          response: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          response?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          response?: string | null
          user_id?: string
        }
        Relationships: []
      }
      imagens: {
        Row: {
          created_at: string
          id: number
          prompt: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          prompt?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          prompt?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      logs_da_webhook: {
        Row: {
          event: string
          id: number
          payload: Json | null
          received_at: string
          source: string
        }
        Insert: {
          event: string
          id?: number
          payload?: Json | null
          received_at?: string
          source: string
        }
        Update: {
          event?: string
          id?: number
          payload?: Json | null
          received_at?: string
          source?: string
        }
        Relationships: []
      }
      notificações: {
        Row: {
          body: string
          created_at: string
          id: number
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: number
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: number
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      pagamentos: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: number
          order_id: string | null
          payload: Json | null
          period_days: number
          plan: Database["public"]["Enums"]["plan_type"]
          platform: string
          received_at: string
          state: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: number
          order_id?: string | null
          payload?: Json | null
          period_days?: number
          plan?: Database["public"]["Enums"]["plan_type"]
          platform?: string
          received_at?: string
          state?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: number
          order_id?: string | null
          payload?: Json | null
          period_days?: number
          plan?: Database["public"]["Enums"]["plan_type"]
          platform?: string
          received_at?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
      perfis: {
        Row: {
          created_at: string
          email: string | null
          locale: string | null
          name: string | null
          shopify_customer_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          locale?: string | null
          name?: string | null
          shopify_customer_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          locale?: string | null
          name?: string | null
          shopify_customer_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      planos: {
        Row: {
          code: Database["public"]["Enums"]["plan_type"]
          created_at: string
          default_cycle_days: number
          description: string | null
          id: number
          max_chats_per_day: number
          max_images_per_day: number
          max_recipes_per_day: number
          name: string
          price_brl: number
          price_eur: number
        }
        Insert: {
          code: Database["public"]["Enums"]["plan_type"]
          created_at?: string
          default_cycle_days?: number
          description?: string | null
          id?: number
          max_chats_per_day?: number
          max_images_per_day?: number
          max_recipes_per_day?: number
          name: string
          price_brl?: number
          price_eur?: number
        }
        Update: {
          code?: Database["public"]["Enums"]["plan_type"]
          created_at?: string
          default_cycle_days?: number
          description?: string | null
          id?: number
          max_chats_per_day?: number
          max_images_per_day?: number
          max_recipes_per_day?: number
          name?: string
          price_brl?: number
          price_eur?: number
        }
        Relationships: []
      }
      receitas: {
        Row: {
          body: string
          created_at: string
          id: number
          title: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: number
          title: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: number
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      registros_de_saúde: {
        Row: {
          calories: number | null
          heart_rate_avg: number | null
          id: number
          logged_at: string
          steps: number | null
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          calories?: number | null
          heart_rate_avg?: number | null
          id?: number
          logged_at?: string
          steps?: number | null
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          calories?: number | null
          heart_rate_avg?: number | null
          id?: number
          logged_at?: string
          steps?: number | null
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      registros_de_treino: {
        Row: {
          id: number
          notes: string | null
          performed_at: string
          treino_id: number | null
          user_id: string
        }
        Insert: {
          id?: number
          notes?: string | null
          performed_at?: string
          treino_id?: number | null
          user_id: string
        }
        Update: {
          id?: number
          notes?: string | null
          performed_at?: string
          treino_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registros_de_treino_treino_id_fkey"
            columns: ["treino_id"]
            isOneToOne: false
            referencedRelation: "treinos"
            referencedColumns: ["id"]
          },
        ]
      }
      treinos: {
        Row: {
          created_at: string
          goal: string | null
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal?: string | null
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal?: string | null
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      uso_analítico_diário: {
        Row: {
          chats: number
          day: string
          images: number
          plan: Database["public"]["Enums"]["plan_type"] | null
          recipes: number
          user_id: string
        }
        Insert: {
          chats?: number
          day: string
          images?: number
          plan?: Database["public"]["Enums"]["plan_type"] | null
          recipes?: number
          user_id: string
        }
        Update: {
          chats?: number
          day?: string
          images?: number
          plan?: Database["public"]["Enums"]["plan_type"] | null
          recipes?: number
          user_id?: string
        }
        Relationships: []
      }
      uso_analítico_mensal: {
        Row: {
          chats: number
          images: number
          month: string
          plan: Database["public"]["Enums"]["plan_type"]
          recipes: number
          users_count: number
        }
        Insert: {
          chats: number
          images: number
          month: string
          plan: Database["public"]["Enums"]["plan_type"]
          recipes: number
          users_count: number
        }
        Update: {
          chats?: number
          images?: number
          month?: string
          plan?: Database["public"]["Enums"]["plan_type"]
          recipes?: number
          users_count?: number
        }
        Relationships: []
      }
      uso_diário: {
        Row: {
          chats: number
          day: string
          images: number
          recipes: number
          user_id: string
        }
        Insert: {
          chats?: number
          day?: string
          images?: number
          recipes?: number
          user_id: string
        }
        Update: {
          chats?: number
          day?: string
          images?: number
          recipes?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      mv_usage_mensal: {
        Row: {
          chats: number | null
          images: number | null
          month: string | null
          plan: Database["public"]["Enums"]["plan_type"] | null
          recipes: number | null
          users_count: number | null
        }
        Relationships: []
      }
      v_receita_mensal: {
        Row: {
          brl_amount: number | null
          eur_amount: number | null
          month: string | null
          orders: number | null
        }
        Relationships: []
      }
      v_usage_monthly: {
        Row: {
          chats: number | null
          images: number | null
          month: string | null
          plan: Database["public"]["Enums"]["plan_type"] | null
          recipes: number | null
          users_count: number | null
        }
        Insert: {
          chats?: number | null
          images?: number | null
          month?: string | null
          plan?: Database["public"]["Enums"]["plan_type"] | null
          recipes?: number | null
          users_count?: number | null
        }
        Update: {
          chats?: number | null
          images?: number | null
          month?: string | null
          plan?: Database["public"]["Enums"]["plan_type"] | null
          recipes?: number | null
          users_count?: number | null
        }
        Relationships: []
      }
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
