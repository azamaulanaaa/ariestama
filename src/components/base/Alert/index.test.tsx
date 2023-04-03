import Alert from '.';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

describe('Alert Component', () => {
    test('Rendering', () => {
        const propses = [
            { message: 'message' },
            { message: 'message', title: 'title' },
        ];

        propses.forEach((props) => {
            render(<Alert {...props} />);
            const alert = screen.getByRole('alert');

            expect(alert).not.toBeNull();
            expect(alert).toHaveTextContent(props.message);

            if (props.title) {
                const heading = screen.getByRole('heading');
                expect(heading).not.toBeNull();
                expect(heading).toHaveTextContent(props.title);
            }

            cleanup();
        });
    });
});
