import { cleanup, render, screen } from "@testing-library/react";

import DenseDisplay, { DenseDisplayProps } from ".";

describe("DenseDisplay Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("render all fields for row variant", () => {
    const testdata: DenseDisplayProps<string> = {
      variant: "row",
      data: {
        key1: "key11",
        key2: "key22",
        "key 3": "key33",
      },
    };

    render(<DenseDisplay {...testdata} />);
    const keys = screen.getAllByTestId("key");
    const values = screen.getAllByTestId("value");

    Object.entries(testdata.data).forEach(([key, value], index) => {
      expect(keys[index]).toHaveTextContent(key);
      expect(values[index]).toHaveTextContent(String(value));
    });
  });

  it("render all fields for column variant", () => {
    const testdata: DenseDisplayProps<string> = {
      variant: "column",
      data: {
        key1: "key11",
        key2: "key22",
        "key 3": "key33",
      },
    };

    render(<DenseDisplay {...testdata} />);
    const keys = screen.getAllByTestId("key");
    const values = screen.getAllByTestId("value");

    Object.entries(testdata.data).forEach(([key, value], index) => {
      expect(keys[index]).toHaveTextContent(key);
      expect(values[index]).toHaveTextContent(String(value));
    });
  });
});
