import { AuthError, createClient } from '@supabase/supabase-js';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignIn from '@/pages/signin';

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

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});

describe('SignIn Page', () => {
    const user = userEvent.setup();
    const supabaseClient = createClient(
        'http://localhost:8080',
        'some.fake.key'
    );

    it('render SignIn form when all ready', () => {
        useRouter.mockReturnValue({ isReady: true });
        useSessionContext.mockReturnValueOnce({ isReady: true, session: null });

        render(<SignIn />);
        screen.getByRole('form');
    });

    it('render loading animation if router is not ready', async () => {
        useRouter.mockReturnValue({ isReady: false });
        useSessionContext.mockReturnValueOnce({ isReady: true, session: null });

        render(<SignIn />);
        screen.getByRole('status');
    });

    it('render loading animation if session is not ready', async () => {
        useRouter.mockReturnValue({ isReady: true });
        useSessionContext.mockReturnValueOnce({
            isReady: false,
            session: null,
        });

        render(<SignIn />);
        screen.getByRole('status');
    });

    it('render Alert for incorrect signin', async () => {
        const message = 'some';

        useRouter.mockReturnValue({ isReady: true });
        useSessionContext.mockReturnValue({
            isReady: true,
            session: null,
            supabaseClient,
        });
        const signInWithPassword = jest.spyOn(
            supabaseClient.auth,
            'signInWithPassword'
        );
        signInWithPassword.mockResolvedValue({
            data: {} as any,
            error: new AuthError(message),
        });

        render(<SignIn />);

        const input_email = screen.getByPlaceholderText(/email/i);
        const input_password = screen.getByPlaceholderText(/password/i);
        const btn_submit = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, 'some@email.com');
        await user.type(input_password, 'some');
        await user.click(btn_submit);

        await waitFor(() => {
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(/error/i);
            expect(alert).toHaveTextContent(message);

            expect(input_email).toHaveValue('some@email.com');
            expect(input_password).toHaveValue('some');
        });
    });

    it('redirect for success signin', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        useSessionContext.mockReturnValue({
            isReady: true,
            session: null,
            supabaseClient: supabaseClient,
        });
        const signInWithPassword = jest.spyOn(
            supabaseClient.auth,
            'signInWithPassword'
        );
        signInWithPassword.mockResolvedValue({
            data: {} as any,
            error: null,
        });

        render(<SignIn />);

        const input_email = screen.getByPlaceholderText(/email/i);
        const input_password = screen.getByPlaceholderText(/password/i);
        const btn_submit = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, 'some@email.com');
        await user.type(input_password, 'some');
        await user.click(btn_submit);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
        });
    });

    it('redirect for signed user', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        useSessionContext.mockReturnValue({
            isReady: true,
            session: {} as any,
            error: null,
        });

        render(<SignIn />);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
        });
    });

    it('render loading is submit response on process', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        useSessionContext.mockReturnValue({
            isReady: true,
            session: null,
            supabaseClient: supabaseClient,
        });

        render(<SignIn />);

        const input_email = screen.getByPlaceholderText(/email/i);
        const input_password = screen.getByPlaceholderText(/password/i);
        const btn_submit = screen.getByRole('button', { name: /submit/i });

        await user.type(input_email, 'some@email.com');
        await user.type(input_password, 'some');
        await user.click(btn_submit);

        await waitFor(() => {
            screen.getByRole('status');
        });
    });
});
