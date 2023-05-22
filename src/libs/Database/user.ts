import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DatabaseType } from './supabase';
import type { Result, Error, User } from './type';

// TODO: update with new type and new table
class UserDB {
    private supabaseClient: SupabaseClient<DatabaseType>;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
    }

    async gets(offset: number = 0, limit: number = 100) {
        const db_result = await this.supabaseClient
            .from('user')
            .select('*')
            .range(offset, limit);

        let error: Error | null = null;
        if (db_result.error) {
            error = {
                code: db_result.error.code,
                text: db_result.error.message,
            };
        }

        let data: User[] = [];
        if (db_result.data) {
            data = db_result.data.map((data) => ({
                id: data.id,
                name: data.name,
                permission: { ...(data.permission as any) },
            }));
        }
        let count: number = 0;
        if (db_result.count) {
            count = db_result.count;
        }

        let result: Result<User> = {
            error: error,
            data: data,
            count: count,
        };
        return result;
    }

    async getsById(id: string, offset: number = 0, limit: number = 100) {
        const db_result = await this.supabaseClient
            .from('user')
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

        let data: User[] = [];
        if (db_result.data) {
            data = db_result.data.map((data) => ({
                id: data.id,
                name: data.name,
                permission: { ...(data.permission as any) },
            }));
        }
        let count: number = 0;
        if (db_result.count) {
            count = db_result.count;
        }

        let result: Result<User> = {
            error: error,
            data: data,
            count: count,
        };
        return result;
    }

    async getMine() {
        const {
            data: { session },
            error,
        } = await this.supabaseClient.auth.getSession();

        if (error) {
            const result: Result<User> = {
                error: {
                    code: error.name,
                    text: error.message,
                },
                data: [],
                count: 0,
            };

            return result;
        }

        if (!session) {
            const result: Result<User> = {
                error: {
                    code: '-',
                    text: 'something wrong.',
                },
                data: [],
                count: 0,
            };

            return result;
        }

        const user_id = session.user.id;
        const result = await this.getsById(user_id);

        return result;
    }
}

export default UserDB;
