import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthError } from '@supabase/supabase-js';
import Database from '../../types/database';

function SignOut() {
    const router = useRouter();

    const supabaseClient = useSupabaseClient<Database>();

    supabaseClient.auth.signOut().then((res: { error: AuthError | null }) => {
        if (!res.error) {
            router.push('/');
            return;
        }
    });

    return null;
}

export default SignOut;
