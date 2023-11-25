import {
  SupabaseClient,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";
export type { Session, AuthError } from "@supabase/supabase-js";

import { Database as DatabaseType } from "./supabase";

export type Database = SupabaseClient<DatabaseType>;
export const newDatabase = createPagesBrowserClient;
