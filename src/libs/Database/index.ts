import { SupabaseClient } from "@supabase/supabase-js";

import { Database as DatabaseType } from "./supabase";
import Auth from "./auth";
import UserDB from "./user";
import CompanyDB from "./company";
import Unit from "./unit";
export * from "./type";

class Database {
  private supabaseClient: SupabaseClient<DatabaseType>;

  auth: Auth;
  user: UserDB;
  company: CompanyDB;
  unit: Unit;

  constructor(supabaseClient: SupabaseClient<DatabaseType>) {
    this.supabaseClient = supabaseClient;

    this.auth = new Auth(this.supabaseClient);
    this.user = new UserDB(this.supabaseClient);
    this.company = new CompanyDB(this.supabaseClient);
    this.unit = new Unit(this.supabaseClient);
  }
}

export default Database;
