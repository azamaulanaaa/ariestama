import { cleanup, render, screen } from "@testing-library/react";

import CardHeader from ".";

jest.mock("material-ripple-effects", () => ({
  __esModule: true,
  default: () => ({
    create() {},
  }),
}));

describe("CardWidgetHeader Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("render default properly", async () => {
    const testdata = {
      data: {
        children: "children",
      },
    };

    render(<CardHeader {...testdata.data} />);
    const cardheader = screen.getByTestId("card-header");

    expect(cardheader).toHaveTextContent(testdata.data.children);
  });
});
