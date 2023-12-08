import {
  SupabaseClient,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";
export type { Session, AuthError } from "@supabase/supabase-js";

import { Database as DatabaseSupabase } from "./supabase";

export type DatabaseRaw = DatabaseSupabase;
export type Database = SupabaseClient<DatabaseRaw>;
export const newDatabase = createPagesBrowserClient;
