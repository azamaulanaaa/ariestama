import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthError } from '@supabase/supabase-js';

function SignOut() {
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
    }, [router, supabaseClient]);

    return null;
}

export default SignOut;
