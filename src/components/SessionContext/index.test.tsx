import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

import { SessionContextProvider, useSessionContext } from '.';
import Database from '@/libs/Database';

describe('SessionContext Component', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    const supabaseClient = createClient(
        'http://localhost:8080',
        'some.fake.key'
    );
    const database = new Database(supabaseClient);
    const wrapper = ({ children }: { children: ReactNode }) => (
        <SessionContextProvider database={database}>
            {children}
        </SessionContextProvider>
    );

    it('useSessionContext must return database', () => {
        const { result } = renderHook(useSessionContext, { wrapper });

        expect(result.current.database).toEqual(database);
    });

    it('verify User Permission exactly once with null return', async () => {
        const userPermissionMine = jest
            .spyOn(database.user_permission, 'mine')
            .mockResolvedValue(null);

        const { result } = renderHook(useSessionContext, { wrapper });

        await waitFor(() => {
            expect(userPermissionMine).toBeCalledTimes(1);
            expect(result.current.userPermission).toBeNull();
        });
    });
});
