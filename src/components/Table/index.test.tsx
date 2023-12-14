import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Table from ".";

describe("Table Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("render table with given headers", () => {
    const testdata = {
      headers: {
        data1: "header1",
        data2: "header2",
        data3: "header3",
      },
    };

    render(<Table headers={testdata.headers} items={[]} />);

    const table = screen.queryByRole("table");
    const colHeaders = screen.queryAllByRole("columnheader");

    expect(table).toBeInTheDocument();
    Object.values(testdata.headers).forEach((value, index) => {
      const colHeader = colHeaders[index];
      expect(colHeader).toBeInTheDocument();
      expect(colHeader).toHaveTextContent(value);
    });
  });

  it("render items for table", () => {
    const testdata = {
      headers: {
        data1: "header1",
        data2: "header2",
        data3: "header3",
      },
      items: [
        {
          data1: "data1",
          data2: "data2",
          data3: "data3",
        },
        {
          data1: "data4",
          data2: "data5",
          data3: "data6",
        },
      ],
    };

    render(<Table headers={testdata.headers} items={testdata.items} />);

    const rows = screen.getAllByRole("row");

    testdata.items.forEach((item, index) => {
      const row = rows[index + 1];
      Object.values(item).forEach((value) => {
        expect(row).toHaveTextContent(value);
      });
    });
  });

  it("render only item value that have key matchs header key", () => {
    const testdata = {
      headers: {
        data1: "header1",
        data3: "header3",
      },
      items: [
        {
          data1: "data1",
          data2: "data2",
          data3: "data3",
        },
        {
          data1: "data4",
          data2: "data5",
          data3: "data6",
        },
      ],
    };

    render(<Table headers={testdata.headers} items={testdata.items} />);

    const rows = screen.getAllByRole("row");

    testdata.items.forEach((item, index) => {
      const row = rows[index + 1];
      expect(row).toHaveTextContent(item.data1);
      expect(row).not.toHaveTextContent(item.data2);
      expect(row).toHaveTextContent(item.data3);
    });
  });
});
