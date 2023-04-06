import TextField from '.';
import {
    render,
    screen,
    cleanup,
    fireEvent,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

afterEach(() => {
    cleanup();
});

describe('TextField Component', () => {
    const user = userEvent.setup();
    it('render properly', () => {
        render(<TextField />);
        const textfield = screen.getByRole('textbox');

        expect(textfield).toHaveValue('');
        expect(textfield).toHaveDisplayValue('');
    });

    it('support value primitive attribute', () => {
        render(<TextField value="some" />);
        const input = screen.getByRole('textbox');

        expect(input).toHaveValue('some');
    });

    it('support id primitive attribute', () => {
        render(<TextField id="some" />);
        const input = screen.getByRole('textbox');

        expect(input).toHaveAttribute('id', 'some');
    });

    it('support name primitive attribute', async () => {
        const wrapper = ({ children }: { children: ReactNode }) => (
            <form role="form">{children}</form>
        );
        const value = 'some';

        render(<TextField name="textfield" />, { wrapper });
        const form = screen.getByRole('form');
        const input = screen.getByRole('textbox');

        await user.type(input, value);

        await waitFor(() => {
            expect(form).toHaveFormValues({ textfield: value });
        });
    });

    it('support required primitive attribute', () => {
        render(<TextField required />);
        const input = screen.getByRole('textbox');

        expect(input).toBeRequired();
    });

    it('call onChange everytime char is typed', async () => {
        const onChange = jest.fn();
        const value = 'some';

        render(<input onChange={onChange} />);
        const input = screen.getByRole('textbox');

        await user.type(input, value);

        await waitFor(() => {
            expect(onChange).toBeCalledTimes(value.length);
        });
    });

    it('support suggestion list if given', () => {
        const items = [
            { value: 'value1' },
            { value: 'value2', description: 'description2' },
        ];

        render(<TextField sugestionitems={items} />);
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

    it('support placeholder attribute', () => {
        const placeholder = 'placeholder';
        render(<TextField placeholder={placeholder} />);
        const input_byRole = screen.getByRole('textbox');
        const input_byPlaceholder = screen.getByPlaceholderText(placeholder);

        expect(input_byRole).toEqual(input_byPlaceholder);
    });

    it('support type spesific input', () => {
        const testCases = [
            {
                type: 'email',
                invalidValues: ['not_email', 'no@email', 'not valid@email.com'],
            },
            {
                type: 'number',
                invalidValues: ['k134j', 'kasdf', ' 1234 234'],
            },
        ];
        const { rerender } = render(<TextField />);
        const input = screen.getByRole('textbox');
        testCases.forEach(async (testCase) => {
            rerender(<TextField type={testCase.type as any} />);

            testCase.invalidValues.forEach(async (invalidValue) => {
                await user.type(input, invalidValue);
                expect(input).toHaveValue(invalidValue);
            });
        });
    });

    it('support password type input', () => {
        render(<TextField type="password" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('type', 'password');
    });
});
