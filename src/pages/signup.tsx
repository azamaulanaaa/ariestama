import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSessionContext } from '@/components/SessionContext';
import Loading from '@/components/Loading';
import SignUpForm, { SignUpFormData } from '@/components/SignUpForm';
import { AlertProps, Card, CardBody } from '@material-tailwind/react';
import Config from '@/config';

function SignUp() {
    const router = useRouter();
    const session = useSessionContext();

    const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(false);

    if (session.userPermission?.signin && router.isReady)
        router.push(Config.Url.Dashboard);

    const handleSubmit = async (data: SignUpFormData) => {
        setAlertProps(undefined);
        setLoading(true);
        const error = await session.database.auth.SignUp({
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
                <Card className="w-[350px]">
                    <CardBody>
                        <SignUpForm
                            onSubmit={handleSubmit}
                            alertProps={alertProps}
                        />
                    </CardBody>
                </Card>
            </Loading>
        </div>
    );
}

export default SignUp;
