import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DatabaseType } from './supabase';

class UserPermission {
    private supabaseClient: SupabaseClient<DatabaseType>;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
    }

    async mine() {
        const sessionRes = await this.supabaseClient.auth.getSession();
        if (!sessionRes.data) return null;

        const permissionRes = await this.supabaseClient
            .from('user_permission')
            .select('*')
            .eq('id', sessionRes.data.session?.user.id)
            .limit(1);

        if (permissionRes.data && permissionRes.count != 0)
            return permissionRes.data[0];

        return null;
    }
}

export default UserPermission;
