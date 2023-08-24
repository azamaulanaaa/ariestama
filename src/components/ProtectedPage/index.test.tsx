import { cleanup, render, screen, waitFor } from '@testing-library/react';

import ProtectedPage from '.';

const useRouter = jest.fn();
jest.mock('next/router', () => ({
    useRouter() {
        return useRouter();
    },
}));

describe('Protected Content Component', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('render child correctly if has access', () => {
        useRouter.mockReturnValue({
            isReady: true,
        });

        const url = 'http://localhost/';

        render(
            <ProtectedPage hasAccess={true} redirectUrl={url} isReady={true}>
                <div data-testid="child"></div>
            </ProtectedPage>
        );

        screen.getByTestId('child');
    });

    it('redirect to given url if has no access', async () => {
        const routerPush = jest.fn();
        useRouter.mockReturnValue({
            push: routerPush,
            isReady: true,
        });

        const url = 'http://localhost/';

        render(
            <ProtectedPage
                hasAccess={false}
                redirectUrl={url}
                isReady={true}
            >
                <div data-testid="child"></div>
            </ProtectedPage>
        );

        await waitFor(() => {
            expect(routerPush).toHaveBeenCalledTimes(1);
            expect(routerPush).toHaveBeenCalledWith(url);
        });
    });

    it('render loading animation if access on verification', () => {
        useRouter.mockReturnValue({
            isReady: true,
        });

        const url = 'http://localhost/';

        render(
            <ProtectedPage
                hasAccess={false}
                redirectUrl={url}
                isReady={false}
            >
                <div data-testid="child"></div>
            </ProtectedPage>
        );

        screen.getByRole('status');
    });
});
