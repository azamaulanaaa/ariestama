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

    async insert(data: {
        serial_number: string;
        brand: string;
        oem: string;
        yom: number;
        made_in: string;
    }) {
        const result = await this.supabaseClient.from('unit').insert(data);
        return result;
    }
}

export default Unit;
