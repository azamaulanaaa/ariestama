import { FormEvent } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';

import Alert, { AlertProps } from '@/components/Alert';

interface SignInFormProps {
    onSubmit?: (data: SignInFormData) => void;
    alertProps?: AlertProps;
}

export interface SignInFormData {
    email: string;
    password: string;
}

const SignInForm = (props: SignInFormProps) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!props.onSubmit) return;

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

    const FormAlert = () => {
        if (!props.alertProps) return null;
        return <Alert {...props.alertProps} />;
    };

    return (
        <form role="form" onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1">
                Sign in
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                to continue to Ariestama System
            </Typography>
            <div className="flex flex-col gap-6 mt-6">
                <FormAlert />
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    labelProps={{ htmlFor: 'email' }}
                    required
                    size="lg"
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    labelProps={{ htmlFor: 'password' }}
                    required
                    size="lg"
                />
            </div>
            <Button type="submit" fullWidth className="mt-8">
                Submit
            </Button>
        </form>
    );
};

export default SignInForm;
