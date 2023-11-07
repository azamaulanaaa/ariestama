import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompaniesTable from ".";

describe("Companies Table Component", () => {
  const user = userEvent.setup();
  afterEach(() => {
    cleanup();
  });

  it("render header data properly", () => {
    const headers = {
      name: "Name",
      branch: "Branch",
      city: "City",
      province: "Province",
    };

    render(<CompaniesTable items={[]} />);

    const colHeaders = screen.getAllByRole("columnheader");
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
      },
      {
        id: "id 2",
        name: "Nama 2",
        branch: "Cabang 2",
        city: "Kab. / Kota 2",
        province: "Provinsi 2",
      },
    ];

    render(<CompaniesTable items={items} />);

    screen.getByRole("table");
    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(items.length + 1);
    items.forEach((item, index) => {
      const row = rows[index + 1];
      expect(row).toHaveTextContent(item.name);
      expect(row).toHaveTextContent(item.branch);
      expect(row).toHaveTextContent(item.city);
      expect(row).toHaveTextContent(item.province);
    });
  });

  it("call onCilck for item clicked", async () => {
    const handleClick = jest.fn();
    const items = [
      {
        id: "id 1",
        name: "Nama 1",
        branch: "Cabang 1",
        city: "Kab. / Kota 1",
        province: "Provinsi 1",
      },
      {
        id: "id 2",
        name: "Nama 2",
        branch: "Cabang 2",
        city: "Kab. / Kota 2",
        province: "Provinsi 2",
      },
    ];

    render(<CompaniesTable items={items} />);
    const rows = screen.getAllByRole("row");

    items.forEach(async (item, index) => {
      const row = rows[index + 1];

      await user.click(row);
      expect(handleClick).toHaveBeenCalledWith(item);
    });
  });
});
