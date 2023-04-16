import { cleanup, render, screen, waitFor } from '@testing-library/react';

import SignOutPage from '@/pages/signout';
import Database from '@/libs/Database';

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

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});

describe('SignOut Page', () => {
    it('show loading animation while on process', async () => {
        useRouter.mockReturnValue({ isReady: true, push: jest.fn() });
        const SignOut = jest
            .spyOn(session.auth, 'SignOut')
            .mockResolvedValue(null);

        render(<SignOutPage />);
        await waitFor(() => {
            expect(SignOut).toBeCalledTimes(1);
            screen.getByRole('status');
        });
    });

    it('call signout function then redirect', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        jest.spyOn(session.auth, 'SignOut').mockResolvedValue(null);

        render(<SignOutPage />);

        await waitFor(() => {
            expect(session.auth.SignOut).toBeCalledTimes(1);
            expect(push).toBeCalledTimes(1);
        });
    });
});
