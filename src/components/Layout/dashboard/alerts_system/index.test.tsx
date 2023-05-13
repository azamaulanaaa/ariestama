import {
    act,
    cleanup,
    renderHook,
    screen,
    waitFor,
} from '@testing-library/react';
import { AlertsSystemProvider, useAlertsSystem } from '.';

describe('Alert System of Dashboard Layout', () => {
    afterEach(cleanup);

    it('render no alerts at start', () => {
        renderHook(() => {}, {
            wrapper: AlertsSystemProvider,
        });

        const alerts = screen.queryAllByRole('alert');
        expect(alerts).toHaveLength(0);
    });

    it('render an alert after add an alert', () => {
        const testdata = {
            alertData: {
                id: 'id',
                type: 'success',
                message: 'success',
            },
        };

        const { result } = renderHook(() => useAlertsSystem(), {
            wrapper: AlertsSystemProvider,
        });

        act(() => {
            result.current({
                kind: 'add',
                ...testdata.alertData,
            } as any);
        });

        const alerts = screen.queryAllByRole('alert');

        expect(alerts).toHaveLength(1);
        expect(alerts[0]).toBeInTheDocument();
        expect(alerts[0]).toHaveTextContent(testdata.alertData.message);
    });

    it('add an alert then remove an alert', async () => {
        const testdata = {
            alertData: {
                id: 'id',
                type: 'error',
                message: 'error',
            },
        };

        const { result } = renderHook(() => useAlertsSystem(), {
            wrapper: AlertsSystemProvider,
        });

        act(() => {
            result.current({
                kind: 'add',
                ...testdata.alertData,
            } as any);
        });

        const alerts = screen.queryAllByRole('alert');

        expect(alerts).toHaveLength(1);

        act(() => {
            result.current({
                kind: 'remove',
                id: testdata.alertData.id,
            } as any);
        });

        await waitFor(() => {
            expect(alerts[0]).not.toBeInTheDocument();
        });
    });
});
