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

    test('Loading Initialization', async () => {
        const { result } = renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(result.current).toEqual({
                isLoading: true,
                session: null,
                error: null,
                supabaseClient: supabaseClient,
            });
        });
    });

    test('Success Initialization', async () => {
        const getSession = jest.spyOn(supabaseClient.auth, 'getSession');
        getSession.mockResolvedValue({
            data: { session: {} as any },
            error: null,
        });

        const { result } = renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
            expect(result.current.session).toEqual({});
            expect(result.current.error).toBeNull();
        });

        expect(supabaseClient.auth.getSession).toBeCalledTimes(1);
    });

    test('Error Initialization', async () => {
        const getSession = jest.spyOn(supabaseClient.auth, 'getSession');
        getSession.mockResolvedValue({
            data: { session: null },
            error: {} as any,
        });

        const { result } = renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
            expect(result.current.session).toBeNull();
            expect(result.current.error).toEqual({});
        });

        expect(supabaseClient.auth.getSession).toBeCalledTimes(1);
    });

    test('On Session Change', async () => {
        const getSession = jest.spyOn(supabaseClient.auth, 'getSession');
        getSession.mockResolvedValue({
            data: { session: {} as any },
            error: null,
        });

        const unsubscribe = jest.fn();
        const onAuthStateChange = jest.spyOn(
            supabaseClient.auth,
            'onAuthStateChange'
        );
        onAuthStateChange.mockImplementation((callback) => {
            return {
                data: {
                    subscription: {
                        id: '',
                        callback: callback,
                        unsubscribe: unsubscribe,
                    },
                },
            };
        });

        renderHook(useSessionContext, {
            wrapper: wrapper,
        });

        await waitFor(() => {
            expect(onAuthStateChange).toBeCalledTimes(1);
        });
    });
});
