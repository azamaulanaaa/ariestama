import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from '.';

describe('SignUp Form Component', () => {
    const user = userEvent.setup();
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('default render', () => {
        render(<SignUpForm />);

        const title = screen.getByRole('heading');
        screen.getByRole('form');
        screen.getByLabelText(/email/i);
        screen.getByLabelText(/^password/i);
        screen.getByLabelText(/confirm password/i);
        const btn_submit = screen.getByRole('button');

        expect(title).toHaveTextContent('Sign up');
        expect(btn_submit).toHaveTextContent(/submit/i);
    });

    it('call onSubmit on click submit botton', async () => {
        const handleSubmit = jest.fn();
        const data = {
            email: 'some@email.com',
            password: 'somesome',
        };

        render(<SignUpForm onSubmit={handleSubmit} />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);
        const btn_submit = screen.getByRole('button');

        await user.type(input_email, data.email);
        await user.type(input_password, data.password);
        await user.type(input_confirm_password, data.password);
        await user.click(btn_submit);

        await waitFor(() => {
            expect(handleSubmit).toBeCalledTimes(1);
            expect(handleSubmit).toBeCalledWith(data);
        });
    });

    it('support error message', async () => {
        const message = 'some';

        render(<SignUpForm alertProps={{ color: 'red', children: message }} />);

        await waitFor(() => {
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(message);
        });
    });

    it('support success message', async () => {
        const message = 'some';

        render(
            <SignUpForm alertProps={{ color: 'green', children: message }} />
        );

        await waitFor(() => {
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(message);
        });
    });

    it('everytimes password change make sure password and confirm password are the same', async () => {
        render(<SignUpForm />);

        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);

        expect(input_confirm_password).toBeInvalid();
        await user.type(input_password, 'some');
        await waitFor(() => {
            expect(input_confirm_password).toBeInvalid();
        });
        await user.type(input_confirm_password, 'some2');
        await user.type(input_password, '2');
        await waitFor(() => {
            expect(input_confirm_password).toBeValid();
        });
    });

    it('everytimes confirm password change make sure password and confirm password are the same', async () => {
        render(<SignUpForm />);

        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);

        expect(input_confirm_password).toBeInvalid();
        await user.type(input_confirm_password, 'some');
        await waitFor(() => {
            expect(input_confirm_password).toBeInvalid();
        });
        await user.type(input_password, 'some2');
        await user.type(input_confirm_password, '2');
        await waitFor(() => {
            expect(input_confirm_password).toBeValid();
        });
    });

    it('valid password should have minimum char of 6', async () => {
        render(<SignUpForm />);

        const input_password = screen.getByLabelText(/^password/i);
        expect(input_password).toBeInvalid();

        for (let i = 0; i < 5; i++) {
            await user.type(input_password, 'w');
            await waitFor(() => {
                expect(input_password).toBeInvalid();
            });
        }

        await user.type(input_password, 'w');
        await waitFor(() => {
            expect(input_password).toBeValid();
        });
    });

    it('set email to invalid if inputed with invalid email', async () => {
        const invalidEmails = [
            'some',
            'some@',
            'some@email',
            'some @email.com',
        ];

        render(<SignUpForm />);

        const input_email = screen.getByLabelText(/email/i);

        expect(input_email).toBeInvalid();

        invalidEmails.forEach(async (invalidEmail) => {
            await user.clear(input_email);
            await user.type(input_email, invalidEmail);
            await waitFor(() => {
                expect(input_email).toBeInvalid();
            });
        });
    });

    it('set email to valid if inputed with valid email', async () => {
        const validEmails = [
            'some@gmail.com',
            'some@example.com',
            's0m33@yahoo.to',
            'n4m3_e@domain.wow',
        ];

        render(<SignUpForm />);

        const input_email = screen.getByLabelText(/email/i);

        expect(input_email).toBeInvalid();

        validEmails.forEach(async (validEmail) => {
            await user.clear(input_email);
            await user.type(input_email, validEmail);
            await waitFor(() => {
                expect(input_email).toBeValid();
            });
        });
    });
});
