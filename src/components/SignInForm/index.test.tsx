import SignInForm from '.';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
    cleanup();
});

describe('SignIn Form', () => {
    const user = userEvent.setup();

    it('render properly', () => {
        render(<SignInForm />);
        screen.getByRole('form');
        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent('Sign in');
        screen.getByLabelText(/email/i);
        screen.getByLabelText(/password/i);
        screen.getByRole('button');
    });

    it('call onSubmit when form is submited', async () => {
        const handleSubmit = jest.fn();
        const data = {
            email: 'name@example.com',
            password: 'password',
        };
        render(<SignInForm onSubmit={handleSubmit} />);
        const form = screen.getByRole('form');
        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const btn_submit = screen.getByRole('button');

        await user.type(input_email, data.email);
        await user.type(input_password, data.password);

        expect(form).toHaveFormValues(data);

        await user.click(btn_submit);

        await waitFor(() => {
            expect(handleSubmit).toBeCalledTimes(1);
            expect(handleSubmit).toBeCalledWith(data);
        });
    });

    it('support error message', async () => {
        const message = 'some';

        render(<SignInForm errorMessage={message} />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent(message);
    });
});