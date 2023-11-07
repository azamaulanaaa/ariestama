import { cleanup, render, screen } from "@testing-library/react";

import Toasts, { ToastsProps } from "./toasts";

describe("Alerts of Dashboard Layout", () => {
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it("render no alert", () => {
    const testdata = {
      data: [],
    };

    render(<Toasts data={testdata.data} />);

    const alert = screen.queryByRole("alert");

    expect(alert).not.toBeInTheDocument();
  });

  it("render a success alert", () => {
    const testdata = {
      data: [
        {
          type: "success",
          message: "success",
          open: true,
          onClose: () => {},
        },
      ],
    };

    render(<Toasts data={testdata.data as ToastsProps["data"]} />);

    const alerts = screen.queryAllByRole("alert");

    testdata.data.forEach((data, index) => {
      const alert = alerts[index];

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(data.message);
    });
  });

  it("render a error alert", () => {
    const testdata = {
      data: [
        {
          type: "error",
          message: "error",
          open: true,
          onClose: () => {},
        },
      ],
    };

    render(<Toasts data={testdata.data as ToastsProps["data"]} />);

    const alerts = screen.queryAllByRole("alert");

    testdata.data.forEach((data, index) => {
      const alert = alerts[index];

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(data.message);
    });
  });

  it("render success alerts", () => {
    const testdata = {
      data: [
        {
          type: "success",
          message: "success1",
          open: true,
          onClose: () => {},
        },
        {
          type: "success",
          message: "success2",
          open: true,
          onClose: () => {},
        },
      ],
    };

    render(<Toasts data={testdata.data as ToastsProps["data"]} />);

    const alerts = screen.queryAllByRole("alert");

    testdata.data.forEach((data, index) => {
      const alert = alerts[index];

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(data.message);
    });
  });

  it("render error alerts", () => {
    const testdata = {
      data: [
        {
          type: "error",
          message: "error1",
          open: true,
          onClose: () => {},
        },
        {
          type: "error",
          message: "error2",
          open: true,
          onClose: () => {},
        },
      ],
    };

    render(<Toasts data={testdata.data as ToastsProps["data"]} />);

    const alerts = screen.queryAllByRole("alert");

    testdata.data.forEach((data, index) => {
      const alert = alerts[index];

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(data.message);
    });
  });

  it("render multiple type of alerts", () => {
    const testdata = {
      data: [
        {
          type: "success",
          message: "sucess",
          open: true,
          onClose: () => {},
        },
        {
          type: "error",
          message: "error",
          open: true,
          onClose: () => {},
        },
      ],
    };

    render(<Toasts data={testdata.data as ToastsProps["data"]} />);

    const alerts = screen.queryAllByRole("alert");

    testdata.data.forEach((data, index) => {
      const alert = alerts[index];

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(data.message);
    });
  });

  it("autoclose after x amout times", async () => {
    const testdata = {
      data: [
        {
          type: "error",
          message: "error",
          open: true,
          onClose: jest.fn(),
        },
      ],
    };

    jest.useFakeTimers();

    render(<Toasts data={testdata.data as ToastsProps["data"]} />);

    const alerts = screen.queryAllByRole("alert");

    testdata.data.forEach((data, index) => {
      const alert = alerts[index];

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(data.message);
    });

    jest.advanceTimersByTime(5000);

    testdata.data.forEach((data) => {
      expect(data.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
