import {
  SupabaseClient,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";
export type { Session, AuthError } from "@supabase/supabase-js";

import { Database as DatabaseRaw } from "./supabase";

export type DatabaseRaw = DatabaseRaw;
export type Database = SupabaseClient<DatabaseRaw>;
export const newDatabase = createPagesBrowserClient;
