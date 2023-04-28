import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitsTable from '.';

describe('Units Table Component', () => {
    const user = userEvent.setup();
    afterEach(() => {
        cleanup();
    });

    it('render header data properly', () => {
        const headers = {
            serial_number: 'Nomor Seri',
            brand: 'Merek',
            oem: 'OEM',
            yom: 'Tahun Dibuat',
            made_in: 'Negara Pembuat',
        };

        render(<UnitsTable items={[]} />);

        const colHeaders = screen.getAllByRole('columnheader');
        Object.entries(headers).forEach(([_, value], index) => {
            expect(colHeaders[index]).toHaveTextContent(value);
        });
    });

    it('render items data properly', () => {
        const items = [
            {
                serial_number: '000',
                brand: 'Merek 0',
                oem: 'OEM 0',
                yom: 2000,
                made_in: 'Negara Pembuat 0',
            },
            {
                serial_number: '001',
                brand: 'Merek 1',
                oem: 'OEM 1',
                yom: 2000,
                made_in: 'Negara Pembuat 1',
            },
        ];

        render(<UnitsTable items={items} />);

        screen.getByRole('table');
        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(items.length + 1);
        items.forEach((item, index) => {
            const row = rows[index + 1];
            Object.entries(item).forEach(([_, value]) => {
                expect(row).toHaveTextContent(String(value));
            });
        });
    });

    it('call onCilck for item clicked', async () => {
        const handleClick = jest.fn();
        const items = [
            {
                serial_number: '000',
                brand: 'Merek 0',
                oem: 'OEM 0',
                yom: 2000,
                made_in: 'Negara Pembuat 0',
            },
            {
                serial_number: '001',
                brand: 'Merek 1',
                oem: 'OEM 1',
                yom: 2000,
                made_in: 'Negara Pembuat 1',
            },
        ];

        render(<UnitsTable items={items} />);
        const rows = screen.getAllByRole('row');

        items.forEach(async (item, index) => {
            const row = rows[index + 1];

            await user.click(row);
            expect(handleClick).toBeCalledWith(item);
        });
    });
});
