export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      company: {
        Row: {
          address: string
          branch: string
          city: string
          created_at: string
          id: string
          name: string
          province: string
          sub_district: string
          user_id: string
          zip_code: number
        }
        Insert: {
          address: string
          branch: string
          city: string
          created_at?: string
          id?: string
          name: string
          province: string
          sub_district: string
          user_id: string
          zip_code: number
        }
        Update: {
          address?: string
          branch?: string
          city?: string
          created_at?: string
          id?: string
          name?: string
          province?: string
          sub_district?: string
          user_id?: string
          zip_code?: number
        }
      }
      company_snapshot: {
        Row: {
          company_id: string
          created_at: string
          data: Json
          id: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          data: Json
          id?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          data?: Json
          id?: string
          user_id?: string
        }
      }
      configuration: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
      }
      unit: {
        Row: {
          brand: string
          created_at: string
          extra: Json
          id: string
          made_in: string
          oem: string
          serial_number: string
          user_id: string
          yom: number
        }
        Insert: {
          brand: string
          created_at?: string
          extra: Json
          id?: string
          made_in: string
          oem: string
          serial_number: string
          user_id: string
          yom: number
        }
        Update: {
          brand?: string
          created_at?: string
          extra?: Json
          id?: string
          made_in?: string
          oem?: string
          serial_number?: string
          user_id?: string
          yom?: number
        }
      }
      unit_snapshot: {
        Row: {
          created_at: string
          data: Json
          id: string
          unit_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          unit_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          unit_id?: string
          user_id?: string
        }
      }
      user: {
        Row: {
          id: string
          name: string
          permission: Json | null
        }
        Insert: {
          id: string
          name: string
          permission?: Json | null
        }
        Update: {
          id?: string
          name?: string
          permission?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
