import { cleanup, render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import InsertUnitForm from '.';

jest.mock('material-ripple-effects', () => ({
    __esModule: true,
    default: () => ({
        create() {},
    }),
}));

describe('InsertCompanyForm Component', () => {
    afterEach(cleanup);

    it('render a complete form', () => {
        render(<InsertUnitForm />);

        screen.getByRole('form');
        screen.getByRole('button');
        screen.getByLabelText(/name/i);
        screen.getByLabelText(/branch/i);
        screen.getByLabelText(/address/i);
        screen.getByLabelText(/sub-district/i);
        screen.getByLabelText(/city/i);
        screen.getByLabelText(/province/i);
        screen.getByLabelText(/zip code/i);
    });

    it('call onSubmit function if submit button is clicked', async () => {
        const testdata = {
            name: 'NAME',
            branch: 'branch',
            address: 'address',
            sub_district: 'subdistrict',
            city: 'city',
            province: 'province',
            zip_code: 1000,
        };
        const handleSubmit = jest.fn();
        const user = UserEvent.setup();

        render(<InsertUnitForm onSubmit={handleSubmit} />);
        const button = screen.getByRole('button');
        const input_name = screen.getByLabelText(/name/i);
        const input_branch = screen.getByLabelText(/branch/i);
        const input_address = screen.getByLabelText(/address/i);
        const input_subdistrict = screen.getByLabelText(/sub-district/i);
        const input_city = screen.getByLabelText(/city/i);
        const input_province = screen.getByLabelText(/province/i);
        const input_zipcode = screen.getByLabelText(/zip code/i);

        await user.type(input_name, testdata.name);
        await user.type(input_branch, testdata.branch);
        await user.type(input_address, testdata.address);
        await user.type(input_subdistrict, testdata.sub_district);
        await user.type(input_city, testdata.city);
        await user.type(input_province, testdata.province);
        await user.type(input_zipcode, String(testdata.zip_code));

        expect(handleSubmit).toBeCalledTimes(0);

        await user.click(button);
        expect(handleSubmit).toBeCalledTimes(1);
        expect(handleSubmit).toBeCalledWith({
            name: testdata.name,
            branch: testdata.branch,
            address: testdata.address,
            sub_district: testdata.sub_district,
            city: testdata.city,
            province: testdata.province,
            zip_code: testdata.zip_code,
        });
    });

    it('input name cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_name = screen.getByLabelText(/name/i);

        expect(input_name).toBeInvalid();
        await user.type(input_name, 'nama');
        expect(input_name).toBeValid();
    });

    it('input branch cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_branch = screen.getByLabelText(/branch/i);

        expect(input_branch).toBeInvalid();
        await user.type(input_branch, 'cabang');
        expect(input_branch).toBeValid();
    });

    it('input address cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_address = screen.getByLabelText(/address/i);

        expect(input_address).toBeInvalid();
        await user.type(input_address, 'alamat');
        expect(input_address).toBeValid();
    });

    it('input subdistrict cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_subdistrict = screen.getByLabelText(/sub-district/i);

        expect(input_subdistrict).toBeInvalid();
        await user.type(input_subdistrict, 'kecamatan');
        expect(input_subdistrict).toBeValid();
    });

    it('input city cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_city = screen.getByLabelText(/city/i);

        expect(input_city).toBeInvalid();
        await user.type(input_city, 'kabkota');
        expect(input_city).toBeValid();
    });

    it('input province cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_province = screen.getByLabelText(/province/i);

        expect(input_province).toBeInvalid();
        await user.type(input_province, 'provinsi');
        expect(input_province).toBeValid();
    });

    it('input zipcode must be a number and cannot be empty', async () => {
        const user = UserEvent.setup();

        render(<InsertUnitForm />);
        const input_zipcode = screen.getByLabelText(/zip code/i);

        expect(input_zipcode).toBeInvalid();
        await user.type(input_zipcode, 'kodepos');
        expect(input_zipcode).toBeInvalid();
        await user.clear(input_zipcode);
        await user.type(input_zipcode, '60000');
        expect(input_zipcode).toBeValid();
    });
});
