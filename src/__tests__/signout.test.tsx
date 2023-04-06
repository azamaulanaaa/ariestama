import SignOut from '@/pages/signout';
import { w } from '@supabase/auth-helpers-nextjs/dist/withMiddlewareAuth-06637ed5';
import { createClient } from '@supabase/supabase-js';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

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

describe('SignOut Page', () => {
    const supabaseClient = createClient(
        'https://localhost:8080',
        'some.fake.key'
    );
    it('show loading animation while on process', () => {
        useRouter.mockReturnValue({ isReady: true, push: jest.fn() });
        useSessionContext.mockReturnValue({ isReady: true, supabaseClient });

        render(<SignOut />);
        screen.getByRole('status');
    });

    it('call signout function then redirect', async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push });
        useSessionContext.mockReturnValue({ isReady: true, supabaseClient });
        const signOut = jest.spyOn(supabaseClient.auth, 'signOut');

        render(<SignOut />);

        await waitFor(() => {
            expect(signOut).toBeCalledTimes(1);
            expect(push).toBeCalledTimes(1);
        });
    });
});
