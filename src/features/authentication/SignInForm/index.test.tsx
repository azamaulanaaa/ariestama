import { FormEvent } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInForm from ".";

describe("SignIn Form", () => {
  afterEach(() => {
    cleanup();
  });

  it("render properly", () => {
    render(<SignInForm />);

    screen.getByTestId("SignInForm")
    screen.getByRole("form");
    const email_input = screen.getByLabelText(/Email/);
    const password_input = screen.getByLabelText(/Password/);
    const button = screen.getByRole("button");

    expect(email_input).toHaveDisplayValue("");
    expect(password_input).toHaveDisplayValue("");
    expect(password_input).toHaveAttribute("type", "password");
    expect(button).toHaveTextContent(/Submit/);
  });

  it("call onSubmit when form is submited", async () => {
    const testdata = {
      email: "name@example.com",
      password: "password",
    };

    const handleSubmit = jest.fn();
    const handleSubmitWrapper = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      handleSubmit(data);
    };

    const user = userEvent.setup();

    render(<SignInForm onSubmit={handleSubmitWrapper} />);

    const email_input = screen.getByLabelText(/email/i);
    const password_input = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button");

    await user.type(email_input, testdata.email);
    await user.type(password_input, testdata.password);
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(testdata);
  });
});
