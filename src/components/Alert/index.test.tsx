import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import Alert from ".";

jest.mock("material-ripple-effects", () => ({
  __esModule: true,
  default: () => ({
    create() {},
  }),
}));

describe("Alert component", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("render success alert", () => {
    const testdata = {
      type: "success",
      message: "msg",
    };

    render(<Alert type={testdata.type as any}>{testdata.message}</Alert>);
    const alert = screen.queryByRole("alert");
    const closeButton = screen.queryByRole("button");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(testdata.message);
    expect(closeButton).not.toBeInTheDocument();
  });

  it("render error alert", () => {
    const testdata = {
      type: "error",
      message: "msg",
    };

    render(<Alert type={testdata.type as any}>{testdata.message}</Alert>);
    const alert = screen.queryByRole("alert");
    const closeButton = screen.queryByRole("button");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(testdata.message);
    expect(closeButton).not.toBeInTheDocument();
  });

  it("call onClose function when cross icon is clicked", async () => {
    const testdata = {
      message: "msg",
    };
    const handleClose = jest.fn();
    const user = UserEvent.setup();

    render(
      <Alert type="error" onClose={handleClose}>
        {testdata.message}
      </Alert>,
    );

    const closeButton = screen.getByRole("button");

    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
