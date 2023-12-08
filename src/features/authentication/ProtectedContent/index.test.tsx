import { cleanup, render, screen } from "@testing-library/react";

import ProtectedContent from ".";

describe("Protected Content Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("render child correctly if has access", () => {
    render(
      <ProtectedContent isLocked={false}>
        <div data-testid="child"></div>
      </ProtectedContent>,
    );

    const child = screen.getByTestId("child");
    const blocker = screen.getByTestId("blocker");
    const alert = screen.getByRole("alert", { hidden: true });

    expect(child).toBeVisible();
    expect(blocker).not.toBeVisible();
    expect(alert).not.toBeVisible();
  });

  it("render blocker if no access", async () => {
    render(
      <ProtectedContent isLocked={true}>
        <div data-testid="child"></div>
      </ProtectedContent>,
    );

    const child = screen.getByTestId("child");
    const blocker = screen.getByTestId("blocker");

    expect(child).toBeVisible();
    expect(blocker).toBeVisible();
  });

  it("render alert if no access", async () => {
    render(
      <ProtectedContent isLocked={true}>
        <div data-testid="child"></div>
      </ProtectedContent>,
    );

    const child = screen.getByTestId("child");
    const blocker = screen.getByTestId("blocker");
    const alert = screen.getByRole("alert", { hidden: true });

    expect(child).toBeVisible();
    expect(blocker).toBeVisible();
    expect(alert).toBeVisible();
  });
});
