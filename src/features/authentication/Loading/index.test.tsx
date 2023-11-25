import { cleanup, render, screen } from "@testing-library/react";

import Loading from ".";

describe("Loading Base Component", () => {
  afterEach(cleanup);

  it("render child if not loading", () => {
    render(
      <Loading isLoading={false}>
        <div data-testid="child"></div>
      </Loading>,
    );

    const child = screen.getByTestId("child");
    const status = screen.getByRole("status", { hidden: true });

    expect(child).toBeVisible();
    expect(status).not.toBeVisible();
  });

  it("render loading animation if loading", () => {
    render(
      <Loading isLoading={true}>
        <div data-testid="child"></div>
      </Loading>,
    );

    const child = screen.getByTestId("child");
    const status = screen.getByRole("status", { hidden: true });

    expect(child).toBeVisible();
    expect(status).toBeVisible();
  });

  it("render loading animation if no child", () => {
    render(<Loading />);
    const status = screen.getByRole("status", { hidden: true });

    expect(status).toBeVisible();
  });
});
