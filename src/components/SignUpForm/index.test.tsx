import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignUpForm from '.';

jest.mock('material-ripple-effects', () => ({
    __esModule: true,
    default: () => ({
        create() {},
    }),
}));

describe('SignUp Form Component', () => {
    afterEach(() => {
        cleanup();
        jest.resetAllMocks();
    });

    it('default render', () => {
        render(<SignUpForm />);

        const form = screen.queryByRole('form');
        const input_email = screen.queryByLabelText(/email/i);
        const input_password = screen.queryByLabelText(/^password/i);
        const input_confirmPassword =
            screen.queryByLabelText(/confirm password/i);
        const button = screen.queryByRole('button');

        expect(form).toBeInTheDocument();
        expect(input_email).toBeInTheDocument();
        expect(input_password).toBeInTheDocument();
        expect(input_confirmPassword).toBeInTheDocument();
        expect(button).toHaveTextContent(/submit/i);
    });

    it('call onSubmit on click submit botton', async () => {
        const testdata = {
            email: 'some@email.com',
            password: 'somesome',
        };

        const handleSubmit = jest.fn();
        const user = userEvent.setup();

        render(<SignUpForm onSubmit={handleSubmit} />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);
        const btn_submit = screen.getByRole('button');

        await user.type(input_email, testdata.email);
        await user.type(input_password, testdata.password);
        await user.type(input_confirm_password, testdata.password);

        expect(handleSubmit).toBeCalledTimes(0);
        await user.click(btn_submit).then(() => {
            expect(handleSubmit).toBeCalledTimes(1);
            expect(handleSubmit).toBeCalledWith(testdata);
        });
    });

    it('support error message', async () => {
        const testdata = {
            message: 'some',
        };

        render(
            <SignUpForm
                alertProps={{ type: 'error', children: testdata.message }}
            />
        );
        const alert = screen.queryByRole('alert');

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(testdata.message);
    });

    it('support success message', async () => {
        const testdata = {
            message: 'some',
        };

        render(
            <SignUpForm
                alertProps={{ type: 'success', children: testdata.message }}
            />
        );
        const alert = screen.queryByRole('alert');

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(testdata.message);
    });

    it('everytimes password change make sure password and confirm password are the same', async () => {
        const user = userEvent.setup();

        render(<SignUpForm />);

        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);

        expect(input_confirm_password).toBeInvalid();
        await user.type(input_password, 'some').then(() => {
            expect(input_confirm_password).toBeInvalid();
        });
        await user.type(input_confirm_password, 'some2');
        await user.type(input_password, '2').then(() => {
            expect(input_confirm_password).toBeValid();
        });
    });

    it('everytimes confirm password change make sure password and confirm password are the same', async () => {
        const user = userEvent.setup();

        render(<SignUpForm />);

        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);

        expect(input_confirm_password).toBeInvalid();
        await user.type(input_confirm_password, 'some').then(() => {
            expect(input_confirm_password).toBeInvalid();
        });
        await user.type(input_password, 'some2');
        await user.type(input_confirm_password, '2').then(() => {
            expect(input_confirm_password).toBeValid();
        });
    });

    it('valid password should have minimum char of 6', async () => {
        const user = userEvent.setup();
        render(<SignUpForm />);

        const input_password = screen.getByLabelText(/^password/i);
        expect(input_password).toBeInvalid();

        const wait = '12345'.split('').map(async (char) => {
            return user.type(input_password, char).then(() => {
                expect(input_password).toBeInvalid();
            });
        });
        await Promise.all(wait);

        await user.type(input_password, '6').then(() => {
            expect(input_password).toBeValid();
        });
    });

    it('set email to invalid if inputed with invalid email', () => {
        const testdata = {
            invalidEmails: ['some', 'some@', 'some@email', 'some @email.com'],
        };
        const user = userEvent.setup();

        render(<SignUpForm />);

        const input_email = screen.getByLabelText(/email/i);

        expect(input_email).toBeInvalid();

        testdata.invalidEmails.forEach(async (invalidEmail) => {
            await user.clear(input_email);
            await user.type(input_email, invalidEmail).then(() => {
                expect(input_email).toBeInvalid();
            });
        });
    });

    it('set email to valid if inputed with valid email', () => {
        const testdata = {
            validEmails: [
                'some@gmail.com',
                'some@example.com',
                's0m33@yahoo.to',
                'n4m3_e@domain.wow',
            ],
        };
        const user = userEvent.setup();

        render(<SignUpForm />);

        const input_email = screen.getByLabelText(/email/i);

        expect(input_email).toBeInvalid();

        testdata.validEmails.forEach(async (validEmail) => {
            await user.clear(input_email);
            await user.type(input_email, validEmail).then(() => {
                expect(input_email).toBeValid();
            });
        });
    });
});
