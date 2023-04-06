import { renderHook, waitFor } from '@testing-library/react';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider, useSessionContext } from '.';
import { ReactNode } from 'react';

afterEach(() => {
    jest.resetAllMocks();
});

describe('Session Component', () => {
    const supabaseClient = createClient(
        'http://localhost:3000',
        'some.fake.key'
    );

    const wrapper = ({ children }: { children: ReactNode }) => (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );

    it('initialize properly', async () => {
        const { result } = renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(result.current).toEqual({
                isReady: false,
                session: null,
                error: null,
                supabaseClient: supabaseClient,
            });
        });
    });

    it('ready with given session', async () => {
        const getSession = jest.spyOn(supabaseClient.auth, 'getSession');
        getSession.mockResolvedValue({
            data: { session: {} as any },
            error: null,
        });

        const { result } = renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(result.current.isReady).toBeTruthy();
            expect(result.current.session).toEqual({});
            expect(result.current.error).toBeNull();
        });

        expect(supabaseClient.auth.getSession).toBeCalledTimes(1);
    });

    it('ready with given error', async () => {
        const getSession = jest.spyOn(supabaseClient.auth, 'getSession');
        getSession.mockResolvedValue({
            data: { session: null },
            error: {} as any,
        });

        const { result } = renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(result.current.isReady).toBeTruthy();
            expect(result.current.session).toBeNull();
            expect(result.current.error).toEqual({});
        });

        expect(supabaseClient.auth.getSession).toBeCalledTimes(1);
    });

    it('has no session when signout', async () => {
        const getSession = jest.spyOn(supabaseClient.auth, 'getSession');
        getSession.mockResolvedValue({
            data: { session: {} as any },
            error: null,
        });

        const { result } = renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(result.current.session).not.toBeNull();
        });

        result.current.supabaseClient.auth.signOut();

        await waitFor(() => {
            expect(result.current.session).toBeNull();
        });
    });
});
