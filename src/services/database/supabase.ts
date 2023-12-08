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
      bookkeeping_account: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookkeeping_account_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      bookkeeping_transaction: {
        Row: {
          created_at: string
          date: string
          description: string
          destination: string | null
          id: string
          source: string | null
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          date?: string
          description: string
          destination?: string | null
          id?: string
          source?: string | null
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          destination?: string | null
          id?: string
          source?: string | null
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookkeeping_transaction_destination_fkey"
            columns: ["destination"]
            referencedRelation: "bookkeeping_account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookkeeping_transaction_source_fkey"
            columns: ["source"]
            referencedRelation: "bookkeeping_account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookkeeping_transaction_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      company: {
        Row: {
          address: string
          branch: string
          city: string
          created_at: string
          district: string
          id: string
          name: string
          province: string
          user_id: string
          zip_code: number
        }
        Insert: {
          address: string
          branch: string
          city: string
          created_at?: string
          district: string
          id?: string
          name: string
          province: string
          user_id: string
          zip_code: number
        }
        Update: {
          address?: string
          branch?: string
          city?: string
          created_at?: string
          district?: string
          id?: string
          name?: string
          province?: string
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
          extra?: Json
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
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
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
      user_permission: {
        Row: {
          bookkeeping_account_insert: boolean
          bookkeeping_account_read: boolean
          bookkeeping_account_update: boolean
          bookkeeping_transaction_insert: boolean
          bookkeeping_transaction_read: boolean
          bookkeeping_transaction_update: boolean
          caculators_safety: boolean
          company_insert: boolean
          company_read: boolean
          company_update: boolean
          created_at: string
          id: string
          unit_insert: boolean
          unit_read: boolean
          unit_update: boolean
          user_permission_update: boolean
        }
        Insert: {
          bookkeeping_account_insert?: boolean
          bookkeeping_account_read?: boolean
          bookkeeping_account_update?: boolean
          bookkeeping_transaction_insert?: boolean
          bookkeeping_transaction_read?: boolean
          bookkeeping_transaction_update?: boolean
          caculators_safety?: boolean
          company_insert?: boolean
          company_read?: boolean
          company_update?: boolean
          created_at?: string
          id: string
          unit_insert?: boolean
          unit_read?: boolean
          unit_update?: boolean
          user_permission_update?: boolean
        }
        Update: {
          bookkeeping_account_insert?: boolean
          bookkeeping_account_read?: boolean
          bookkeeping_account_update?: boolean
          bookkeeping_transaction_insert?: boolean
          bookkeeping_transaction_read?: boolean
          bookkeeping_transaction_update?: boolean
          caculators_safety?: boolean
          company_insert?: boolean
          company_read?: boolean
          company_update?: boolean
          created_at?: string
          id?: string
          unit_insert?: boolean
          unit_read?: boolean
          unit_update?: boolean
          user_permission_update?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_permission_id_fkey"
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

