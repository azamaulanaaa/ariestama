import { cleanup, render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import InsertUnitForm from '.';

jest.mock('material-ripple-effects', () => ({
    __esModule: true,
    default: () => ({
        create() {},
    }),
}));

describe('InsertUnitForm Component', () => {
    afterEach(cleanup);

    it('render a complete form', () => {
        render(<InsertUnitForm />);

        screen.getByRole('form');
        screen.getByRole('button');
        screen.getByLabelText(/serial number/i);
        screen.getByLabelText(/brand/i);
        screen.getByLabelText(/original equipment manufacture/i);
        screen.getByLabelText(/year of manufacture/i);
        screen.getByLabelText(/made in/i);
    });

    it('call onSubmit function if submit button is clicked', async () => {
        const testdata = {
            serial_number: 'serial number',
            brand: 'brand',
            oem: 'oem',
            yom: 2000,
            made_in: 'made_in',
        };
        const handleSubmit = jest.fn();
        const user = UserEvent.setup();

        render(<InsertUnitForm onSubmit={handleSubmit} />);
        const button = screen.getByRole('button');
        const input_serial_number = screen.getByLabelText(/serial number/i);
        const input_brand = screen.getByLabelText(/brand/i);
        const input_oem = screen.getByLabelText(
            /original equipment manufacture/i
        );
        const input_yom = screen.getByLabelText(/year of manufacture/i);
        const input_made_in = screen.getByLabelText(/made in/i);

        await user.type(input_serial_number, testdata.serial_number);
        await user.type(input_brand, testdata.brand);
        await user.type(input_oem, testdata.oem);
        await user.type(input_yom, String(testdata.yom));
        await user.type(input_made_in, testdata.made_in);

        expect(handleSubmit).toBeCalledTimes(0);

        await user.click(button);
        expect(handleSubmit).toBeCalledTimes(1);
        expect(handleSubmit).toBeCalledWith({
            serial_number: testdata.serial_number,
            brand: testdata.brand,
            oem: testdata.oem,
            yom: testdata.yom,
            made_in: testdata.made_in,
        });
    });

    it('input serial number cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_serial_number = screen.getByLabelText(/serial number/i);

        expect(input_serial_number).toBeInvalid();
        await user.type(input_serial_number, 'serial number');
        expect(input_serial_number).toBeValid();
    });

    it('input brand cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_brand = screen.getByLabelText(/brand/i);

        expect(input_brand).toBeInvalid();
        await user.type(input_brand, 'brand');
        expect(input_brand).toBeValid();
    });

    it('input oem cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_oem = screen.getByLabelText(
            /original equipment manufacture/i
        );

        expect(input_oem).toBeInvalid();
        await user.type(input_oem, 'oem');
        expect(input_oem).toBeValid();
    });

    it('input yom cannot be empty and must be a number', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_yom = screen.getByLabelText(/year of manufacture/i);

        expect(input_yom).toBeInvalid();
        await user.type(input_yom, 'yom');
        expect(input_yom).toBeInvalid();
        await user.clear(input_yom);
        await user.type(input_yom, '60000');
        expect(input_yom).toBeValid();
    });

    it('input made in cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_made_in = screen.getByLabelText(/made in/i);

        expect(input_made_in).toBeInvalid();
        await user.type(input_made_in, 'made in');
        expect(input_made_in).toBeValid();
    });
});