import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInPage from "@/pages/signin";
import Config from "@/config";
import Database from "@/services/database";

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

describe("SignIn Page", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("render SignIn form when all ready", () => {
    useRouter.mockReturnValue({ isReady: true });
    useSessionContext.mockReturnValue({ userPermission: {} });

    render(<SignInPage />);

    const loading = screen.queryByRole("status");

    screen.getByRole("form");

    expect(loading).not.toBeInTheDocument();
  });

  it("renders Alert and maintains input data for incorrect signin", async () => {
    const testdata = {
      error: {
        code: "code",
        text: "some",
      },
      form: {
        email: "some@email.com",
        password: "some",
      },
    };

    useRouter.mockReturnValue({ isReady: true });

    useAlertsContext.dispatch.mockImplementationOnce((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("error");
    });

    const database = new Database({} as any);
    jest.spyOn(database.auth, "SignIn").mockResolvedValue(testdata.error);
    useSessionContext.mockReturnValue({
      database: database,
      user: null,
    });
    const user = userEvent.setup();

    render(<SignInPage />);

    const input_email = screen.getByLabelText(/email/i);
    const input_password = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await user.type(input_email, testdata.form.email);
    await user.type(input_password, testdata.form.password);
    await user.click(button);

    expect(input_email).toHaveValue(testdata.form.email);
    expect(input_password).toHaveValue(testdata.form.password);
  });

  it("redirect to dashboard for success signin", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push });

    const database = new Database({} as any);
    jest.spyOn(database.auth, "SignIn").mockResolvedValue(null);

    useSessionContext.mockReturnValue({
      database: database,
      user: null,
    });
    const user = userEvent.setup();

    render(<SignInPage />);

    const input_email = screen.getByLabelText(/email/i);
    const input_password = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await user.type(input_email, "some@email.com");
    await user.type(input_password, "some");
    await user.click(button);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(Config.Url.Dashboard);
  });

  it("redirect to dashboard for signed user", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push });
    useSessionContext.mockReturnValue({ user: {} as any });

    render(<SignInPage />);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(Config.Url.Dashboard);
  });

  it("render loading is submit response on process", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push });

    const database = new Database({} as any);
    jest.spyOn(database.auth, "SignIn").mockResolvedValue(null);

    useSessionContext.mockReturnValue({
      database: database,
      user: null,
    });
    const user = userEvent.setup();

    render(<SignInPage />);

    const input_email = screen.getByLabelText(/email/i);
    const input_password = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await user.type(input_email, "some@email.com");
    await user.type(input_password, "some");
    user.click(button);

    await waitFor(() => {
      screen.getByRole("status");
    });
  });
});
