import { cleanup, renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { AlertsProvider, useAlerts } from './context';

describe('Alert System Context of Dashboard Layout', () => {
    afterEach(cleanup);

    it('initial with empty alert data', () => {
        const { result } = renderHook(() => useAlerts(), {
            wrapper: AlertsProvider,
        });

        expect(result.current.state).toHaveLength(0);
    });

    it('add alert data', () => {
        const testdata = {
            alertData: {
                id: 'id',
                type: 'sucess',
                message: 'success',
            },
        };

        const { result } = renderHook(() => useAlerts(), {
            wrapper: AlertsProvider,
        });

        act(() => {
            result.current.dispatch({
                kind: 'add',
                ...testdata.alertData,
            } as any);
        });

        expect(result.current.state).toHaveLength(1);
    });

    it('remove alert data', () => {
        const testdata = {
            initialState: [
                {
                    id: 'id',
                    type: 'sucess',
                    message: 'success',
                    open: true,
                },
            ],
        };

        const { result } = renderHook(() => useAlerts(), {
            wrapper: (props: { children: ReactNode }) => (
                <AlertsProvider initialState={testdata.initialState as any}>
                    {props.children}
                </AlertsProvider>
            ),
        });

        expect(result.current.state[0].open).toBeTruthy();

        act(() => {
            result.current.dispatch({
                kind: 'remove',
                id: testdata.initialState[0].id,
            });
        });

        expect(result.current.state[0].open).toBeFalsy();
    });
});
