import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitsTable from '.';

describe('Units Table Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('render table with header', () => {
        const testdata = {
            headers: {
                serial_number: 'Serial Number',
                brand: 'Brand',
                oem: 'Original Equipment Manufacture',
                yom: 'Year of Manufacture',
                made_in: 'Made In',
            },
        };

        render(<UnitsTable items={[]} />);

        const table = screen.queryByRole('table');
        const colHeaders = screen.queryAllByRole('columnheader');

        expect(table).toBeInTheDocument();
        Object.values(testdata.headers).forEach((value, index) => {
            expect(colHeaders[index]).toBeInTheDocument();
            expect(colHeaders[index]).toHaveTextContent(value);
        });
    });

    it('render items data properly', () => {
        const testdata = {
            items: [
                {
                    id: 'id 1',
                    serial_number: '000',
                    brand: 'Merek 0',
                    oem: 'OEM 0',
                    yom: 2000,
                    made_in: 'Negara Pembuat 0',
                },
                {
                    id: 'id 2',
                    serial_number: '001',
                    brand: 'Merek 1',
                    oem: 'OEM 1',
                    yom: 2000,
                    made_in: 'Negara Pembuat 1',
                },
            ],
        };

        render(<UnitsTable items={testdata.items} />);

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(testdata.items.length + 1);
        testdata.items.forEach((item, index) => {
            const row = rows[index + 1];
            expect(row).toHaveTextContent(item.serial_number);
            expect(row).toHaveTextContent(item.brand);
            expect(row).toHaveTextContent(item.oem);
            expect(row).toHaveTextContent(String(item.yom));
            expect(row).toHaveTextContent(item.made_in);
        });
    });

    it('call onCilck for item clicked', async () => {
        const testdata = {
            items: [
                {
                    id: 'id 1',
                    serial_number: '000',
                    brand: 'Merek 0',
                    oem: 'OEM 0',
                    yom: 2000,
                    made_in: 'Negara Pembuat 0',
                },
                {
                    id: 'id 2',
                    serial_number: '001',
                    brand: 'Merek 1',
                    oem: 'OEM 1',
                    yom: 2000,
                    made_in: 'Negara Pembuat 1',
                },
            ],
        };
        const handleClick = jest.fn();
        const user = userEvent.setup();

        render(<UnitsTable items={testdata.items} onClick={handleClick} />);
        const rows = screen.getAllByRole('row');

        const wait = testdata.items.map(async (item, index) => {
            const row = rows[index + 1];

            return user.click(row).then(() => {
                expect(handleClick).toBeCalledWith(item);
            });
        });

        await Promise.all(wait);
        expect(handleClick).toBeCalledTimes(testdata.items.length);
    });
});
