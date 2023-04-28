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
        cleanup();
        jest.resetAllMocks();
    });

    const database = new Database({} as any);

    it('render SignIn form when all ready', () => {
        useRouter.mockReturnValue({ isReady: true });
        useSessionContext.mockReturnValue({ userPermission: {} });

        render(<SignInPage />);
        const loading = screen.queryByRole('status');

        screen.getByRole('form');
        expect(loading).not.toBeInTheDocument();
    });

    it('renders Alert and maintains input data for incorrect signin', async () => {
        const testdata = {
            message: 'some',
            email: 'some@email.com',
            password: 'some',
        };
        useRouter.mockReturnValue({ isReady: true });

        jest.spyOn(database.auth, 'SignIn').mockResolvedValue(
            new AuthError(testdata.message)
        );
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });
        const user = userEvent.setup();

        render(<SignInPage />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const button = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, testdata.email);
        await user.type(input_password, testdata.password);
        await user.click(button);
        await waitFor(() => {
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(testdata.message);

            expect(input_email).toHaveValue(testdata.email);
            expect(input_password).toHaveValue(testdata.password);
        });
    });

    it('redirect to dashboard for success signin', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });

        jest.spyOn(database.auth, 'SignIn').mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });
        const user = userEvent.setup();

        render(<SignInPage />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const button = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, 'some@email.com');
        await user.type(input_password, 'some');
        await user.click(button);

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

    it('render loading is submit response on process', () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });

        jest.spyOn(database.auth, 'SignIn').mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });
        const user = userEvent.setup();

        render(<SignInPage />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/password/i);
        const button = screen.getByRole('button', { name: /submit/i });

        user.type(input_email, 'some@email.com');
        user.type(input_password, 'some');
        user.click(button).then(() => {
            screen.getByRole('status');
        });
    });
});
