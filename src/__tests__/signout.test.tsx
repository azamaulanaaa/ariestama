import { cleanup, render, screen, waitFor } from '@testing-library/react';

import SignOutPage from '@/pages/signout';
import Database from '@/libs/Database';
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

describe('SignOut Page', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('show loading animation while on process', async () => {
        useRouter.mockReturnValue({ isReady: true, push: jest.fn() });

        const database = new Database({} as any);
        const SignOut = jest
            .spyOn(database.auth, 'SignOut')
            .mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: null,
        });

        render(<SignOutPage />);
        await waitFor(() => {
            expect(SignOut).toBeCalledTimes(1);
            screen.getByRole('status');
        });
    });

    it('call signout function then redirect', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });

        const database = new Database({} as any);
        jest.spyOn(database.auth, 'SignOut').mockResolvedValue(null);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: null,
        });

        render(<SignOutPage />);

        await waitFor(() => {
            expect(database.auth.SignOut).toBeCalledTimes(1);
            expect(push).toBeCalledTimes(1);
            expect(push).toBeCalledWith(Config.Url.SignIn);
        });
    });
});
