import { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { useRouter } from 'next/router';

import SignInForm, { SignInFormData } from '@/components/SignInForm';
import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/Loading';
import Config from '@/config';

function SignIn() {
    const router = useRouter();
    const session = useSessionContext();

    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    if (router.isReady)
        session.auth.IsSignedIn().then((isTrue) => {
            if (isTrue) {
                router.push(Config.Url.Dashboard);
                return;
            }

            setLoading(false);
        });

    const handleSubmit = async (data: SignInFormData) => {
        setError(null);
        setLoading(true);
        const error = await session.auth.SignIn({
            email: data.email,
            password: data.password,
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
            <Loading isLoading={loading}>
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
