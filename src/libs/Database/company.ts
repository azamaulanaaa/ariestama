import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DatabaseType } from './supabase';

class Company {
    private supabaseClient: SupabaseClient<DatabaseType>;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
    }

    async list(offset: number = 0, limit: number = 100) {
        const result = await this.supabaseClient
            .from('company')
            .select('*')
            .range(offset, limit);
        return result;
    }

    async insert(data: {
        name: string;
        branch: string;
        address: string;
        sub_district: string;
        city: string;
        province: string;
        zip_code: number;
    }) {
        const result = await this.supabaseClient.from('company').insert(data);
        return result;
    }
}

export default Company;
