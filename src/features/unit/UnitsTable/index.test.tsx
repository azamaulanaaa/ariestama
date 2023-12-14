import { cleanup, render, screen, within } from "@testing-library/react";
import UnitsTable from ".";

describe("Units Table Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("render table with header", () => {
    const testdata = {
      headers: {
        serial_number: "Serial Number",
        Series: "Series",
        brand: "Brand",
        yom: "Year of Manufacture",
        made_in: "Made In",
        view_url: "",
      },
    };

    render(<UnitsTable items={[]} />);

    const table = screen.queryByRole("table");
    const colHeaders = screen.queryAllByRole("columnheader");

    expect(table).toBeInTheDocument();
    Object.values(testdata.headers).forEach((value, index) => {
      expect(colHeaders[index]).toBeInTheDocument();
      expect(colHeaders[index]).toHaveTextContent(value);
    });
  });

  it("render items data properly", () => {
    const testdata = {
      items: [
        {
          id: "id 1",
          serial_number: "000",
          series: "Series 0",
          brand: "Merek 0",
          yom: 2000,
          made_in: "Negara Pembuat 0",
          view_url: "1",
        },
        {
          id: "id 2",
          serial_number: "001",
          series: "Series 1",
          brand: "Merek 1",
          yom: 2000,
          made_in: "Negara Pembuat 1",
          view_url: "2",
        },
      ],
    };

    render(<UnitsTable items={testdata.items} />);

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(testdata.items.length + 1);
    testdata.items.forEach((item, index) => {
      const row = rows[index + 1];
      const button = within(row).getByRole("link");

      expect(row).toHaveTextContent(item.serial_number);
      expect(row).toHaveTextContent(item.brand);
      expect(row).toHaveTextContent(item.series);
      expect(row).toHaveTextContent(String(item.yom));
      expect(row).toHaveTextContent(item.made_in);
      expect(button).toHaveAttribute("href", item.view_url);
    });
  });
});
