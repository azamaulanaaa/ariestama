import { cleanup, render, screen } from "@testing-library/react";

import ProtectedPage from ".";

const useRouter = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter() {
    return useRouter();
  },
}));

describe("Protected Content Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("render child correctly if has access", () => {
    const router = {
      isReady: true,
    };
    useRouter.mockReturnValue(router);

    const url = "http://localhost/";

    render(
      <ProtectedPage hasAccess={true} redirectUrl={url}>
        <div data-testid="child"></div>
      </ProtectedPage>,
    );

    const child = screen.queryByTestId("child");

    expect(child).toBeVisible();
  });

  it("redirect to given url if has no access", async () => {
    const router = {
      push: jest.fn(),
      isReady: true,
    };
    useRouter.mockReturnValue(router);

    const url = "http://localhost/";

    render(
      <ProtectedPage hasAccess={false} redirectUrl={url}>
        <div data-testid="child"></div>
      </ProtectedPage>,
    );

    expect(router.push).toHaveBeenCalledWith(url);
    expect(router.push).toHaveBeenCalledTimes(1);
  });
});
