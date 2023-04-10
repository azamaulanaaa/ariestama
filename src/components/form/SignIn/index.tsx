import { FormEvent } from 'react';
import { Alert, Button, Input, Typography } from '@material-tailwind/react';

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
            <Typography variant="h4" component="h1">
                Sign in
            </Typography>
            <Typography color="gray" className="mt-1 font-ormal">
                to continue to Ariestama System
            </Typography>
            <div className="flex flex-col gap-6 mt-6">
                <ErrorAlert errorMessage={props.errorMessage} />
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    labelProps={{ htmlFor: 'email' }}
                    required
                    size="lg"
                    error={props.errorMessage !== undefined}
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    labelProps={{ htmlFor: 'password' }}
                    required
                    size="lg"
                    error={props.errorMessage !== undefined}
                />
            </div>
            <Button type="submit" fullWidth className="mt-8" ripple={false}>
                Submit
            </Button>
        </form>
    );
};

const ErrorAlert = ({ errorMessage }: { errorMessage?: string }) => {
    if (!errorMessage) return null;

    return <Alert color="red">{errorMessage}</Alert>;
};

export default SignIn;
