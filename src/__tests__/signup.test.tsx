import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Database from "@/libs/Database";
import SignUp from "@/pages/signup";
import Config from "@/config";

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

const layoutDefault = {};
jest.mock("@/components/Layout", () => ({
  __esModule: true,
  default: () => ({
    default: () => layoutDefault,
  }),
}));

describe("SignUp Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup;
  });

  it("render signup form when all ready", async () => {
    useRouter.mockReturnValue({
      isReady: true,
    });
    useSessionContext.mockReturnValue({
      user: null,
    });

    render(<SignUp />);

    await waitFor(() => {
      screen.getByRole("form");
      screen.getByLabelText(/email/i);
      screen.getByLabelText(/^password/i);
      screen.getByLabelText(/confirm password/i);
      screen.getByRole("button");
    });
  });

  it("redirect for signed user", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push });
    useSessionContext.mockReturnValue({
      user: {},
    });

    render(<SignUp />);

    await waitFor(() => {
      expect(push).toBeCalledTimes(1);
      expect(push).toBeCalledWith(Config.Url.Dashboard);
    });
  });

  it("render error alert on fail signup", async () => {
    const testdata = {
      form: {
        email: "some@example.com",
        password: "somesome",
      },
      error: {
        code: "code",
        text: "some",
      },
    };

    useRouter.mockReturnValue({ isReady: true });

    const database = new Database({} as any);
    const signUpFn = jest
      .spyOn(database.auth, "SignUp")
      .mockResolvedValue(testdata.error);

    useSessionContext.mockReturnValue({
      database: database,
      user: null,
    });
    const user = userEvent.setup();

    render(<SignUp />);

    const input_email = screen.getByLabelText(/email/i);
    const input_password = screen.getByLabelText(/^password/i);
    const input_confirm_password = screen.getByLabelText(/confirm password/i);
    const button = screen.getByRole("button");

    await user.type(input_email, testdata.form.email);
    await user.type(input_password, testdata.form.password);
    await user.type(input_confirm_password, testdata.form.password);
    await user.click(button);

    await waitFor(() => {
      const alert = screen.queryByRole("alert");

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(testdata.error.text);
      expect(signUpFn).toBeCalledTimes(1);
      expect(signUpFn).toBeCalledWith({
        email: testdata.form.email,
        password: testdata.form.password,
      });
    });
  });

  it("render success alert on success signup", async () => {
    const testdata = {
      form: {
        email: "some@example.com",
        password: "somesome",
      },
    };

    useRouter.mockReturnValue({ isReady: true });

    const database = new Database({} as any);
    const signUpFn = jest
      .spyOn(database.auth, "SignUp")
      .mockResolvedValue(null);

    useSessionContext.mockReturnValue({
      database: database,
      user: null,
    });
    const user = userEvent.setup();

    render(<SignUp />);

    const input_email = screen.getByLabelText(/email/i);
    const input_password = screen.getByLabelText(/^password/i);
    const input_confirm_password = screen.getByLabelText(/confirm password/i);
    const button = screen.getByRole("button");

    await user.type(input_email, testdata.form.email);
    await user.type(input_password, testdata.form.password);
    await user.type(input_confirm_password, testdata.form.password);
    await user.click(button);

    await waitFor(() => {
      const alert = screen.queryByRole("alert");

      expect(alert).toBeInTheDocument();
      expect(signUpFn).toBeCalledTimes(1);
      expect(signUpFn).toBeCalledWith({
        email: testdata.form.email,
        password: testdata.form.password,
      });
    });
  });

  it("render loading animation while on process", async () => {
    useRouter.mockReturnValue({ isReady: true });

    const database = new Database({} as any);
    jest.spyOn(database.auth, "SignUp").mockResolvedValue(null);

    useSessionContext.mockReturnValue({
      database: database,
      user: null,
    });

    const user = userEvent.setup();

    render(<SignUp />);

    const input_email = screen.getByLabelText(/email/i);
    const input_password = screen.getByLabelText(/^password/i);
    const input_confirm_password = screen.getByLabelText(/confirm password/i);
    const button = screen.getByRole("button");

    await user.type(input_email, "some@exmplain.com");
    await user.type(input_password, "somesome");
    await user.type(input_confirm_password, "somesome");
    user.click(button);

    await waitFor(() => {
      const alert = screen.queryByRole("status");
      expect(alert).toBeInTheDocument();
    });
  });
});
