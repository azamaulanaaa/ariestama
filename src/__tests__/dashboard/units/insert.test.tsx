import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InsertUnitPage from '@/pages/dashboard/units/insert';
import Database from '@/libs/Database';
import Config from '@/config';

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

describe('Dashboard Insert Unit Page', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('redirect to dashboard if user does not have insert unit permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        useSessionContext.mockReturnValue({
            userPermission: {},
        });

        render(<InsertUnitPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(1);
            expect(routerPush).toBeCalledWith(Config.Url.Dashboard);
        });
    });

    it('stays in page if user has insert unit permission', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            isReady: true,
            push: routerPush,
        });

        useSessionContext.mockReturnValue({
            userPermission: { iud_unit: true },
        });

        render(<InsertUnitPage />);

        await waitFor(() => {
            expect(routerPush).toBeCalledTimes(0);
        });
    });

    it('render insert unit form', () => {
        useRouter.mockReturnValue({ isReady: true });

        useSessionContext.mockReturnValue({
            userPermission: { iud_unit: true },
        });

        render(<InsertUnitPage />);

        const form = screen.queryByRole('form');
        const button = screen.queryByRole('button');
        const input_serial_number = screen.queryByLabelText(/serial number/i);
        const input_brand = screen.queryByLabelText(/brand/i);
        const input_oem = screen.queryByLabelText(
            /original equipment manufacture/i
        );
        const input_yom = screen.queryByLabelText(/year of manufacture/i);
        const input_made_in = screen.queryByLabelText(/made in/i);

        expect(form).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(input_serial_number).toBeInTheDocument();
        expect(input_brand).toBeInTheDocument();
        expect(input_oem).toBeInTheDocument();
        expect(input_yom).toBeInTheDocument();
        expect(input_made_in).toBeInTheDocument();
    });

    it('call onSubmit function when button pressed', async () => {
        const testdata = {
            data: {
                serial_number: 'serial_number',
                brand: 'brand',
                oem: 'oem',
                yom: 2000,
                made_in: 'made_in',
            },
        };

        const user = userEvent.setup();

        useRouter.mockReturnValue({ isReady: true, push: jest.fn() });

        const database = new Database({} as any);
        const insertUnit = jest
            .spyOn(database.unit, 'insert')
            .mockResolvedValue({
                error: null,
                ...({} as any),
            });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { iud_unit: true },
        });

        render(<InsertUnitPage />);

        const button = screen.getByRole('button');
        const input_serial_number = screen.getByLabelText(/serial number/i);
        const input_brand = screen.getByLabelText(/brand/i);
        const input_oem = screen.getByLabelText(
            /original equipment manufacture/i
        );
        const input_yom = screen.getByLabelText(/year of manufacture/i);
        const input_made_in = screen.getByLabelText(/made in/i);

        await user.type(input_serial_number, testdata.data.serial_number);
        await user.type(input_brand, testdata.data.brand);
        await user.type(input_oem, testdata.data.oem);
        await user.type(input_yom, String(testdata.data.yom));
        await user.type(input_made_in, testdata.data.made_in);
        await user.click(button);

        expect(insertUnit).toBeCalledTimes(1);
        expect(insertUnit).toBeCalledWith({
            serial_number: testdata.data.serial_number,
            brand: testdata.data.brand,
            oem: testdata.data.oem,
            yom: testdata.data.yom,
            made_in: testdata.data.made_in,
        });
    });

    it('it call success alert then redirect for success insert', async () => {
        const testdata = {
            data: {
                serial_number: 'serial_number',
                brand: 'brand',
                oem: 'oem',
                yom: 2000,
                made_in: 'made_in',
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
        jest.spyOn(database.unit, 'insert').mockResolvedValue({
            error: null,
            ...({} as any),
        });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { iud_unit: true },
        });

        render(<InsertUnitPage />);

        const button = screen.getByRole('button');
        const input_serial_number = screen.getByLabelText(/serial number/i);
        const input_brand = screen.getByLabelText(/brand/i);
        const input_oem = screen.getByLabelText(
            /original equipment manufacture/i
        );
        const input_yom = screen.getByLabelText(/year of manufacture/i);
        const input_made_in = screen.getByLabelText(/made in/i);

        await user.type(input_serial_number, testdata.data.serial_number);
        await user.type(input_brand, testdata.data.brand);
        await user.type(input_oem, testdata.data.oem);
        await user.type(input_yom, String(testdata.data.yom));
        await user.type(input_made_in, testdata.data.made_in);
        await user.click(button);

        expect(layoutDashboard.useAlertsSystem).toBeCalledTimes(1);
        expect(routerPush).toBeCalledTimes(1);
    });

    it('it call error alert for error insert', async () => {
        const testdata = {
            data: {
                serial_number: 'serial_number',
                brand: 'brand',
                oem: 'oem',
                yom: 2000,
                made_in: 'made_in',
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
        jest.spyOn(database.unit, 'insert').mockResolvedValue({
            error: {} as any,
            ...({} as any),
        });
        useSessionContext.mockReturnValue({
            database: database,
            userPermission: { iud_unit: true },
        });

        render(<InsertUnitPage />);

        const button = screen.getByRole('button');
        const input_serial_number = screen.getByLabelText(/serial number/i);
        const input_brand = screen.getByLabelText(/brand/i);
        const input_oem = screen.getByLabelText(
            /original equipment manufacture/i
        );
        const input_yom = screen.getByLabelText(/year of manufacture/i);
        const input_made_in = screen.getByLabelText(/made in/i);

        await user.type(input_serial_number, testdata.data.serial_number);
        await user.type(input_brand, testdata.data.brand);
        await user.type(input_oem, testdata.data.oem);
        await user.type(input_yom, String(testdata.data.yom));
        await user.type(input_made_in, testdata.data.made_in);
        await user.click(button);

        expect(layoutDashboard.useAlertsSystem).toBeCalledTimes(1);
        expect(routerPush).toBeCalledTimes(0);
    });
});
