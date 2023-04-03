import Input from '.';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

describe('Input Component', () => {
    test('Rendering', () => {
        const propses = [
            {},
            { name: 'name' },
            { type: 'text' },
            { type: 'email' },
            { type: 'password' },
            { type: 'number' },
        ];

        propses.forEach((props) => {
            render(<Input {...props} />);
            const input = screen.getByRole('textbox');

            expect(input).not.toBeNull();
            cleanup();
        });
    });

    test('Value Input', () => {
        render(<Input />);
        const input = screen.getByRole('textbox');

        fireEvent.input(input, {
            target: { value: 'input' },
        });

        expect(input).toHaveValue('input');
    });

    test('Html Attributes', () => {
        const propses = [{ name: 'name' }];

        propses.forEach((props) => {
            render(<Input {...props} />);
            const input = screen.getByRole('textbox');

            Object.entries(props).forEach(([key, value]) => {
                expect(input).toHaveAttribute(key, value);
            });
        });
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

        expect(input).not.toBeNull();
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

    test('Placeholder', () => {
        const placeholder = 'placeholder';
        render(<Input placeholder={placeholder} />);
        const input_textbox = screen.getByRole('textbox');
        const input_placeholder = screen.getByPlaceholderText(placeholder);

        expect(input_textbox).toBeInTheDocument();
        expect(input_placeholder).toBeInTheDocument();
        expect(input_textbox).toEqual(input_placeholder);
    });
});
