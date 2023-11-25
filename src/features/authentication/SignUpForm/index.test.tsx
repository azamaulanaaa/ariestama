import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from ".";
import { FormEvent } from "react";

describe("SignUp Form Component", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("default render", () => {
    render(<SignUpForm />);

    screen.getByTestId("SignUpForm");
    screen.getByRole("form");
    const email_input = screen.getByLabelText(/Email/);
    const password_input = screen.getByLabelText(/^Password/);
    const confirmPassword_input = screen.getByLabelText(/Confirm Password/);
    const button = screen.getByRole("button");

    expect(email_input).toHaveDisplayValue("");
    expect(password_input).toHaveDisplayValue("");
    expect(confirmPassword_input).toHaveDisplayValue("");
    expect(button).toHaveTextContent(/submit/i);
  });

  it("call onSubmit on click submit botton", async () => {
    const testdata = {
      email: "some@email.com",
      password: "somesome",
    };

    const handleSubmit = jest.fn();
    const handleSubmitWrapper = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      handleSubmit(data);
    };

    const user = userEvent.setup();

    render(<SignUpForm onSubmit={handleSubmitWrapper} />);

    const email_input = screen.getByLabelText(/Email/);
    const password_input = screen.getByLabelText(/^Password/);
    const confirmPassword_input = screen.getByLabelText(/Confirm Password/);
    const button = screen.getByRole("button");

    await user.type(email_input, testdata.email);
    await user.type(password_input, testdata.password);
    await user.type(confirmPassword_input, testdata.password);

    expect(handleSubmit).toHaveBeenCalledTimes(0);
    await user.click(button);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(testdata);
    });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("everytimes password change make sure password and confirm password are the same", async () => {
    const user = userEvent.setup();

    render(<SignUpForm />);

    const password_input = screen.getByLabelText(/^Password/);
    const confirmPassword_input = screen.getByLabelText(/Confirm Password/);

    expect(confirmPassword_input).toBeInvalid();
    await user.type(password_input, "some").then(() => {
      expect(confirmPassword_input).toBeInvalid();
    });
    await user.type(confirmPassword_input, "some2");
    await user.type(password_input, "2").then(() => {
      expect(confirmPassword_input).toBeValid();
    });
  });

  it("everytimes confirm password change make sure password and confirm password are the same", async () => {
    const user = userEvent.setup();

    render(<SignUpForm />);

    const input_password = screen.getByLabelText(/^password/i);
    const input_confirm_password = screen.getByLabelText(/confirm password/i);

    expect(input_confirm_password).toBeInvalid();
    await user.type(input_confirm_password, "some").then(() => {
      expect(input_confirm_password).toBeInvalid();
    });
    await user.type(input_password, "some2");
    await user.type(input_confirm_password, "2").then(() => {
      expect(input_confirm_password).toBeValid();
    });
  });

  it("valid password should have minimum char of 6", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const input_password = screen.getByLabelText(/^password/i);
    expect(input_password).toBeInvalid();

    const wait = "12345".split("").map(async (char) => {
      return user.type(input_password, char).then(() => {
        expect(input_password).toBeInvalid();
      });
    });
    await Promise.all(wait);

    await user.type(input_password, "6").then(() => {
      expect(input_password).toBeValid();
    });
  });

  it("set email to invalid if inputed with invalid email", () => {
    const testdata = {
      invalidEmails: ["some", "some@", "some@email", "some @email.com"],
    };
    const user = userEvent.setup();

    render(<SignUpForm />);

    const input_email = screen.getByLabelText(/email/i);

    expect(input_email).toBeInvalid();

    testdata.invalidEmails.forEach(async (invalidEmail) => {
      await user.clear(input_email);
      await user.type(input_email, invalidEmail).then(() => {
        expect(input_email).toBeInvalid();
      });
    });
  });

  it("set email to valid if inputed with valid email", () => {
    const testdata = {
      validEmails: [
        "some@gmail.com",
        "some@example.com",
        "s0m33@yahoo.to",
        "n4m3_e@domain.wow",
      ],
    };
    const user = userEvent.setup();

    render(<SignUpForm />);

    const input_email = screen.getByLabelText(/email/i);

    expect(input_email).toBeInvalid();

    testdata.validEmails.forEach(async (validEmail) => {
      await user.clear(input_email);
      await user.type(input_email, validEmail).then(() => {
        expect(input_email).toBeValid();
      });
    });
  });
});
