import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Input from '@/components/Input';

afterEach(() => {
    cleanup();
});

describe('Input Component', () => {
    test('Rendering', () => {
        render(<Input />);
        const input = screen.getByRole('textbox');

        expect(input).toBeInTheDocument();
    });

    test('Name and Value', () => {
        render(<input name="input" />);
        const input = screen.getByRole('textbox');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('name', 'input');

        fireEvent.input(input, {
            target: { value: 'input' },
        });

        expect(input).toHaveValue('input');
    });

    test('onChange', () => {
        const onChange = jest.fn();
        render(<input onChange={onChange} />);
        const input = screen.getByRole('textbox');

        for (let i: number = 0; i < 5; i++) {
            fireEvent.change(input, {
                target: { value: i },
            });
        }

        expect(input).toBeInTheDocument();
        expect(onChange.mock.calls).toHaveLength(5);
    });

    test('Sugestion', () => {
        const items = [
            { value: 'value1' },
            { value: 'value2', description: 'description2' },
        ];

        render(<Input sugestionitems={items} />);
        const input = screen.getByRole('textbox');
        const sugestion = screen.getByRole('menu');
        const sugestionItems = screen.getAllByRole('menuitem');

        expect(input).toBeInTheDocument();
        expect(sugestion).toBeInTheDocument();
        expect(sugestionItems).toHaveLength(2);
        sugestionItems.forEach((sugestionItem, index) => {
            const { value, description } = items[index];
            expect(sugestionItem).toBeInTheDocument();
            expect(sugestionItem).toHaveTextContent(value);
            if (description) {
                expect(sugestionItem).toHaveTextContent(description);
            }

            fireEvent.click(sugestionItem);
            expect(input).toHaveValue(value);
        });
    });
});
