import Alert from '@/components/base/Alert';
import TextField from '@/components/base/TextField';
import Typography from '@/components/base/Typography';
import { FormEvent } from 'react';

interface SignInProps {
    onSubmit?: (data: SignInData) => void;
    errorMessage?: string;
}

interface SignInData {
    email: string;
    password: string;
}

const SignIn = (props: SignInProps) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (!props.onSubmit) return;

        event.preventDefault();

        const form = event.currentTarget;
        const form_data = new FormData(form);

        const email_form = form_data.get('email');
        const password_form = form_data.get('password');

        if (!email_form || !password_form) return;

        props.onSubmit({
            email: email_form.toString(),
            password: password_form.toString(),
        });
    };

    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div>
                    <Typography.Heading level={2}>Sign in</Typography.Heading>
                </div>
                <ErrorAlert errorMessage={props.errorMessage} />
                <TextField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
                <button
                    type="submit"
                    className="border w-full rounded col-span-2 p-2"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

const ErrorAlert = ({ errorMessage }: { errorMessage?: string }) => {
    if (!errorMessage) return null;

    return <Alert title="Error" message={errorMessage} />;
};

export default SignIn;
