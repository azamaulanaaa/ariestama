import { SupabaseClient } from '@supabase/supabase-js';

import { Database as DatabaseType } from './supabase';
import Auth from './auth';
import UserPermission from './user_permission';
import Unit from './unit';
import Company from './company';

class Database {
    private supabaseClient: SupabaseClient<DatabaseType>;

    auth: Auth;
    user_permission: UserPermission;
    unit: Unit;
    company: Company;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;

        this.auth = new Auth(this.supabaseClient);
        this.user_permission = new UserPermission(this.supabaseClient);
        this.unit = new Unit(this.supabaseClient);
        this.company = new Company(this.supabaseClient);
    }
}

export default Database;
