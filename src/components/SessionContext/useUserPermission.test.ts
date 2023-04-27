import { renderHook, waitFor } from '@testing-library/react';

import useUserPermission from './useUserPermssion';
import Database from '@/libs/Database';

describe('useUserPermission of SessionContext Component', () => {
    it('return null if on process', async () => {
        const database = new Database({} as any);
        jest.spyOn(database.user_permission, 'mine').mockResolvedValue(null);

        const { result } = renderHook(() => useUserPermission(database));
        await waitFor(() => {
            expect(result.current).toBeNull();
        });
    });

    it('call database function exactly once', async () => {
        const database = new Database({} as any);
        const mine = jest
            .spyOn(database.user_permission, 'mine')
            .mockResolvedValue(null);

        renderHook(() => useUserPermission(database));

        await waitFor(() => {
            expect(mine).toBeCalledTimes(1);
        });
    });

    it('return signin false for not found for no session data', async () => {
        const database = new Database({} as any);
        jest.spyOn(database.user_permission, 'mine').mockResolvedValue(null);

        const { result } = renderHook(() => useUserPermission(database));

        await waitFor(() => {
            expect(result.current).not.toBeNull();
            expect(result.current?.signin).toEqual(false);
        });
    });

    it('return signin true for found permission', async () => {
        const database = new Database({} as any);
        jest.spyOn(database.user_permission, 'mine').mockResolvedValue(
            {} as any
        );

        const { result } = renderHook(() => useUserPermission(database));

        await waitFor(() => {
            expect(result.current).not.toBeNull();
            expect(result.current?.signin).toEqual(true);
        });
    });

    it('if signin false then everything else is false', async () => {
        const database = new Database({} as any);
        jest.spyOn(database.user_permission, 'mine').mockResolvedValue(null);

        const { result } = renderHook(() => useUserPermission(database));

        await waitFor(() => {
            expect(result.current).not.toBeNull();
            if (result.current != null)
                Object.values(result.current).forEach((value) => {
                    expect(value).toBeFalsy();
                });
        });
    });
});
