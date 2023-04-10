import { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { useRouter } from 'next/router';

import SignInForm from '@/components/form/SignIn';
import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/Loading';

function SignIn() {
    const { isReady, session, supabaseClient } = useSessionContext();
    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    if (session) {
        router.push('/dashboard');
    }

    const handleSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        setError(null);
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
        <div className="grid h-screen place-items-center m-4">
            <Loading isLoading={loading || !router.isReady || !isReady}>
                <div className="border border-gray-300 rounded w-[350px] p-4">
                    <SignInForm
                        onSubmit={handleSubmit}
                        errorMessage={error?.message}
                    />
                </div>
            </Loading>
        </div>
    );
}

export default SignIn;
