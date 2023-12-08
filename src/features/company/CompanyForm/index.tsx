import { HTMLAttributes } from "react";

type BaseFormProps = Omit<
  HTMLAttributes<HTMLFormElement>,
  "children" | "defaultValue"
>;

export type CompanyFormProps = BaseFormProps & {
  defaultValue?: {
    name?: string;
    branch?: string;
    address?: string;
    district?: string;
    city?: string;
    province?: string;
    zip_code?: string;
  };
};

const CompanyForm = (props: CompanyFormProps) => {
  const { defaultValue: defaultValues, ...formProps } = props;

  return (
    <form data-testid="CompanyForm" role="form" {...formProps}>
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
            defaultValue={defaultValues?.name}
            required
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
            defaultValue={defaultValues?.branch}
            required
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
            defaultValue={defaultValues?.address}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="district" className="label">
            <span className="label-text">
              District<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="district"
            name="district"
            type="text"
            defaultValue={defaultValues?.district}
            required
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
            defaultValue={defaultValues?.city}
            required
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
            defaultValue={defaultValues?.province}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="zip_code" className="label">
            <span className="label-text">
              Zip Code<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="zip_code"
            name="zip_code"
            type="number"
            defaultValue={props.defaultValue?.zip_code}
            required
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

export default CompanyForm;
