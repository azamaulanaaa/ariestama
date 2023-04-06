import { cleanup, render, screen } from '@testing-library/react';
import Text from './text';

afterEach(() => {
    cleanup();
});

describe('Typography Text Base Component', () => {
    it('default rendering', () => {
        render(<Text>some</Text>);
        screen.getByText('some');
    });

    it('support bold', () => {
        render(<Text bold>some</Text>);
        screen.getByText('some');
    });

    it('support italic', () => {
        render(<Text italic>some</Text>);
        screen.getByText('some');
    });

    it('support underline', () => {
        render(<Text underline>some</Text>);
        screen.getByText('some');
    });
});
