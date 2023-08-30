export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
        Relationships: [
          {
            foreignKeyName: "company_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "company_snapshot_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_snapshot_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
          series: string
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
          series: string
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
          series?: string
          user_id?: string
          yom?: number
        }
        Relationships: [
          {
            foreignKeyName: "unit_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "unit_snapshot_unit_id_fkey"
            columns: ["unit_id"]
            referencedRelation: "unit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_snapshot_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
