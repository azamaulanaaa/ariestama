import { AuthError } from '@supabase/supabase-js';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInPage from '@/pages/signin';
import Database from '@/libs/Database';
import Config from '@/config';

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

describe('SignIn Page', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    const user = userEvent.setup();

    it('render SignIn form when all ready', async () => {
        useRouter.mockReturnValue({ isReady: true });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);
        render(<SignInPage />);
        await waitFor(() => {
            screen.getByRole('form');
        });
    });

    it('render loading animation if router is not ready', async () => {
        useRouter.mockReturnValue({ isReady: false });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);
        render(<SignInPage />);

        await waitFor(() => {
            screen.getByRole('status');
        });
    });

    it('render Alert for incorrect signin', async () => {
        const message = 'some';

        useRouter.mockReturnValue({ isReady: true });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);
        jest.spyOn(session.auth, 'SignIn').mockResolvedValue(
            new AuthError(message)
        );

        render(<SignInPage />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const btn_submit = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, 'some@email.com');
        await user.type(input_password, 'some');
        await user.click(btn_submit);

        await waitFor(() => {
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(message);

            expect(input_email).toHaveValue('some@email.com');
            expect(input_password).toHaveValue('some');
        });
    });

    it('redirect to dashboard for success signin', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(false);
        jest.spyOn(session.auth, 'SignIn').mockResolvedValue(null);

        render(<SignInPage />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const btn_submit = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, 'some@email.com');
        await user.type(input_password, 'some');
        await user.click(btn_submit);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
            expect(push).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('redirect to dashboard for signed user', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(true);

        render(<SignInPage />);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
            expect(push).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('render loading is submit response on process', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        jest.spyOn(session.auth, 'IsSignedIn').mockResolvedValue(true);
        jest.spyOn(session.auth, 'SignIn').mockResolvedValue(null);

        render(<SignInPage />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const btn_submit = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, 'some@email.com');
        await user.type(input_password, 'some');
        await user.click(btn_submit);

        await waitFor(() => {
            screen.getByRole('status');
        });
    });

    it('verify signin only once', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        const IsSignedIn = jest
            .spyOn(session.auth, 'IsSignedIn')
            .mockResolvedValue(true);

        render(<SignInPage />);

        await waitFor(() => {
            expect(IsSignedIn).toBeCalledTimes(1);
        });
    });
});
