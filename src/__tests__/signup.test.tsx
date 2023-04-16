import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthError } from '@supabase/supabase-js';

import Database from '@/libs/Database';
import SignUp from '@/pages/signup';

const useRouter = jest.fn();
jest.mock('next/router', () => ({
    useRouter() {
        return useRouter();
    },
}));

const session = new Database({} as any);
jest.mock('@/components/SessionContext', () => ({
    useSessionContext() {
        return session;
    },
}));

describe('SignUp Page', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup;
    });

    const user = userEvent.setup();

    it('render signup form when all ready', async () => {
        useRouter.mockReturnValue({
            isReady: true,
        });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);

        render(<SignUp />);

        await waitFor(() => {
            screen.getByRole('form');
            screen.getByLabelText(/email/i);
            screen.getByLabelText(/^password/i);
            screen.getByLabelText(/confirm password/i);
            screen.getByRole('button');
        });
    });

    it('redirect for signed user', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(true);

        render(<SignUp />);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
        });
    });

    it('render loading animation if router is not ready', async () => {
        useRouter.mockReturnValue({ isReady: false });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);

        render(<SignUp />);
        screen.getByRole('status');
    });

    it('render error alert on fail signup', async () => {
        const data = {
            email: 'some@example.com',
            password: 'somesome',
            alert: 'some',
        };

        useRouter.mockReturnValue({ isReady: true });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);
        const signUpFn = jest
            .spyOn(session.auth, 'SignUp')
            .mockResolvedValue(new AuthError(data.alert));

        render(<SignUp />);

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
            expect(signUpFn).toBeCalledTimes(1);
            expect(signUpFn).toBeCalledWith({
                email: data.email,
                password: data.password,
            });
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(data.alert);
        });
    });

    it('render success alert on success signup', async () => {
        const data = {
            email: 'some@example.com',
            password: 'somesome',
        };

        useRouter.mockReturnValue({ isReady: true });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);
        const signUpFn = jest
            .spyOn(session.auth, 'SignUp')
            .mockResolvedValue(null);

        render(<SignUp />);

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
            expect(signUpFn).toBeCalledTimes(1);
            expect(signUpFn).toBeCalledWith({
                email: data.email,
                password: data.password,
            });
            screen.getByRole('alert');
        });
    });

    it('render loading animation while process sending signup data to server', async () => {
        useRouter.mockReturnValue({ isReady: true });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);
        jest.spyOn(session.auth, 'SignUp').mockResolvedValue(null);

        render(<SignUp />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);
        const btn_submit = screen.getByRole('button');

        await user.type(input_email, 'some@exmplain.com');
        await user.type(input_password, 'somesome');
        await user.type(input_confirm_password, 'somesome');
        user.click(btn_submit);

        await waitFor(() => {
            screen.getByRole('status');
        });
    });
});
