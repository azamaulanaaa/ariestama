import {
    Alert,
    AlertProps,
    Button,
    Input,
    Typography,
} from '@material-tailwind/react';
import { FormEvent, ChangeEvent, useRef, useState } from 'react';

export interface SignUpFormProps {
    onSubmit?: (data: SignUpFormData) => void;
    alertProps?: AlertProps;
}

export interface SignUpFormData {
    email: string;
    password: string;
}

const SignUpForm = (props: SignUpFormProps) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [passwordEnoughLength, setPasswordEnoughLength] =
        useState<boolean>(true);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !props.onSubmit ||
            !emailRef.current ||
            !passwordRef.current ||
            !confirmPasswordRef.current
        )
            return;

        if (!validatePassword) return;

        props.onSubmit({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });
    };

    const validatePassword = () => {
        if (!passwordRef.current || !confirmPasswordRef.current) return;

        if (passwordRef.current.value.length < 6) {
            setPasswordEnoughLength(false);
            passwordRef.current.setCustomValidity(
                'Password length is less than 6'
            );
        } else {
            setPasswordEnoughLength(true);
            passwordRef.current.setCustomValidity('');
        }

        if (passwordRef.current.value != confirmPasswordRef.current.value) {
            setPasswordMatch(false);
            confirmPasswordRef.current.setCustomValidity(
                'Confirm Password does not match to Password'
            );
        } else {
            setPasswordMatch(true);
            confirmPasswordRef.current.setCustomValidity('');
        }

        return passwordEnoughLength && passwordMatch;
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        validatePassword();
    };

    const FormAlert = () => {
        if (!props.alertProps) return null;
        return <Alert {...props.alertProps} />;
    };

    return (
        <form role="form" onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1">
                Sign up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                to have account in Ariestama System
            </Typography>
            <div className="flex flex-col gap-6 mt-6">
                <FormAlert />
                <Input
                    inputRef={emailRef}
                    id="email"
                    name="email"
                    label="Email"
                    labelProps={{ htmlFor: 'email' }}
                    type="email"
                    required
                    size="lg"
                />
                <Input
                    inputRef={passwordRef}
                    id="password"
                    name="password"
                    label="Password"
                    labelProps={{ htmlFor: 'password' }}
                    type="password"
                    required
                    minLength={6}
                    onInput={handlePasswordChange}
                    error={!passwordEnoughLength}
                    size="lg"
                />
                <Input
                    inputRef={confirmPasswordRef}
                    id="confirm-password"
                    name="confirm-password"
                    label="Confirm Password"
                    labelProps={{ htmlFor: 'confirm-password' }}
                    type="password"
                    required
                    onInput={handlePasswordChange}
                    error={!passwordMatch}
                    size="lg"
                />
                <div className="col-span-2">
                    <Button type="submit" ripple={false} fullWidth>
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
