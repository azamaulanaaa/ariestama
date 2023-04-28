import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DatabaseType } from './supabase';

class Unit {
    private supabaseClient: SupabaseClient<DatabaseType>;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
    }

    async list(offset: number = 0, limit: number = 100) {
        const result = await this.supabaseClient
            .from('unit')
            .select('*')
            .range(offset, limit);
        return result;
    }
}

export default Unit;
