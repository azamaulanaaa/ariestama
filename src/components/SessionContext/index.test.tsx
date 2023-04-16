import { cleanup, renderHook } from '@testing-library/react';
import Database from '@/libs/Database';
import { SessionContextProvider, useSessionContext } from '.';
import { ReactNode } from 'react';

describe('SessionContext Component', () => {
    afterEach(() => {
        cleanup();
    });

    const database = new Database({} as any);
    const wrapper = ({ children }: { children: ReactNode }) => (
        <SessionContextProvider database={database}>
            {children}
        </SessionContextProvider>
    );

    it('useSessionContext must return database', () => {
        const { result } = renderHook(useSessionContext, { wrapper });

        expect(result.current).toEqual(database);
    });
});
