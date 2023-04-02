import Alert from '@/components/Alert';
import { act, cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

describe('Alert Component', () => {
    test('Basic Rendering', () => {
        render(<Alert message="message" />);
        const alert = screen.getByRole('alert');

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent('message');
    });

    test('With Title Rendering', () => {
        const message = 'message';
        const title = 'title';

        render(<Alert title={title} message={message} />);
        const alert = screen.getByRole('alert');
        const heading = screen.getByRole('heading');

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(message);
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(title);
    });
});
