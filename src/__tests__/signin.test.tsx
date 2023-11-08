import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInPage from "@/pages/signin";
import Config from "@/config";
import Database from "@/libs/Database";

const useRouter = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return useRouter();
  },
}));

const useSessionContext = jest.fn();
jest.mock("@/components/SessionContext", () => ({
  useSessionContext() {
    return useSessionContext();
  },
}));

jest.mock("material-ripple-effects", () => ({
  __esModule: true,
  default: () => ({
    create() {},
  }),
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
    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent(testdata.error.text);

      expect(input_email).toHaveValue(testdata.form.email);
      expect(input_password).toHaveValue(testdata.form.password);
    });
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

    await waitFor(() => {
      expect(push).toBeCalledTimes(1);
      expect(push).toBeCalledWith(Config.Url.Dashboard);
    });
  });

  it("redirect to dashboard for signed user", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push });
    useSessionContext.mockReturnValue({ user: {} as any });

    render(<SignInPage />);

    await waitFor(() => {
      expect(push).toBeCalledTimes(1);
      expect(push).toBeCalledWith(Config.Url.Dashboard);
    });
  });

  it("render loading is submit response on process", () => {
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

    user.type(input_email, "some@email.com");
    user.type(input_password, "some");
    user.click(button).then(() => {
      screen.getByRole("status");
    });
  });
});
