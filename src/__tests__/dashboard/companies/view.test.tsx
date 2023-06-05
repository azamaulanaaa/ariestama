import { cleanup, render, screen, waitFor } from '@testing-library/react';

import ViewPage from '@/pages/dashboard/companies/view';
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

const layoutDashboard = {
    useAlertsSystem: jest.fn(),
};
jest.mock('@/components/Layout', () => ({
    __esModule: true,
    default: () => ({
        dashboard: () => layoutDashboard,
    }),
}));

describe('Dashboard View Companies Page', () => {
    afterEach(() => {
        cleanup();
    });

    it('let user stay on the page if user have permission', async () => {
        const testdata = {
            routerQuery: { id: 'some' },
            userPermission: {
                company_read: true,
            },
            companyData: {
                id: 'id',
                name: 'name',
                branch: 'branch',
                address: 'address',
                sub_district: 'sub_district',
                city: 'city',
                province: 'province',
                zip_code: 1000,
                user_id: 'user_id',
            },
        };

        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
            query: testdata.routerQuery,
        });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'getsById').mockResolvedValue({
            error: null,
            data: [testdata.companyData],
            count: 1,
        });

        useSessionContext.mockReturnValue({
            database: database,
            user: {
                permission: testdata.userPermission,
            },
        });

        render(<ViewPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(0);
        });
    });

    it('redirect user if user does not have permission', async () => {
        const testdata = {
            userPermission: {},
        };
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        useSessionContext.mockReturnValue({
            user: {
                permission: testdata.userPermission,
            },
        });

        render(<ViewPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(1);
        });
    });

    it('render company data', async () => {
        const testdata = {
            routerQuery: { id: 'some' },
            userPermission: {
                company_read: true,
            },
            companyData: {
                id: 'id',
                name: 'name',
                branch: 'branch',
                address: 'address',
                sub_district: 'sub_district',
                city: 'city',
                province: 'province',
                zip_code: 1000,
                user_id: 'user_id',
            },
        };
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
            query: testdata.routerQuery,
        });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'getsById').mockResolvedValue({
            error: null,
            data: [testdata.companyData],
            count: 1,
        });

        useSessionContext.mockReturnValue({
            database: database,
            user: {
                permission: testdata.userPermission,
            },
        });

        render(<ViewPage />);
        const name = screen.getByTestId('company-name');
        const branch = screen.getByTestId('company-branch');
        const address = screen.getByTestId('address');

        await waitFor(() => {
            expect(name).toHaveTextContent(testdata.companyData.name);
            expect(branch).toHaveTextContent(testdata.companyData.branch);
            expect(address).toBeInTheDocument();
        });
    });

    it('send alert on error fetching company data', async () => {
        const testdata = {
            routerQuery: { id: 'some' },
            userPermission: {
                company_read: true,
            },
            error: {
                code: 'code',
                text: 'some',
            },
        };
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
            query: testdata.routerQuery,
        });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'getsById').mockResolvedValue({
            error: testdata.error,
            data: [],
            count: 0,
        });

        useSessionContext.mockReturnValue({
            database: database,
            user: {
                permission: testdata.userPermission,
            },
        });

        render(<ViewPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(0);
        });
    });
});
