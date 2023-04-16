import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SupabaseClient } from '@supabase/supabase-js';

import { Database as DatabaseType } from './supabase';
import Auth from './auth';

class Database {
    private supabaseClient: SupabaseClient<DatabaseType>;

    auth: Auth;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
        /*
        this.supabaseClient = createBrowserSupabaseClient<DatabaseType>({
            supabaseUrl: host,
            supabaseKey: key,
        });
        */

        this.auth = new Auth(this.supabaseClient);
    }
}

export default Database;
