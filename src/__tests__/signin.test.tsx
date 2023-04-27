import { AuthError } from '@supabase/supabase-js';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInPage from '@/pages/signin';
import Config from '@/config';
import Database from '@/libs/Database';

const useRouter = jest.fn();
jest.mock('next/router', () => ({
    useRouter() {
        return useRouter();
    },
}));

const useSessionContext = jest.fn();
jest.mock('@/components/SessionContext', () => ({
    useSessionContext() {
        return useSessionContext();
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
        useSessionContext.mockReturnValue({ userPermission: {} });

        render(<SignInPage />);
        const loading = screen.queryByRole('status');

        await waitFor(() => {
            screen.getByRole('form');
            expect(loading).not.toBeInTheDocument();
        });
    });

    it('renders Alert and maintains input data for incorrect signin', async () => {
        const message = 'some';
        const email = 'some@email.com';
        const password = 'some';

        useRouter.mockReturnValue({ isReady: true });

        const database = new Database({} as any);
        jest.spyOn(database.auth, 'SignIn').mockResolvedValue(
            new AuthError(message)
        );
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });

        render(<SignInPage />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const btn_submit = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, email);
        await user.type(input_password, password);
        await user.click(btn_submit);

        await waitFor(() => {
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(message);

            expect(input_email).toHaveValue(email);
            expect(input_password).toHaveValue(password);
        });
    });

    it('redirect to dashboard for success signin', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });

        const database = new Database({} as any);
        jest.spyOn(database.auth, 'SignIn').mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });

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
        useSessionContext.mockReturnValue({ userPermission: { signin: true } });

        render(<SignInPage />);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
            expect(push).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('render loading is submit response on process', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });

        const database = new Database({} as any);
        jest.spyOn(database.auth, 'SignIn').mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });

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
});
