import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import {
    useSessionContext,
    useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { AuthResponse } from '@supabase/supabase-js';

import Alert, { AlertProps } from '../components/Alert';
import Input from '../components/Input';
import local from '../locals/en';
import Database from '../types/database';

interface SignInData {
    email: string;
    password: string;
}

function SignIn() {
    const router = useRouter();

    const { session } = useSessionContext();
    if (session) {
        router.push('/dashboard');
    }

    const supabaseClient = useSupabaseClient<Database>();

    const [signInData, setSignInData] = useState<null | SignInData>(null);
    const [alertProps, setAlertProps] = useState<null | AlertProps>(null);

    useEffect(() => {
        if (signInData) {
            supabaseClient.auth
                .signInWithPassword(signInData)
                .then((res: AuthResponse) => {
                    if (res.error) {
                        setAlertProps({
                            title: local.auth.signin_error_general_title,
                            message: res.error.message,
                        });
                        return;
                    }
                });
        }
    }, [supabaseClient, signInData]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const form_data = new FormData(form);

        const email_form = form_data.get('email');
        const password_form = form_data.get('password');

        if (email_form && password_form) {
            setSignInData({
                email: email_form.toString(),
                password: password_form.toString(),
            });
        }
    };

    const SignInAlert = () => {
        if (!alertProps) return null;

        return <Alert {...alertProps} />;
    };

    return (
        <div className="border w-[400px] p-4 m-auto mt-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="font-bold">
                            {local.auth.signin_header}
                        </h1>
                    </div>
                    <SignInAlert />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={local.auth.email}
                        required
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder={local.auth.password}
                        required
                    />
                    <div>
                        <Link href="/register">{local.auth.signup_link}</Link>
                    </div>
                    <button
                        type="submit"
                        className="border w-full rounded col-span-2 p-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
