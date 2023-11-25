import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpPage from "@/pages/signup";
import Config from "@/config";

const useRouter = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
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

describe("SignUp Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup;
  });

  it("render signup form when all ready", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
      },
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    await act(async () => {
      render(<SignUpPage />);
    });

    screen.getByTestId("SignUpForm");

    expect(router.push).toHaveBeenCalledTimes(0);
  });

  it("redirect for signed user", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: {} },
          error: null,
        }),
      },
    };
    useSessionContext.mockReturnValue({ database });

    await act(async () => {
      render(<SignUpPage />);
    });

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith(Config.Url.Dashboard);
    });
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("send correct form data to database", async () => {
    const testdata = {
      form: {
        email: "some@email.com",
        password: "password",
      },
    };

    const router = {
      isReady: true,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
        signUp: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
      },
    };
    useSessionContext.mockReturnValue({ database });

    const user = userEvent.setup();

    await act(async () => {
      render(<SignUpPage />);
    });

    const signUpForm = screen.getByTestId("SignUpForm");
    const email_input = within(signUpForm).getByLabelText(/Email/);
    const password_input = within(signUpForm).getByLabelText(/^Password/);
    const confirmPassword_input =
      within(signUpForm).getByLabelText(/Confirm Password/);
    const button = within(signUpForm).getByRole("button");

    await user.type(email_input, testdata.form.email);
    await user.type(password_input, testdata.form.password);
    await user.type(confirmPassword_input, testdata.form.password);

    expect(database.auth.signUp).toHaveBeenCalledTimes(0);

    await user.click(button);

    expect(database.auth.signUp).toHaveBeenCalledWith(testdata.form);
    expect(database.auth.signUp).toHaveBeenCalledTimes(1);
  });

  it("render error alert and mantains input value on fail signup", async () => {
    const testdata = {
      form: {
        email: "some@example.com",
        password: "somesome",
      },
      error: {
        code: "code",
        message: "some",
      },
    };

    const router = {
      isReady: true,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
        signUp: jest.fn().mockResolvedValue({
          error: testdata.error,
        }),
      },
    };
    useSessionContext.mockReturnValue({
      database,
    });

    useAlertsContext.dispatch.mockImplementationOnce((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("error");
      expect(action.message).toEqual(testdata.error.message);
    });

    const user = userEvent.setup();

    await act(async () => {
      render(<SignUpPage />);
    });

    const signUpForm = screen.getByTestId("SignUpForm");
    const email_input = within(signUpForm).getByLabelText(/Email/);
    const password_input = within(signUpForm).getByLabelText(/^Password/);
    const confirmPassword_input =
      within(signUpForm).getByLabelText(/Confirm Password/);
    const button = within(signUpForm).getByRole("button");

    await user.type(email_input, testdata.form.email);
    await user.type(password_input, testdata.form.password);
    await user.type(confirmPassword_input, testdata.form.password);
    await user.click(button);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);

    expect(email_input).toHaveDisplayValue(testdata.form.email);
    expect(password_input).toHaveDisplayValue(testdata.form.password);
    expect(confirmPassword_input).toHaveDisplayValue(testdata.form.password);
  });

  it("render success alert on success signup", async () => {
    const testdata = {
      form: {
        email: "some@example.com",
        password: "somesome",
      },
    };

    const router = {
      isReady: true,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
        signUp: jest.fn().mockResolvedValue({
          error: null,
        }),
      },
    };
    useSessionContext.mockReturnValue({
      database,
    });

    useAlertsContext.dispatch.mockImplementationOnce((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("success");
    });

    const user = userEvent.setup();

    await act(async () => {
      render(<SignUpPage />);
    });

    const signUpForm = screen.getByTestId("SignUpForm");
    const email_input = within(signUpForm).getByLabelText(/Email/);
    const password_input = within(signUpForm).getByLabelText(/^Password/);
    const confirmPassword_input =
      within(signUpForm).getByLabelText(/Confirm Password/);
    const button = within(signUpForm).getByRole("button");

    await user.type(email_input, testdata.form.email);
    await user.type(password_input, testdata.form.password);
    await user.type(confirmPassword_input, testdata.form.password);
    await user.click(button);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
  });

  it("render loading animation while on process", async () => {
    const router = {
      isReady: true,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
        signUp: jest.fn().mockReturnValue({
          then: () => {},
        }),
      },
    };
    useSessionContext.mockReturnValue({
      database,
    });

    const user = userEvent.setup();

    render(<SignUpPage />);

    const loading = screen.getByRole("status", { hidden: true });
    const signUpForm = screen.getByTestId("SignUpForm");
    const email_input = within(signUpForm).getByLabelText(/email/i);
    const password_input = within(signUpForm).getByLabelText(/^password/i);
    const confirmPassword_input =
      within(signUpForm).getByLabelText(/confirm password/i);
    const button = within(signUpForm).getByRole("button");

    await user.type(email_input, "some@exmplain.com");
    await user.type(password_input, "somesome");
    await user.type(confirmPassword_input, "somesome");

    expect(loading).not.toBeVisible();

    await user.click(button);

    expect(loading).toBeVisible();
  });
});
