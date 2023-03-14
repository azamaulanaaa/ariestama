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
          city: string
          created_at: string
          id: string
          name: string
          province: string
          sub_district: string
          village: string
          zip_code: number
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: string
          name: string
          province: string
          sub_district: string
          village: string
          zip_code: number
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: string
          name?: string
          province?: string
          sub_district?: string
          village?: string
          zip_code?: number
        }
      }
      official: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
      }
      profile: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
      }
      unit: {
        Row: {
          brand: string
          capacity: string
          category: string
          company_id: string
          created_at: string
          id: string
          location: string
          made_in: string
          manufactore_year: number
          manufacture: string
          serial_number: string
          start_use_year: number
          type: string
          unit_number: string
        }
        Insert: {
          brand: string
          capacity: string
          category: string
          company_id: string
          created_at?: string
          id?: string
          location: string
          made_in: string
          manufactore_year: number
          manufacture: string
          serial_number: string
          start_use_year: number
          type: string
          unit_number: string
        }
        Update: {
          brand?: string
          capacity?: string
          category?: string
          company_id?: string
          created_at?: string
          id?: string
          location?: string
          made_in?: string
          manufactore_year?: number
          manufacture?: string
          serial_number?: string
          start_use_year?: number
          type?: string
          unit_number?: string
        }
      }
      unit_registration: {
        Row: {
          created_at: string
          id: number
          registered_at: string
          registration_number: string
          unit_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          registered_at: string
          registration_number: string
          unit_id: string
        }
        Update: {
          created_at?: string
          id?: number
          registered_at?: string
          registration_number?: string
          unit_id?: string
        }
      }
      user_permission: {
        Row: {
          created_at: string
          id: string
          iud_company: boolean
          iud_unit: boolean
          read_company: boolean
          read_other_profile: boolean
          read_unit: boolean
        }
        Insert: {
          created_at?: string
          id: string
          iud_company?: boolean
          iud_unit?: boolean
          read_company?: boolean
          read_other_profile?: boolean
          read_unit?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          iud_company?: boolean
          iud_unit?: boolean
          read_company?: boolean
          read_other_profile?: boolean
          read_unit?: boolean
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
