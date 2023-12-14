import { cleanup, render, screen, within } from "@testing-library/react";
import CompaniesTable from ".";

describe("Companies Table Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("render header data properly", () => {
    const headers = {
      name: "Name",
      branch: "Branch",
      city: "City",
      province: "Province",
      view_url: "",
    };

    render(<CompaniesTable items={[]} />);

    const table = screen.getByTestId("CompaniesTable");
    const colHeaders = within(table).getAllByRole("columnheader");

    Object.entries(headers).forEach(([_, value], index) => {
      expect(colHeaders[index]).toHaveTextContent(value);
    });
  });

  it("render items data properly", () => {
    const items = [
      {
        id: "id 1",
        name: "Nama 1",
        branch: "Cabang 1",
        city: "Kab. / Kota 1",
        province: "Provinsi 1",
        view_url: "1",
      },
      {
        id: "id 2",
        name: "Nama 2",
        branch: "Cabang 2",
        city: "Kab. / Kota 2",
        province: "Provinsi 2",
        view_url: "2",
      },
    ];

    render(<CompaniesTable items={items} />);

    const table = screen.getByTestId("CompaniesTable");
    const rows = within(table).getAllByRole("row");

    expect(rows).toHaveLength(items.length + 1);
    items.forEach((item, index) => {
      const row = rows[index + 1];
      const button = within(row).getByRole("link");

      expect(row).toHaveTextContent(item.name);
      expect(row).toHaveTextContent(item.branch);
      expect(row).toHaveTextContent(item.city);
      expect(row).toHaveTextContent(item.province);
      expect(button).toHaveAttribute("href", item.view_url);
    });
  });
});
