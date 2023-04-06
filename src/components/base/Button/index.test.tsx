import { cleanup, render, screen } from '@testing-library/react';
import Button from '.';

afterEach(cleanup);

describe('Button Base Component', () => {
    it('render default', () => {
        render(<Button>some</Button>);
        const button = screen.getByRole('button');

        expect(button).toHaveTextContent('some');
    });
});
