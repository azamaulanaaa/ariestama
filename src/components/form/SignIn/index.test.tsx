import SignIn from '.';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
    cleanup();
});

describe('SignIn Form', () => {
    const user = userEvent.setup();

    it('render properly', () => {
        render(<SignIn />);
        screen.getByRole('form');
        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent('SignIn');
        screen.getByPlaceholderText('Email');
        screen.getByPlaceholderText('Password');
        screen.getByRole('button');
    });

    it('call onSubmit when form is submited', async () => {
        const handleSubmit = jest.fn();
        const data = {
            email: 'name@example.com',
            password: 'password',
        };
        render(<SignIn onSubmit={handleSubmit} />);
        const form = screen.getByRole('form');
        const input_email = screen.getByPlaceholderText('Email');
        const input_password = screen.getByPlaceholderText('Password');
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

    it('will not submit on incorrect email input', async () => {
        const handleSubmit = jest.fn();

        render(<SignIn onSubmit={handleSubmit} />);
        const form = screen.getByRole('form');
        const input_email = screen.getByPlaceholderText('Email');
        const input_password = screen.getByPlaceholderText('Password');
        const btn_submit = screen.getByRole('button');

        await user.type(input_password, 'some');

        const testCases = [
            'not_email',
            'not@email',
            'not@email.',
            'not @email.com',
        ];
        testCases.forEach(async (testCase) => {
            await user.type(input_email, testCase);
            await user.click(btn_submit);

            await waitFor(() => {
                expect(form).toHaveFormValues({ email: '', password: '' });
                expect(handleSubmit).oBeCalledTimes(0);
            });
        });
    });

    it('support error message', async () => {
        const message = 'some';

        render(<SignIn errorMessage={message} />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent(message);
    });
});
