import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/Loading';
import SignUpForm, { SignUpData } from '@/components/form/SignUp';
import { AlertProps } from '@material-tailwind/react';

function SignUp() {
    const { isReady, session, supabaseClient } = useSessionContext();
    const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    if (session) {
        router.push('/dashboard');
    }

    const handleSubmit = async (data: SignUpData) => {
        setAlertProps(undefined);
        setLoading(true);
        const { error } = await supabaseClient.auth.signUp({
            email: data.email,
            password: data.password,
        });
        if (error) {
            setAlertProps({ color: 'red', children: error.message });
            setLoading(false);
            return;
        }
        setAlertProps({
            color: 'green',
            children: 'Sign up successful. Check your email for verification.',
        });
        setLoading(false);
        return;
    };

    return (
        <div className="grid h-screen place-items-center m-4">
            <Loading isLoading={loading || !router.isReady || !isReady}>
                <div className="border border-gray-300 rounded w-[350px] p-4">
                    <SignUpForm
                        onSubmit={handleSubmit}
                        alertProps={alertProps}
                    />
                </div>
            </Loading>
        </div>
    );
}

export default SignUp;
