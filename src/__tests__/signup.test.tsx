import SignUp from '@/pages/signup';
import { AuthError, createClient } from '@supabase/supabase-js';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('SignUp Page', () => {
    const user = userEvent.setup();
    const supabaseClient = createClient(
        'http://localhost:8080',
        'some.fake.key'
    );
    afterEach(() => {
        jest.resetAllMocks();
        cleanup;
    });

    it('render signup form when all ready', () => {
        useRouter.mockReturnValue({
            isReady: true,
        });
        useSessionContext.mockReturnValue({
            isReady: true,
        });
        render(<SignUp />);

        screen.getByRole('form');
        screen.getByLabelText(/email/i);
        screen.getByLabelText(/^password/i);
        screen.getByLabelText(/confirm password/i);
        screen.getByRole('button');
    });

    it('redirect for signed user', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        useSessionContext.mockReturnValue({
            isReady: true,
            session: {} as any,
            error: null,
        });

        render(<SignUp />);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
        });
    });

    it('render loading animation if router is not ready', async () => {
        useRouter.mockReturnValue({ isReady: false });
        useSessionContext.mockReturnValueOnce({ isReady: true, session: null });

        render(<SignUp />);
        screen.getByRole('status');
    });

    it('render loading animation if session is not ready', async () => {
        useRouter.mockReturnValue({ isReady: true });
        useSessionContext.mockReturnValueOnce({
            isReady: false,
            session: null,
        });

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
        useSessionContext.mockReturnValue({
            isReady: true,
            session: null,
            supabaseClient: supabaseClient,
        });
        const signUpFn = jest.spyOn(supabaseClient.auth, 'signUp');
        signUpFn.mockResolvedValue({
            data: {} as any,
            error: new AuthError(data.alert),
        });

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
        useSessionContext.mockReturnValue({
            isReady: true,
            session: null,
            supabaseClient: supabaseClient,
        });
        const signUpFn = jest.spyOn(supabaseClient.auth, 'signUp');
        signUpFn.mockResolvedValue({
            data: {} as any,
            error: null,
        });

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
        useSessionContext.mockReturnValue({
            isReady: true,
            session: null,
            supabaseClient: supabaseClient,
        });
        const signUpFn = jest.spyOn(supabaseClient.auth, 'signUp');
        signUpFn.mockResolvedValue({
            data: {} as any,
            error: null,
        });

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
