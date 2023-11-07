import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInForm from ".";

jest.mock("material-ripple-effects", () => ({
  __esModule: true,
  default: () => ({
    create() {},
  }),
}));

describe("SignIn Form", () => {
  afterEach(() => {
    cleanup();
  });

  it("render properly", () => {
    render(<SignInForm />);

    const form = screen.queryByRole("form");
    const input_email = screen.queryByLabelText(/email/i);
    const input_password = screen.queryByLabelText(/password/i);
    const button = screen.queryByRole("button");

    expect(form).toBeInTheDocument();
    expect(input_email).toBeInTheDocument();
    expect(input_password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("call onSubmit when form is submited", async () => {
    const testdata = {
      email: "name@example.com",
      password: "password",
    };
    const handleSubmit = jest.fn();
    const user = userEvent.setup();

    render(<SignInForm onSubmit={handleSubmit} />);

    const input_email = screen.getByLabelText(/email/i);
    const input_password = screen.getByLabelText(/password/i);
    const btn_submit = screen.getByRole("button");

    await user.type(input_email, testdata.email);
    await user.type(input_password, testdata.password);

    await user.click(btn_submit).then(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(testdata);
    });
  });

  it("support error message", async () => {
    const message = "some";

    render(<SignInForm alertProps={{ type: "error", children: message }} />);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent(message);
  });
});
