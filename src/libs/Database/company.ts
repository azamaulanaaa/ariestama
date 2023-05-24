import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DatabaseType } from './supabase';
import type { Result, Error, Company } from './type';

class CompanyDB {
    private supabaseClient: SupabaseClient<DatabaseType>;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
    }

    async gets(offset: number = 0, limit: number = 100) {
        const db_result = await this.supabaseClient
            .from('company')
            .select('*')
            .range(offset, offset + limit);

        let error: Error | null = null;
        if (db_result.error) {
            error = {
                code: db_result.error.code,
                text: db_result.error.message,
            };
        }

        let data: Company[] = [];
        if (db_result.data) {
            data = db_result.data.map((data) => ({
                id: data.id,
                name: data.name,
                branch: data.branch,
                address: data.address,
                sub_district: data.sub_district,
                city: data.city,
                province: data.province,
                zip_code: data.zip_code,
                user_id: data.user_id,
            }));
        }

        let count: number = 0;
        if (db_result.count) {
            count = db_result.count;
        }

        let result: Result<Company> = {
            error: error,
            data: data,
            count: count,
        };
        return result;
    }

    async getsById(id: string, offset: number = 0, limit: number = 100) {
        const db_result = await this.supabaseClient
            .from('company')
            .select('*')
            .eq('id', id)
            .range(offset, limit);

        let error: Error | null = null;
        if (db_result.error) {
            error = {
                code: db_result.error.code,
                text: db_result.error.message,
            };
        }

        let data: Company[] = [];
        if (db_result.data) {
            data = db_result.data.map((data) => ({
                id: data.id,
                name: data.name,
                branch: data.branch,
                address: data.address,
                sub_district: data.sub_district,
                city: data.city,
                province: data.province,
                zip_code: data.zip_code,
                user_id: data.user_id,
            }));
        }

        let count: number = 0;
        if (db_result.count) {
            count = db_result.count;
        }

        let result: Result<Company> = {
            error: error,
            data: data,
            count: count,
        };
        return result;
    }

    async insert(insert_data: {
        name: string;
        branch: string;
        address: string;
        sub_district: string;
        city: string;
        province: string;
        zip_code: number;
        user_id: string;
    }) {
        const db_result = await this.supabaseClient
            .from('company')
            .insert(insert_data);
        let error: Error | null = null;
        if (db_result.error) {
            error = {
                code: db_result.error.code,
                text: db_result.error.message,
            };
        }

        let data: Company[] = [];

        let count: number = 0;
        if (db_result.count) {
            count = db_result.count;
        }

        let result: Result<Company> = {
            error: error,
            data: data,
            count: count,
        };
        return result;
    }
}

export default CompanyDB;
