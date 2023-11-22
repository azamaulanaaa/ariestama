import { cleanup, render, screen } from "@testing-library/react";

import Toasts, { ToastsProps } from "./toasts";

describe("Toasts of Alerts System", () => {
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it("render no alert", async () => {
    const testdata = {
      data: [],
    };

    render(<Toasts data={testdata.data} />);

    const alerts = screen.queryAllByRole("alert");

    expect(alerts).toHaveLength(0);
  });

  it("render a success alert", () => {
    const toastsProps: ToastsProps = {
      data: [
        {
          type: "success",
          message: "success",
          onClose: () => {},
        },
      ],
    };

    render(<Toasts {...toastsProps} />);

    const alerts = screen.getAllByRole("alert");

    expect(alerts).toHaveLength(1);
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(toastsProps.data[index].message);
    });
  });

  it("render a error alert", () => {
    const toastsProps: ToastsProps = {
      data: [
        {
          type: "error",
          message: "error",
          onClose: () => {},
        },
      ],
    };

    render(<Toasts {...toastsProps} />);

    const alerts = screen.getAllByRole("alert");

    expect(alerts).toHaveLength(1);
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(toastsProps.data[index].message);
    });
  });

  it("render success alerts", () => {
    const toastsProps: ToastsProps = {
      data: [
        {
          type: "success",
          message: "success1",
          onClose: () => {},
        },
        {
          type: "success",
          message: "success2",
          onClose: () => {},
        },
      ],
    };

    render(<Toasts {...toastsProps} />);

    const alerts = screen.getAllByRole("alert");

    expect(alerts).toHaveLength(2);
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(toastsProps.data[index].message);
    });
  });

  it("render error alerts", () => {
    const toastsProps: ToastsProps = {
      data: [
        {
          type: "error",
          message: "error1",
          onClose: () => {},
        },
        {
          type: "error",
          message: "error2",
          onClose: () => {},
        },
      ],
    };

    render(<Toasts {...toastsProps} />);

    const alerts = screen.queryAllByRole("alert");

    expect(alerts).toHaveLength(2);
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(toastsProps.data[index].message);
    });
  });

  it("render multiple type of alerts", () => {
    const toastsProps: ToastsProps = {
      data: [
        {
          type: "success",
          message: "sucess",
          onClose: () => {},
        },
        {
          type: "error",
          message: "error",
          onClose: () => {},
        },
      ],
    };

    render(<Toasts {...toastsProps} />);

    const alerts = screen.queryAllByRole("alert");

    expect(alerts).toHaveLength(2);
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(toastsProps.data[index].message);
    });
  });

  it("autoclose after x amout times", async () => {
    const toastsProps: ToastsProps = {
      data: [
        {
          type: "error",
          message: "error",
          autoCloseDuration: 5000,
          onClose: jest.fn(),
        },
      ],
    };

    jest.useFakeTimers();

    render(<Toasts {...toastsProps} />);

    const alerts = screen.queryAllByRole("alert");

    expect(alerts).toHaveLength(1);
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(toastsProps.data[index].message);
    });

    jest.advanceTimersByTime(5000);

    toastsProps.data.forEach((data) => {
      expect(data.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
