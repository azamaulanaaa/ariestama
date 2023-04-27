import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthError } from '@supabase/supabase-js';

import Database from '@/libs/Database';
import SignUp from '@/pages/signup';
import Config from '@/config';

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
    afterEach(() => {
        jest.resetAllMocks();
        cleanup;
    });

    const user = userEvent.setup();

    it('render signup form when all ready', async () => {
        useRouter.mockReturnValue({
            isReady: true,
        });
        useSessionContext.mockReturnValue({
            userPermission: {},
        });

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
        useSessionContext.mockReturnValue({
            userPermission: {signin: true},
        });

        render(<SignUp />);

        await waitFor(() => {
            expect(push).toBeCalledTimes(1);
            expect(push).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('render loading animation if router is not ready', async () => {
        useRouter.mockReturnValue({ isReady: false });
        useSessionContext.mockReturnValue({
            userPermission: {},
        });

        render(<SignUp />);
        screen.getByRole('status');
    });

    it('render error alert on fail signup', async () => {
        const email = 'some@example.com';
        const password = 'somesome';
        const alertMessage = 'some';

        useRouter.mockReturnValue({ isReady: true });

        const database = new Database({} as any);
        const signUpFn = jest
            .spyOn(database.auth, 'SignUp')
            .mockResolvedValue(new AuthError(alertMessage));

        useSessionContext.mockReturnValue({
            userPermission: {},
            database: database,
        });

        render(<SignUp />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);
        const btn_submit = screen.getByRole('button');

        await user.type(input_email, email);
        await user.type(input_password, password);
        await user.type(input_confirm_password, password);
        await user.click(btn_submit);

        await waitFor(() => {
            expect(signUpFn).toBeCalledTimes(1);
            expect(signUpFn).toBeCalledWith({
                email: email,
                password: password,
            });
            const alert = screen.getByRole('alert');
            expect(alert).toHaveTextContent(alertMessage);
        });
    });

    it('render success alert on success signup', async () => {
        const email = 'some@example.com';
        const password = 'somesome';

        useRouter.mockReturnValue({ isReady: true });

        const database = new Database({} as any);
        const signUpFn = jest
            .spyOn(database.auth, 'SignUp')
            .mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            userPermission: {},
            database: database,
        });

        render(<SignUp />);

        const input_email = screen.getByLabelText(/email/i);
        const input_password = screen.getByLabelText(/^password/i);
        const input_confirm_password =
            screen.getByLabelText(/confirm password/i);
        const btn_submit = screen.getByRole('button');

        await user.type(input_email, email);
        await user.type(input_password, password);
        await user.type(input_confirm_password, password);
        await user.click(btn_submit);

        await waitFor(() => {
            expect(signUpFn).toBeCalledTimes(1);
            expect(signUpFn).toBeCalledWith({
                email: email,
                password: password,
            });
            screen.getByRole('alert');
        });
    });

    it('render loading animation while process sending signup data to server', async () => {
        useRouter.mockReturnValue({ isReady: true });

        const database = new Database({} as any);
        jest.spyOn(database.auth, 'SignUp').mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            userPermssion: {},
            database: database,
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
