import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { AuthResponse } from '@supabase/supabase-js';

import Alert, { AlertProps } from '../components/Alert';
import Input from '../components/Input';
import local from '../locals/en';
import Database from '../types/database';

interface SignUpData {
    email: string;
    password: string;
}

function SignUp() {
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
        if (user) router.push('/dashboard');
    }, [router, user]);

    const supabaseClient = useSupabaseClient<Database>();

    const [signUpData, setSignUpData] = useState<null | SignUpData>(null);
    const [alertProps, setAlertProps] = useState<null | AlertProps>(null);

    useEffect(() => {
        if (signUpData) {
            supabaseClient.auth
                .signUp({
                    ...signUpData,
                })
                .then((res: AuthResponse) => {
                    if (res.error) {
                        setAlertProps({
                            title: local.auth.signup_error_general_title,
                            message: res.error.message,
                        });
                    } else {
                        setAlertProps({
                            title: local.auth.signup_success_title,
                            message: local.auth.signup_success_message,
                        });
                    }
                });
        }
    }, [supabaseClient, signUpData]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const form_data = new FormData(form);

        const email_form = form_data.get('email');
        const password_form = form_data.get('password');
        const confirm_password_form = form_data.get('confirm_password');

        if (password_form && confirm_password_form) {
            if (password_form.toString() != confirm_password_form.toString()) {
                setAlertProps({
                    title: local.auth.signup_error_confirm_password_title,
                    message: local.auth.signup_error_confirm_password_message,
                });
            }

            if (email_form) {
                setSignUpData({
                    email: email_form.toString(),
                    password: password_form.toString(),
                });
            }
        }
    };

    const SignUpAlert = () => {
        if (!alertProps) return null;

        return <Alert {...alertProps} />;
    };

    return (
        <div className="border w-[400px] p-4 m-auto mt-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold">{local.auth.signup_header}</h1>
                    <SignUpAlert />
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
                    <Input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        placeholder={local.auth.confirm_password}
                        required
                    />
                    <div>
                        <Link href="/login">{local.auth.signin_link}</Link>
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

export default SignUp;
