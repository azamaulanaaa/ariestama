import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import Alert, { AlertProps } from ".";

describe("Alert component", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("render success alert", async () => {
    const alertProps = {
      type: "success",
      children: "msg",
    };

    render(<Alert {...(alertProps as AlertProps)} />);
    const alert = screen.getByRole("alert");
    const closeButton = screen.queryByTestId("close-button");

    expect(alert).toHaveTextContent(alertProps.children as string);
    expect(closeButton).not.toBeInTheDocument();
  });

  it("render error alert", async () => {
    const alertProps: AlertProps = {
      type: "error",
      children: "msg",
    };

    render(<Alert {...alertProps} />);
    const alert = screen.getByRole("alert");
    const closeButton = screen.queryByTestId("close-button");

    expect(alert).toHaveTextContent(alertProps.children as string);
    expect(closeButton).not.toBeInTheDocument();
  });

  it("success alert call onClose function when cross icon is clicked", async () => {
    const alertProps: AlertProps = {
      type: "success",
      children: "msg",
      onClose: jest.fn(),
    };
    const user = UserEvent.setup();

    render(<Alert {...alertProps} />);

    const alert = screen.getByRole("alert");
    const closeButton = screen.getByTestId("close-button");

    expect(alert).toHaveTextContent(alertProps.children as string);
    await user.click(closeButton);
    expect(alertProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("error alert call onClose function when cross icon is clicked", async () => {
    const alertProps: AlertProps = {
      type: "error",
      children: "msg",
      onClose: jest.fn(),
    };
    const user = UserEvent.setup();

    render(<Alert {...alertProps} />);

    const alert = screen.getByRole("alert");
    const closeButton = screen.getByTestId("close-button");

    expect(alert).toHaveTextContent(alertProps.children as string);
    await user.click(closeButton);
    expect(alertProps.onClose).toHaveBeenCalledTimes(1);
  });
});
