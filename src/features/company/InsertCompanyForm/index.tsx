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
      <div className="grid md:grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">
              Name<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            onChange={handleNameChange}
            value={name}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="branch" className="label">
            <span className="label-text">
              Branch<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="branch"
            name="branch"
            type="text"
            required
            defaultValue={props.defaultValues?.branch}
            className="input input-bordered"
          />
        </div>
        <div className="form-control md:col-span-2">
          <label htmlFor="address" className="label">
            <span className="label-text">
              Address<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="address"
            name="address"
            type="address"
            required
            defaultValue={props.defaultValues?.address}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="subdistrict" className="label">
            <span className="label-text">
              Sub-District<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="subdistrict"
            name="subdistrict"
            type="text"
            required
            defaultValue={props.defaultValues?.sub_district}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="city" className="label">
            <span className="label-text">
              City<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            defaultValue={props.defaultValues?.city}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="province" className="label">
            <span className="label-text">
              Province<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="province"
            name="province"
            type="text"
            required
            defaultValue={props.defaultValues?.province}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="zipcode" className="label">
            <span className="label-text">
              Zip Code<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="zipcode"
            name="zipcode"
            type="number"
            required
            defaultValue={props.defaultValues?.zip_code}
            className="input input-bordered"
          />
        </div>
        <button type="submit" className="btn btn-block md:col-span-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default InsertCompanyForm;
