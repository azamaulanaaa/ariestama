import { cleanup, render, screen } from '@testing-library/react';
import SignUp from '.';

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});

describe('SignUp Form Component', () => {
    it('default render', () => {
        render(<SignUp />);

        const title = screen.getByRole('heading');
        screen.getByRole('form');
        screen.getByLabelText(/email/i);
        screen.getByLabelText(/^password/i);
        screen.getByLabelText(/confirm Password/i);
        const btn_submit = screen.getByRole('button');

        expect(title).toHaveTextContent('Sign up');
        expect(btn_submit).toHaveTextContent(/submit/i);
    });
});
