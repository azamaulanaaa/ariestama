import { SupabaseClient } from '@supabase/supabase-js';

import { Database as DatabaseType } from './supabase';
import Auth from './auth';
import Unit from './unit';
import UserPermission from './user_permission';

class Database {
    private supabaseClient: SupabaseClient<DatabaseType>;

    auth: Auth;
    unit: Unit;
    user_permission: UserPermission;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;

        this.auth = new Auth(this.supabaseClient);
        this.unit = new Unit(this.supabaseClient);
        this.user_permission = new UserPermission(this.supabaseClient);
    }
}

export default Database;
