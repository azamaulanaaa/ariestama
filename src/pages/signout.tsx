import { useRouter } from 'next/router';
import { AuthError } from '@supabase/supabase-js';

import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/Loading';
import Config from '@/config';

const SignOut = () => {
    const router = useRouter();

    const { isReady, supabaseClient } = useSessionContext();

    if (router.isReady && isReady) {
        supabaseClient.auth
            .signOut()
            .then((res: { error: AuthError | null }) => {
                if (res.error) return;
                router.push(Config.Url.SignIn);
            });
    }

    return (
        <div className="grid h-screen place-items-centers">
            <Loading />
        </div>
    );
};

export default SignOut;
