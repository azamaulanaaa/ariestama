import { cleanup, waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditPage from '@/pages/dashboard/companies/edit';
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

const layoutDashboard = {
    useAlertsSystem: jest.fn(),
};
jest.mock('@/components/Layout', () => ({
    __esModule: true,
    default: () => ({
        dashboard: () => layoutDashboard,
    }),
}));

describe('Dashboard Edit Company Page', () => {
    afterEach(() => {
        cleanup();
        jest.resetAllMocks();
    });

    it('redirect if user does not have company_read permission', async () => {
        const testdata = {
            routerQuery: { id: 'id' },
            userPermission: {
                company_update: true,
            },
            companyData: {
                id: 'id',
                name: 'NAME',
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

        render(<EditPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(1);
        });
    });

    it('redirect if user does not have company_update permission', async () => {
        const testdata = {
            routerQuery: { id: 'id' },
            userPermission: {
                company_read: true,
            },
            companyData: {
                id: 'id',
                name: 'NAME',
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

        render(<EditPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(1);
        });
    });

    it('stay on page if user have company_read and company_update permission', async () => {
        const testdata = {
            routerQuery: { id: 'id' },
            userPermission: {
                company_read: true,
                company_update: true,
            },
            companyData: {
                id: 'id',
                name: 'NAME',
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

        render(<EditPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(0);
        });
    });

    it('render company data', async () => {
        const testdata = {
            routerQuery: { id: 'id' },
            userPermission: {
                company_read: true,
            },
            companyData: {
                id: 'id',
                name: 'NAME',
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

        render(<EditPage />);
        const input_name = screen.getByLabelText(/name/i);
        const input_branch = screen.getByLabelText(/branch/i);
        const input_address = screen.getByLabelText(/address/i);
        const input_subdistrict = screen.getByLabelText(/sub-district/i);
        const input_city = screen.getByLabelText(/city/i);
        const input_province = screen.getByLabelText(/province/i);
        const input_zipcode = screen.getByLabelText(/zip code/i);

        await waitFor(() => {
            expect(input_name).toHaveValue(testdata.companyData.name);
            expect(input_branch).toHaveValue(testdata.companyData.branch);
            expect(input_address).toHaveValue(testdata.companyData.address);
            expect(input_subdistrict).toHaveValue(
                testdata.companyData.sub_district
            );
            expect(input_city).toHaveValue(testdata.companyData.city);
            expect(input_province).toHaveValue(testdata.companyData.province);
            expect(input_zipcode).toHaveValue(testdata.companyData.zip_code);
        });
    });

    it('call onSubmit function when button pressed', async () => {
        const testdata = {
            routerQuery: { id: 'id' },
            user: {
                id: 'id',
                permission: {
                    company_read: true,
                },
            },
            companyData: {
                id: 'id',
                name: 'NAME',
                branch: 'branch',
                address: 'address',
                sub_district: 'sub_district',
                city: 'city',
                province: 'province',
                zip_code: 1000,
                user_id: 'user_id',
            },
            newName: 'NEWNAME',
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
        const updateCompany = jest
            .spyOn(database.company, 'update')
            .mockResolvedValue({
                error: null,
                ...({} as any),
            });

        useSessionContext.mockReturnValue({
            database: database,
            user: testdata.user,
        });

        const user = userEvent.setup();

        render(<EditPage />);

        const button = screen.getByRole('button');
        const input_name = screen.getByLabelText(/name/i);

        await user.click(input_name);
        await user.keyboard('{Control>}[KeyA]{/Control}{Backspace}');
        await user.type(input_name, testdata.newName);

        await user.click(button);

        expect(updateCompany).toBeCalledTimes(1);
        expect(updateCompany).toBeCalledWith(testdata.companyData.id, {
            name: testdata.newName,
            branch: testdata.companyData.branch,
            address: testdata.companyData.address,
            sub_district: testdata.companyData.sub_district,
            city: testdata.companyData.city,
            province: testdata.companyData.province,
            zip_code: testdata.companyData.zip_code,
            user_id: testdata.user.id,
        });
    });
});
