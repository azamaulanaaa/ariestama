import { Alert, Button, Input, Typography } from '@material-tailwind/react';

export interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
    return (
        <form role="form">
            <div className="flex flex-col gap-4">
                <Typography variant="h2">Sign up</Typography>
                <Input
                    id="email"
                    name="email"
                    label="Email"
                    labelProps={{ htmlFor: 'email' }}
                    type="email"
                    required
                />
                <Input
                    id="password"
                    name="password"
                    label="Password"
                    labelProps={{ htmlFor: 'password' }}
                    type="password"
                    required
                />
                <Input
                    id="confirm-password"
                    name="confirm-password"
                    label="Confirm Password"
                    labelProps={{ htmlFor: 'confirm-password' }}
                    type="password"
                    required
                />
                <div className="col-span-2">
                    <Button type="submit">Submit</Button>
                </div>
            </div>
        </form>
    );
};

export default SignUp;
