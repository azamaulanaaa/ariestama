import { cleanup, render, screen } from '@testing-library/react';
import Heading from './heading';

afterEach(() => {
    cleanup();
});

describe('Heading Typography Base Component', () => {
    it('render heading level properly', () => {
        for (let level = 1; level <= 5; level++) {
            render(<Heading level={level as any}>some</Heading>);
            screen.getByRole('heading', { level });
            cleanup();
        }
    });
});
