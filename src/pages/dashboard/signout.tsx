import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthError } from '@supabase/supabase-js';

function signout() {
    const router = useRouter();

    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        supabaseClient.auth
            .signOut()
            .then((res: { error: AuthError | null }) => {
                if (!res.error) {
                    router.push('/');
                    return;
                }
            });
    });

    return null;
}

export default signout;
