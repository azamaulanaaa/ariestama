import { cleanup, render, screen, waitFor } from "@testing-library/react";

import SignOutPage from "@/pages/signout";
import Database from "@/services/database";
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

describe("SignOut Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("show loading animation while on process", async () => {
    useRouter.mockReturnValue({ isReady: true, push: jest.fn() });

    const database = new Database({} as any);
    const SignOut = jest
      .spyOn(database.auth, "SignOut")
      .mockResolvedValue(null);

    useSessionContext.mockReturnValue({
      database: database,
      userPermission: null,
    });

    render(<SignOutPage />);
    await waitFor(() => {
      expect(SignOut).toHaveBeenCalledTimes(1);
      screen.getByRole("status");
    });
  });

  it("call signout function then redirect", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push });

    const database = new Database({} as any);
    jest.spyOn(database.auth, "SignOut").mockResolvedValue(null);

    useSessionContext.mockReturnValue({
      database: database,
      userPermission: null,
    });

    render(<SignOutPage />);

    await waitFor(() => {
      expect(database.auth.SignOut).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Config.Url.SignIn);
    });
  });
});
