import { cleanup, render, screen, waitFor } from '@testing-library/react';
import UnitsPage from '@/pages/dashboard/units';
import Config from '@/config';
import Database from '@/libs/Database';

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

describe('Dashboard Units Page', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('redirect to dashboard if user does not have read unit permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        jest.spyOn(database.unit, 'list').mockResolvedValue({} as any);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });

        render(<UnitsPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(1);
            expect(routerPush).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('stays in page if user has read unit permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        jest.spyOn(database.unit, 'list').mockResolvedValue({} as any);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { read_unit: true },
        });

        render(<UnitsPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(0);
        });
    });

    it('render table header if user has read unit permission', async () => {
        const headers = [
            'Nomor Seri',
            'Merek',
            'OEM',
            'Tahun Dibuat',
            'Negara Pembuat',
        ];

        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        jest.spyOn(database.unit, 'list').mockResolvedValue({} as any);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { read_unit: true },
        });

        render(<UnitsPage />);

        await waitFor(() => {
            const colheaders = screen.getAllByRole('columnheader');
            headers.forEach((header, index) => {
                expect(colheaders[index]).toHaveTextContent(header);
            });
        });
    });

    it('render table data for user has read unit permission', async () => {
        const items = [
            {
                serial_number: '000',
                brand: 'brand',
                oem: 'oem',
                yom: 2011,
                made_in: 'idn',
            },
        ];

        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        const unitList = jest.spyOn(database.unit, 'list').mockResolvedValue({
            data: items,
            ...({} as any),
        });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { read_unit: true },
        });

        render(<UnitsPage />);

        await waitFor(() => {
            expect(unitList).toBeCalledTimes(1);

            const rows = screen.getAllByRole('row');
            expect(rows).toHaveLength(items.length + 1);
            items.forEach((item, index) => {
                Object.values(item).forEach((value) => {
                    expect(rows[index + 1]).toHaveTextContent(String(value));
                });
            });
        });
    });
});
