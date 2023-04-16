import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/Loading';
import SignUpForm, { SignUpFormData } from '@/components/SignUpForm';
import { AlertProps } from '@material-tailwind/react';
import Config from '@/config';

function SignUp() {
    const session = useSessionContext();
    const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    if (router.isReady)
        session.auth.IsSignedIn().then((isTrue) => {
            if (isTrue) {
                router.push(Config.Url.Dashboard);
                return;
            }

            setLoading(false);
        });

    const handleSubmit = async (data: SignUpFormData) => {
        setAlertProps(undefined);
        setLoading(true);
        const error = await session.auth.SignUp({
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
            <Loading isLoading={loading}>
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
