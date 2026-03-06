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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          admin_feedback: string | null
          constituency: string | null
          country: string
          county: string | null
          cover_letter: string | null
          created_at: string | null
          date_of_birth: string | null
          education: string | null
          email: string
          experience: string | null
          first_name: string
          gender: string | null
          id: string
          id_number: string
          job_listing_id: string
          job_title: string
          last_name: string
          phone: string
          status: string
          ward: string | null
        }
        Insert: {
          admin_feedback?: string | null
          constituency?: string | null
          country?: string
          county?: string | null
          cover_letter?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          education?: string | null
          email: string
          experience?: string | null
          first_name: string
          gender?: string | null
          id?: string
          id_number: string
          job_listing_id: string
          job_title: string
          last_name: string
          phone: string
          status?: string
          ward?: string | null
        }
        Update: {
          admin_feedback?: string | null
          constituency?: string | null
          country?: string
          county?: string | null
          cover_letter?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          education?: string | null
          email?: string
          experience?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          id_number?: string
          job_listing_id?: string
          job_title?: string
          last_name?: string
          phone?: string
          status?: string
          ward?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string | null
          created_at: string | null
          date: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
          subject?: string | null
        }
        Relationships: []
      }
      invitation_payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          invitation_token_id: string
          paid_at: string | null
          payment_method: string | null
          pesapal_merchant_reference: string | null
          pesapal_order_tracking_id: string | null
          status: string
        }
        Insert: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          invitation_token_id: string
          paid_at?: string | null
          payment_method?: string | null
          pesapal_merchant_reference?: string | null
          pesapal_order_tracking_id?: string | null
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          invitation_token_id?: string
          paid_at?: string | null
          payment_method?: string | null
          pesapal_merchant_reference?: string | null
          pesapal_order_tracking_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_payments_invitation_token_id_fkey"
            columns: ["invitation_token_id"]
            isOneToOne: false
            referencedRelation: "invitation_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_tokens: {
        Row: {
          application_id: string
          created_at: string | null
          cv_uploaded: boolean | null
          email: string
          expires_at: string | null
          id: string
          payment_completed: boolean | null
          token: string
          webinar_date: string | null
          webinar_description: string | null
          webinar_link: string | null
        }
        Insert: {
          application_id: string
          created_at?: string | null
          cv_uploaded?: boolean | null
          email: string
          expires_at?: string | null
          id?: string
          payment_completed?: boolean | null
          token?: string
          webinar_date?: string | null
          webinar_description?: string | null
          webinar_link?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string | null
          cv_uploaded?: boolean | null
          email?: string
          expires_at?: string | null
          id?: string
          payment_completed?: boolean | null
          token?: string
          webinar_date?: string | null
          webinar_description?: string | null
          webinar_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitation_tokens_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      job_listings: {
        Row: {
          category: string
          created_at: string | null
          deadline: string | null
          description: string
          id: string
          location: string
          requirements: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          deadline?: string | null
          description?: string
          id?: string
          location?: string
          requirements?: string[] | null
          title: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          deadline?: string | null
          description?: string
          id?: string
          location?: string
          requirements?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
