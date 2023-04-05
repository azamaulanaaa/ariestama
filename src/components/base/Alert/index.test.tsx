import Alert from '.';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

describe('Alert Component', () => {
    it('render properly', () => {
        const propses = [
            { message: 'message' },
            { message: 'message', title: 'title' },
        ];

        propses.forEach((props) => {
            render(<Alert {...props} />);
            const alert = screen.queryByRole('alert');
            const heading = screen.queryByRole('heading');

            expect(alert).toBeInTheDocument();
            expect(alert).toHaveTextContent(props.message);

            if (props.title) {
                expect(heading).toBeInTheDocument();
                expect(heading).toHaveTextContent(props.title);
            }

            cleanup();
        });
    });
});
