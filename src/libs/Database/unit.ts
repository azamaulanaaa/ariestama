import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DatabaseType } from './supabase';
import type { Result, Error, Unit } from './type';

class UnitDB {
    private supabaseClient: SupabaseClient<DatabaseType>;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
    }

    async list(offset: number = 0, limit: number = 100) {
        const db_result = await this.supabaseClient
            .from('unit')
            .select('*')
            .range(offset, limit);

        let error: Error | null = null;
        if (db_result.error) {
            error = {
                code: db_result.error.code,
                text: db_result.error.message,
            };
        }

        let data: Unit[] = [];
        if (db_result.data) {
            data = db_result.data.map((data) => ({
                serial_number: data.serial_number,
                brand: data.brand,
                oem: data.oem,
                yom: data.yom,
                made_in: data.made_in,
                extra: data.extra as any,
                user_id: data.user_id,
            }));
        }

        let count: number = 0;
        if (db_result.count) {
            count = db_result.count;
        }

        let result: Result<Unit> = {
            error: error,
            data: data,
            count: count,
        };
        return result;
    }

    async insert(insert_data: {
        serial_number: string;
        brand: string;
        oem: string;
        yom: number;
        made_in: string;
        user_id: string;
        extra: {};
    }) {
        const db_result = await this.supabaseClient
            .from('unit')
            .insert(insert_data);

        let error: Error | null = null;
        if (db_result.error) {
            error = {
                code: db_result.error.code,
                text: db_result.error.message,
            };
        }

        let data: Unit[] = [];

        let count: number = 0;
        if (db_result.count) {
            count = db_result.count;
        }

        let result: Result<Unit> = {
            error: error,
            data: data,
            count: count,
        };
        return result;
    }
}

export default UnitDB;
