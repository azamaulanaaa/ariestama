import { act, cleanup, render, screen, waitFor } from "@testing-library/react";

import SignOutPage from "@/pages/signout";
import Config from "@/config";

const useRouter = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return useRouter();
  },
}));

const useSessionContext = jest.fn();
jest.mock("@/contexts/Session", () => ({
  __esModule: true,
  useSessionContext() {
    return useSessionContext();
  },
}));

const useAlertsContext = {
  dispatch: jest.fn(),
};
jest.mock("@/contexts/Alerts", () => ({
  __esModule: true,
  useAlertsContext() {
    return useAlertsContext;
  },
}));

describe("SignOut Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("show loading animation while on process", async () => {
    const router = {
      isReady: true,
      psuh: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        signOut: jest.fn().mockReturnValue({ then: () => {} }),
      },
    };
    useSessionContext.mockReturnValue({
      database,
    });

    render(<SignOutPage />);

    const loading = screen.getByRole("status", { hidden: true });

    expect(loading).toBeVisible();
  });

  it("call signout function then redirect", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        signOut: jest.fn().mockResolvedValue({ error: null }),
      },
    };
    useSessionContext.mockReturnValue({ database });

    act(() => {
      render(<SignOutPage />);
    });

    expect(database.auth.signOut).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith(Config.Url.SignIn);
    });
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("render alert is something goes wrong", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        signOut: jest.fn().mockResolvedValue({ error: { message: "some" } }),
      },
    };
    useSessionContext.mockReturnValue({ database });

    useAlertsContext.dispatch.mockImplementationOnce((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("error");
    });

    render(<SignOutPage />);

    await waitFor(() => {
      expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
