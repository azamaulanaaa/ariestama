import { FormEvent } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import CompanyForm from ".";

describe("InsertCompanyForm Component", () => {
  afterEach(cleanup);

  it("render a complete form", () => {
    render(<CompanyForm />);

    const form = screen.getByTestId("CompanyForm");
    const button = within(form).getByRole("button");
    const name_input = within(form).getByLabelText(/Name/);
    const branch_input = within(form).getByLabelText(/Branch/);
    const address_input = within(form).getByLabelText(/Address/);
    const sub_district_input = within(form).getByLabelText(/Sub-District/);
    const city_input = within(form).getByLabelText(/City/);
    const province_input = within(form).getByLabelText(/Province/);
    const zip_code_input = within(form).getByLabelText(/Zip Code/);

    expect(button).toHaveTextContent("Submit");
    expect(name_input).toHaveDisplayValue("");
    expect(branch_input).toHaveDisplayValue("");
    expect(address_input).toHaveDisplayValue("");
    expect(sub_district_input).toHaveDisplayValue("");
    expect(city_input).toHaveDisplayValue("");
    expect(province_input).toHaveDisplayValue("");
    expect(zip_code_input).toHaveDisplayValue("");
  });

  it("call onSubmit function if submit button is clicked", async () => {
    const testdata = {
      data: {
        name: "NAME",
        branch: "branch",
        address: "address",
        sub_district: "subdistrict",
        city: "city",
        province: "province",
        zip_code: "1000",
      },
    };

    const handleSubmit = jest.fn();
    const handleSubmitWrapper = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      handleSubmit(data);
    };

    const user = UserEvent.setup();

    render(<CompanyForm onSubmit={handleSubmitWrapper} />);

    const form = screen.getByTestId("CompanyForm");
    const button = within(form).getByRole("button");
    const name_input = within(form).getByLabelText(/Name/);
    const branch_input = within(form).getByLabelText(/Branch/);
    const address_input = within(form).getByLabelText(/Address/);
    const sub_district_input = within(form).getByLabelText(/Sub-District/);
    const city_input = within(form).getByLabelText(/City/);
    const province_input = within(form).getByLabelText(/Province/);
    const zip_code_input = within(form).getByLabelText(/Zip Code/);

    await user.type(name_input, testdata.data.name);
    await user.type(branch_input, testdata.data.branch);
    await user.type(address_input, testdata.data.address);
    await user.type(sub_district_input, testdata.data.sub_district);
    await user.type(city_input, testdata.data.city);
    await user.type(province_input, testdata.data.province);
    await user.type(zip_code_input, testdata.data.zip_code);

    expect(handleSubmit).toHaveBeenCalledTimes(0);

    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledWith(testdata.data);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("name input cannot be empty", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const name_input = screen.getByLabelText(/Name/);

    expect(name_input).toBeInvalid();

    await user.type(name_input, "nama");

    expect(name_input).toBeValid();
  });

  it("branch input cannot be empty", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const branch_input = screen.getByLabelText(/Branch/);

    expect(branch_input).toBeInvalid();

    await user.type(branch_input, "cabang");

    expect(branch_input).toBeValid();
  });

  it("address input cannot be empty", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const address_input = screen.getByLabelText(/Address/);

    expect(address_input).toBeInvalid();

    await user.type(address_input, "alamat");

    expect(address_input).toBeValid();
  });

  it("sub_district input cannot be empty", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const sub_district_input = screen.getByLabelText(/Sub-District/);

    expect(sub_district_input).toBeInvalid();

    await user.type(sub_district_input, "kecamatan");

    expect(sub_district_input).toBeValid();
  });

  it("city input cannot be empty", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const city_input = screen.getByLabelText(/City/);

    expect(city_input).toBeInvalid();

    await user.type(city_input, "kabkota");

    expect(city_input).toBeValid();
  });

  it("province input cannot be empty", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const province_input = screen.getByLabelText(/Province/);

    expect(province_input).toBeInvalid();

    await user.type(province_input, "provinsi");

    expect(province_input).toBeValid();
  });

  it("zip code input cannot be empty", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const zip_code_input = screen.getByLabelText(/Zip Code/);

    expect(zip_code_input).toBeInvalid();

    await user.type(zip_code_input, "123");

    expect(zip_code_input).toBeValid();
  });

  it("zip code input must be a number", async () => {
    const user = UserEvent.setup();

    render(<CompanyForm />);

    const zip_code_input = screen.getByLabelText(/Zip Code/);

    expect(zip_code_input).toBeInvalid();

    await user.type(zip_code_input, "kodepos");

    expect(zip_code_input).toBeInvalid();

    await user.clear(zip_code_input);
    await user.type(zip_code_input, "60000");

    expect(zip_code_input).toBeValid();
  });

  it("have option to set default value", () => {
    const testdata = {
      defaultValue: {
        name: "NAME",
        branch: "branch",
        address: "address",
        sub_district: "subdistrict",
        city: "city",
        province: "province",
        zip_code: "1000",
      },
    };

    render(<CompanyForm defaultValue={testdata.defaultValue} />);

    const form = screen.getByTestId("CompanyForm");
    const name_input = within(form).getByLabelText(/Name/);
    const branch_input = within(form).getByLabelText(/Branch/);
    const address_input = within(form).getByLabelText(/Address/);
    const sub_district_input = within(form).getByLabelText(/Sub-District/);
    const city_input = within(form).getByLabelText(/City/);
    const province_input = within(form).getByLabelText(/Province/);
    const zip_code_input = within(form).getByLabelText(/Zip Code/);

    expect(name_input).toHaveDisplayValue(testdata.defaultValue.name);
    expect(branch_input).toHaveDisplayValue(testdata.defaultValue.branch);
    expect(address_input).toHaveDisplayValue(testdata.defaultValue.address);
    expect(sub_district_input).toHaveDisplayValue(
      testdata.defaultValue.sub_district,
    );
    expect(city_input).toHaveDisplayValue(testdata.defaultValue.city);
    expect(province_input).toHaveDisplayValue(testdata.defaultValue.province);
    expect(zip_code_input).toHaveDisplayValue(testdata.defaultValue.zip_code);
  });
});
