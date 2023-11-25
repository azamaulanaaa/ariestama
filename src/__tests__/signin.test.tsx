import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInPage from "@/pages/signin";
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

describe("SignIn Page", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("render SignIn form when all ready", async () => {
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
    useSessionContext.mockReturnValue({ database });

    await act(async () => {
      render(<SignInPage />);
    });

    screen.getByTestId("SignInForm");
    expect(router.push).toHaveBeenCalledTimes(0);
  });

  it("send correct data to database", async () => {
    const testdata = {
      form: {
        email: "some@email.com",
        password: "some",
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
        signInWithPassword: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
      },
    };
    useSessionContext.mockReturnValue({ database });

    const user = userEvent.setup();

    await act(async () => {
      render(<SignInPage />);
    });

    const signInForm = screen.getByTestId("SignInForm");
    const email_input = within(signInForm).getByLabelText(/Email/);
    const password_input = within(signInForm).getByLabelText(/Password/);
    const button = within(signInForm).getByRole("button");

    await user.type(email_input, testdata.form.email);
    await user.type(password_input, testdata.form.password);

    expect(database.auth.signInWithPassword).toHaveBeenCalledTimes(0);

    await user.click(button);

    expect(database.auth.signInWithPassword).toHaveBeenCalledWith(
      testdata.form,
    );
    expect(database.auth.signInWithPassword).toHaveBeenCalledTimes(1);
  });

  it("renders Alert and maintains input value for incorrect signin", async () => {
    const testdata = {
      error: {
        code: "code",
        message: "some",
      },
      form: {
        email: "some@email.com",
        password: "some",
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
        signInWithPassword: jest.fn().mockResolvedValue({
          data: { session: null },
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
    });

    const user = userEvent.setup();

    await act(async () => {
      render(<SignInPage />);
    });

    const signInForm = screen.getByTestId("SignInForm");
    const email_input = within(signInForm).getByLabelText(/Email/);
    const password_input = within(signInForm).getByLabelText(/Password/);
    const button = within(signInForm).getByRole("button");

    await user.type(email_input, testdata.form.email);
    await user.type(password_input, testdata.form.password);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(0);

    await user.click(button);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);

    expect(email_input).toHaveValue(testdata.form.email);
    expect(password_input).toHaveValue(testdata.form.password);
  });

  it("redirect to dashboard for success signin", async () => {
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
        signInWithPassword: jest.fn().mockResolvedValue({
          data: { session: {} },
          error: null,
        } as any),
      },
    };
    useSessionContext.mockReturnValue({
      database,
    });

    const user = userEvent.setup();

    await act(async () => {
      render(<SignInPage />);
    });

    const signInForm = screen.getByTestId("SignInForm");
    const email_input = within(signInForm).getByLabelText(/Email/);
    const password_input = within(signInForm).getByLabelText(/Password/);
    const button = within(signInForm).getByRole("button");

    await user.type(email_input, "some@email.com");
    await user.type(password_input, "some");
    await user.click(button);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(0);
    expect(router.push).toHaveBeenCalledWith(Config.Url.Dashboard);
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("redirect to dashboard for signed user", async () => {
    const router = { isReady: true, push: jest.fn() };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: {} },
          error: null,
        }),
      },
    };
    useSessionContext.mockReturnValue({
      database,
    });

    await act(async () => {
      render(<SignInPage />);
    });

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith(Config.Url.Dashboard);
    });
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("render loading when form response on process", async () => {
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
        signInWithPassword: jest.fn().mockReturnValue({ then: () => {} }),
      },
    };
    useSessionContext.mockReturnValue({
      database,
    });
    const user = userEvent.setup();

    await act(async () => {
      render(<SignInPage />);
    });

    const loading = screen.queryByRole("status", { hidden: true });
    const signInForm = screen.getByTestId("SignInForm");
    const email_input = within(signInForm).getByLabelText(/Email/);
    const password_input = within(signInForm).getByLabelText(/Password/);
    const button = within(signInForm).getByRole("button");

    await waitFor(() => {
      expect(loading).not.toBeVisible();
    });

    await user.type(email_input, "some@email.com");
    await user.type(password_input, "some");
    await user.click(button);

    expect(loading).toBeVisible();
  });
});
