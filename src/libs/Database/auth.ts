import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DatabaseType } from './supabase';

class Auth {
    private supabaseClient: SupabaseClient<DatabaseType>;

    constructor(supabaseClient: SupabaseClient<DatabaseType>) {
        this.supabaseClient = supabaseClient;
    }

    async SignIn({ email, password }: { email: string; password: string }) {
        const { error } = await this.supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        return error;
    }

    async SignOut() {
        const { error } = await this.supabaseClient.auth.signOut();

        return error;
    }

    async SignUp({ email, password }: { email: string; password: string }) {
        const { error } = await this.supabaseClient.auth.signUp({
            email,
            password,
        });

        return error;
    }

    async IsSignedIn() {
        const result = await this.supabaseClient.auth.getSession();

        return result.data.session != null;
    }
}

export default Auth;
