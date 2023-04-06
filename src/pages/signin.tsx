import { AuthError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SignInForm from '@/components/form/SignIn';
import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/base/Loading';

function SignIn() {
    const { isReady, session, supabaseClient } = useSessionContext();
    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session]);

    const handleSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        setLoading(true);
        const { error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        router.push('/dashboard');
    };

    return (
        <div className="grid h-screen place-items-center">
            <div className="border w-[400px] p-4 m-4">
                <Loading isLoading={!isReady || !router.isReady || loading}>
                    <SignInForm
                        onSubmit={handleSubmit}
                        errorMessage={error?.message}
                    />
                </Loading>
            </div>
        </div>
    );
}

export default SignIn;
