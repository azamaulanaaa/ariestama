import { Button, Input } from "@material-tailwind/react";
import { FormEvent, ChangeEvent, useState, useEffect } from "react";

export type InsertCompanyData = {
  name: string;
  branch: string;
  address: string;
  sub_district: string;
  city: string;
  province: string;
  zip_code: number;
};

export type InsertCompanyFormProps = {
  onSubmit?: (data: InsertCompanyData) => void;
  defaultValues?: InsertCompanyData;
};

const InsertCompanyForm = (props: InsertCompanyFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!props.onSubmit) return;

    const form = event.currentTarget;
    const form_data = new FormData(form);

    const name_form = form_data.get("name");
    const branch_form = form_data.get("branch");
    const address_form = form_data.get("address");
    const subdistrict_form = form_data.get("subdistrict");
    const city_form = form_data.get("city");
    const province_form = form_data.get("province");
    const zipcode_form = form_data.get("zipcode");

    if (
      !name_form ||
      !branch_form ||
      !address_form ||
      !subdistrict_form ||
      !city_form ||
      !province_form ||
      !zipcode_form
    )
      return;

    props.onSubmit({
      name: name_form.toString(),
      branch: branch_form.toString(),
      address: address_form.toString(),
      sub_district: subdistrict_form.toString(),
      city: city_form.toString(),
      province: province_form.toString(),
      zip_code: Number(zipcode_form.toString()),
    });
  };

  const [name, setName] = useState<string>("");
  useEffect(() => {
    if (props.defaultValues) {
      setName(props.defaultValues.name);
    }
  }, [props.defaultValues]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.toUpperCase());
  };

  return (
    <form data-testid="InsertCompanyForm" role="form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="name"
          name="name"
          type="text"
          label="Name"
          labelProps={{ htmlFor: "name" }}
          required
          onChange={handleNameChange}
          value={name}
        />
        <Input
          id="branch"
          name="branch"
          type="text"
          label="Branch"
          labelProps={{ htmlFor: "branch" }}
          required
          defaultValue={props.defaultValues?.branch}
        />
        <div className="col-span-2">
          <Input
            id="address"
            name="address"
            type="address"
            label="Address"
            labelProps={{ htmlFor: "address" }}
            required
            defaultValue={props.defaultValues?.address}
          />
        </div>
        <Input
          id="subdistrict"
          name="subdistrict"
          type="text"
          label="Sub-District"
          labelProps={{ htmlFor: "subdistrict" }}
          required
          defaultValue={props.defaultValues?.sub_district}
        />
        <Input
          id="city"
          name="city"
          type="text"
          label="City"
          labelProps={{ htmlFor: "city" }}
          required
          defaultValue={props.defaultValues?.city}
        />
        <Input
          id="province"
          name="province"
          type="text"
          label="Province"
          labelProps={{ htmlFor: "province" }}
          required
          defaultValue={props.defaultValues?.province}
        />
        <Input
          id="zipcode"
          name="zipcode"
          type="number"
          label="Zip Code"
          labelProps={{ htmlFor: "zipcode" }}
          required
          defaultValue={props.defaultValues?.zip_code}
        />
        <Button type="submit" variant="gradient" className="col-span-2">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default InsertCompanyForm;
