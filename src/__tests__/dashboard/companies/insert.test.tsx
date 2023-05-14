import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Database from '@/libs/Database';
import Config from '@/config';
import InsertCompanyPage from '@/pages/dashboard/companies/insert';

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

describe('Dashboard Insert Company Page', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('redirect to dashboard if user does not have insert company permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        useSessionContext.mockReturnValue({
            userPermission: {},
        });

        render(<InsertCompanyPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(1);
            expect(routerPush).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('stays in page if user has insert company permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        useSessionContext.mockReturnValue({
            userPermission: { iud_company: true },
        });

        render(<InsertCompanyPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(0);
        });
    });

    it('render insert company form', () => {
        useRouter.mockReturnValue({ isReady: true });

        useSessionContext.mockReturnValue({
            userPermission: { iud_company: true },
        });

        render(<InsertCompanyPage />);

        const form = screen.queryByRole('form');
        const button = screen.queryByRole('button');
        const input_name = screen.queryByLabelText(/name/i);
        const input_branch = screen.queryByLabelText(/branch/i);
        const input_address = screen.queryByLabelText(/address/i);
        const input_sub_district = screen.queryByLabelText(/sub-district/i);
        const input_city = screen.queryByLabelText(/city/i);
        const input_province = screen.queryByLabelText(/province/i);
        const input_zip_code = screen.queryByLabelText(/zip code/i);

        expect(form).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(input_name).toBeInTheDocument();
        expect(input_branch).toBeInTheDocument();
        expect(input_address).toBeInTheDocument();
        expect(input_sub_district).toBeInTheDocument();
        expect(input_city).toBeInTheDocument();
        expect(input_province).toBeInTheDocument();
        expect(input_zip_code).toBeInTheDocument();
    });

    it('call onSubmit function when button pressed', async () => {
        const testdata = {
            data: {
                name: 'NAME',
                branch: 'branch',
                address: 'addresss',
                sub_district: 'sub_district',
                city: 'city',
                province: 'province',
                zip_code: 2000,
            },
        };

        const user = userEvent.setup();

        useRouter.mockReturnValue({ isReady: true, push: jest.fn() });

        const database = new Database({} as any);
        const insertCompany = jest
            .spyOn(database.company, 'insert')
            .mockResolvedValue({
                error: null,
                ...({} as any),
            });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { iud_company: true },
        });

        render(<InsertCompanyPage />);

        const button = screen.getByRole('button');
        const input_name = screen.getByLabelText(/name/i);
        const input_branch = screen.getByLabelText(/branch/i);
        const input_address = screen.getByLabelText(/address/i);
        const input_sub_district = screen.getByLabelText(/sub-district/i);
        const input_city = screen.getByLabelText(/city/i);
        const input_province = screen.getByLabelText(/province/i);
        const input_zip_code = screen.getByLabelText(/zip code/i);

        await user.type(input_name, testdata.data.name);
        await user.type(input_branch, testdata.data.branch);
        await user.type(input_address, testdata.data.address);
        await user.type(input_sub_district, testdata.data.sub_district);
        await user.type(input_city, testdata.data.city);
        await user.type(input_province, testdata.data.province);
        await user.type(input_zip_code, String(testdata.data.zip_code));
        await user.click(button);

        expect(insertCompany).toBeCalledTimes(1);
        expect(insertCompany).toBeCalledWith({
            name: testdata.data.name,
            branch: testdata.data.branch,
            address: testdata.data.address,
            sub_district: testdata.data.sub_district,
            city: testdata.data.city,
            province: testdata.data.province,
            zip_code: testdata.data.zip_code,
        });
    });

    it('it call success alert then redirect for success insert', async () => {
        const testdata = {
            data: {
                name: 'NAME',
                branch: 'branch',
                address: 'addresss',
                sub_district: 'sub_district',
                city: 'city',
                province: 'province',
                zip_code: 2000,
            },
        };

        const user = userEvent.setup();

        layoutDashboard.useAlertsSystem.mockImplementationOnce((action) => {
            expect(action.kind).toEqual('add');
            expect(action.type).toEqual('success');
        });

        const routerPush = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push: routerPush });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'insert').mockResolvedValue({
            error: null,
            ...({} as any),
        });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { iud_company: true },
        });

        render(<InsertCompanyPage />);

        const button = screen.getByRole('button');
        const input_name = screen.getByLabelText(/name/i);
        const input_branch = screen.getByLabelText(/branch/i);
        const input_address = screen.getByLabelText(/address/i);
        const input_sub_district = screen.getByLabelText(/sub-district/i);
        const input_city = screen.getByLabelText(/city/i);
        const input_province = screen.getByLabelText(/province/i);
        const input_zip_code = screen.getByLabelText(/zip code/i);

        await user.type(input_name, testdata.data.name);
        await user.type(input_branch, testdata.data.branch);
        await user.type(input_address, testdata.data.address);
        await user.type(input_sub_district, testdata.data.sub_district);
        await user.type(input_city, testdata.data.city);
        await user.type(input_province, testdata.data.province);
        await user.type(input_zip_code, String(testdata.data.zip_code));
        await user.click(button);

        expect(layoutDashboard.useAlertsSystem).toBeCalledTimes(1);
        expect(routerPush).toBeCalledTimes(1);
    });

    it('it call error alert for error insert', async () => {
        const testdata = {
            data: {
                name: 'NAME',
                branch: 'branch',
                address: 'addresss',
                sub_district: 'sub_district',
                city: 'city',
                province: 'province',
                zip_code: 2000,
            },
        };

        const user = userEvent.setup();

        layoutDashboard.useAlertsSystem.mockImplementationOnce((action) => {
            expect(action.kind).toEqual('add');
            expect(action.type).toEqual('error');
        });

        const routerPush = jest.fn();
        useRouter.mockReturnValue({ isReady: true, push: routerPush });

        const database = new Database({} as any);
        jest.spyOn(database.company, 'insert').mockResolvedValue({
            error: {} as any,
            ...({} as any),
        });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { iud_company: true },
        });

        render(<InsertCompanyPage />);

        const button = screen.getByRole('button');
        const input_name = screen.getByLabelText(/name/i);
        const input_branch = screen.getByLabelText(/branch/i);
        const input_address = screen.getByLabelText(/address/i);
        const input_sub_district = screen.getByLabelText(/sub-district/i);
        const input_city = screen.getByLabelText(/city/i);
        const input_province = screen.getByLabelText(/province/i);
        const input_zip_code = screen.getByLabelText(/zip code/i);

        await user.type(input_name, testdata.data.name);
        await user.type(input_branch, testdata.data.branch);
        await user.type(input_address, testdata.data.address);
        await user.type(input_sub_district, testdata.data.sub_district);
        await user.type(input_city, testdata.data.city);
        await user.type(input_province, testdata.data.province);
        await user.type(input_zip_code, String(testdata.data.zip_code));
        await user.click(button);

        expect(layoutDashboard.useAlertsSystem).toBeCalledTimes(1);
        expect(routerPush).toBeCalledTimes(0);
    });
});
