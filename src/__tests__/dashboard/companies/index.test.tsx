import { cleanup, render, screen, waitFor } from '@testing-library/react';
import CompaniesPage from '@/pages/dashboard/companies';
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

jest.mock('material-ripple-effects', () => ({
    __esModule: true,
    default: () => ({
        create() {},
    }),
}));

describe('Dashboard Units Page', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('redirect to dashboard if user does not have read company permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'list').mockResolvedValue({} as any);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: {},
        });

        render(<CompaniesPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(1);
            expect(routerPush).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('stays in page if user has read company permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'list').mockResolvedValue({} as any);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { read_company: true },
        });

        render(<CompaniesPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(0);
        });
    });

    it('render table header if user has read company permission', async () => {
        const headers = ['Name', 'Branch', 'City', 'Province'];

        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'list').mockResolvedValue({} as any);
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { read_company: true },
        });

        render(<CompaniesPage />);

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
                name: 'name',
                branch: 'branch',
                city: 'city',
                province: 'province',
            },
        ];

        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        const database = new Database({} as any);
        const companylist = jest
            .spyOn(database.company, 'list')
            .mockResolvedValue({
                data: items,
                ...({} as any),
            });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { read_company: true },
        });

        render(<CompaniesPage />);

        await waitFor(() => {
            expect(companylist).toBeCalledTimes(1);

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
