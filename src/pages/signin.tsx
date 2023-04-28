import { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { useRouter } from 'next/router';

import SignInForm, { SignInFormData } from '@/components/SignInForm';
import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/Loading';
import Config from '@/config';
import { Card, CardBody } from '@material-tailwind/react';

function SignIn() {
    const router = useRouter();
    const session = useSessionContext();

    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    if (session.userPermission?.signin && router.isReady)
        router.push(Config.Url.Dashboard);

    const handleSubmit = async (data: SignInFormData) => {
        setError(null);
        setLoading(true);

        const error = await session.database.auth.SignIn({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setError(error);
            setLoading(false);
        } else {
            router.push(Config.Url.Dashboard);
        }
    };

    return (
        <div className="grid h-screen place-items-center m-4">
            <Loading isLoading={loading}>
                <Card className="w-[350px]">
                    <CardBody>
                        <SignInForm
                            onSubmit={handleSubmit}
                            errorMessage={error?.message}
                        />
                    </CardBody>
                </Card>
            </Loading>
        </div>
    );
}

export default SignIn;
