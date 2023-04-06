import { cleanup, render, screen } from '@testing-library/react';
import Paragraph from './paragraph';

afterEach(() => {
    cleanup();
});

describe('Paragraph Typography Base Component', () => {
    it('default render', () => {
        render(<Paragraph>some</Paragraph>);
        screen.getByText('some');
    });
});
