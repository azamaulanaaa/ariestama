import { cleanup, render, screen } from "@testing-library/react";

import DenseDisplay, { DenseDisplayProps } from ".";

describe("DenseDisplay Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("render all fields for column variant", () => {
    const testdata: DenseDisplayProps = {
      keys: {
        key1: "key1",
        key2: "key2",
        key3: "key 3",
      },
      values: {
        key1: "key11",
        key2: "key22",
        key3: "key33",
      },
    };

    render(<DenseDisplay {...testdata} />);

    Object.keys(testdata.keys).forEach((key) => {
      const key_tag = screen.getByTestId("key_" + key);
      const value_tag = screen.getByTestId("value_" + key);

      expect(key_tag).toHaveTextContent(String(testdata.keys[key]));
      expect(value_tag).toHaveTextContent(String(testdata.values[key]));
    });
  });
});
