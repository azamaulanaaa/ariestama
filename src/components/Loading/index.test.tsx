import { cleanup, render, screen } from "@testing-library/react";

import Loading from ".";

describe("Loading Base Component", () => {
  afterEach(cleanup);

  it("render child if not loading", () => {
    render(
      <Loading>
        <div data-testid="child"></div>
      </Loading>,
    );
    screen.getByTestId("child");
    const status = screen.queryByRole("status");

    expect(status).not.toBeInTheDocument();
  });

  it("render loading animation if loading", () => {
    render(
      <Loading isLoading={true}>
        <div data-testid="child"></div>
      </Loading>,
    );
    screen.getByRole("status");
  });

  it("render loading animation if no child", () => {
    render(<Loading />);
    const status = screen.queryByRole("status");

    expect(status).toBeInTheDocument();
  });
});
