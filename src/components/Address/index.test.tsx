import { cleanup, render, screen } from "@testing-library/react";
import Address from ".";

describe("Address Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("render simple data", () => {
    const testdata = {
      data: {
        address: "address",
        sub_district: "sub_district",
        city: "city",
        province: "province",
        zip_code: 10000,
      },
    };

    render(<Address {...testdata.data} />);

    const address = screen.queryByText(testdata.data.address);
    const sub_district = screen.queryByText(testdata.data.sub_district, {
      exact: false,
    });
    const city = screen.queryByText(testdata.data.city, { exact: false });
    const province = screen.queryByText(testdata.data.province, {
      exact: false,
    });
    const zip_code = screen.queryByText(String(testdata.data.zip_code), {
      exact: false,
    });

    expect(address).toBeInTheDocument();
    expect(sub_district).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(province).toBeInTheDocument();
    expect(zip_code).toBeInTheDocument();
  });

  it("replace coma on address with new line", () => {
    const testdata = {
      data: {
        address: "add, ress",
        sub_district: "sub_district",
        city: "city",
        province: "province",
        zip_code: 10000,
      },
      new_address: "add\\sress",
    };

    render(<Address {...testdata.data} />);

    const address = screen.queryByText(new RegExp(testdata.new_address));
    const sub_district = screen.queryByText(testdata.data.sub_district, {
      exact: false,
    });
    const city = screen.queryByText(testdata.data.city, { exact: false });
    const province = screen.queryByText(testdata.data.province, {
      exact: false,
    });
    const zip_code = screen.queryByText(String(testdata.data.zip_code), {
      exact: false,
    });

    expect(address).toBeInTheDocument();
    expect(sub_district).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(province).toBeInTheDocument();
    expect(zip_code).toBeInTheDocument();
  });
});
