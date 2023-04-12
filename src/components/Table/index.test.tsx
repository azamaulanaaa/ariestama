import { cleanup, render, screen } from '@testing-library/react';
import Table from '.';

describe('Table Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('render header', () => {
        const headers = {
            data1: 'header1',
            data2: 'header2',
            data3: 'header3',
        };

        render(<Table headers={headers} items={[]} />);

        screen.getByRole('table');
        const colHeaders = screen.getAllByRole('columnheader');

        Object.entries(headers).forEach(([_, value], index) => {
            const colHeader = colHeaders[index];
            expect(colHeader).toHaveTextContent(value);
        });
    });

    it('render items', () => {
        const headers = {
            data1: 'header1',
            data2: 'header2',
            data3: 'header3',
        };
        const items = [
            {
                data1: 'data1',
                data2: 'data2',
                data3: 'data3',
            },
            {
                data1: 'data4',
                data2: 'data5',
                data3: 'data6',
            },
        ];

        render(<Table headers={headers} items={items} />);

        screen.getByRole('table');
        const rows = screen.getAllByRole('row');

        items.forEach((item, index) => {
            const row = rows[index + 1];
            Object.entries(item).forEach(([_, value]) => {
                expect(row).toHaveTextContent(value);
            });
        });
    });

    it('render only item value that have key matchs header key', () => {
        const headers = {
            data1: 'header1',
            data3: 'header3',
        };
        const items = [
            {
                data1: 'data1',
                data2: 'data2',
                data3: 'data3',
            },
            {
                data1: 'data4',
                data2: 'data5',
                data3: 'data6',
            },
        ];

        render(<Table headers={headers} items={items} />);

        screen.getByRole('table');
        const rows = screen.getAllByRole('row');

        items.forEach((item, index) => {
            const row = rows[index + 1];
            expect(row).toHaveTextContent(item.data1);
            expect(row).not.toHaveTextContent(item.data2);
            expect(row).toHaveTextContent(item.data3);
        });
    });
});
