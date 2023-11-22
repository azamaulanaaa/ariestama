import { FormEvent } from "react";

export type InsertUnitData = {
  serial_number: string;
  series: string;
  brand: string;
  oem: string;
  yom: number;
  made_in: string;
};

export type InsertUnitFormProps = {
  onSubmit?: (data: InsertUnitData) => void;
  defaultValues?: InsertUnitData;
};

const InsertUnitForm = (props: InsertUnitFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!props.onSubmit) return;

    const form = event.currentTarget;
    const form_data = new FormData(form);

    const serial_number_form = form_data.get("serial_number");
    const series_form = form_data.get("series");
    const brand_form = form_data.get("brand");
    const oem_form = form_data.get("oem");
    const yom_form = form_data.get("yom");
    const made_in_form = form_data.get("made_in");

    if (
      !serial_number_form ||
      !series_form ||
      !brand_form ||
      !oem_form ||
      !yom_form ||
      !made_in_form
    )
      return;

    props.onSubmit({
      serial_number: serial_number_form.toString(),
      series: series_form.toString(),
      brand: brand_form.toString(),
      oem: oem_form.toString(),
      yom: Number(yom_form.toString()),
      made_in: made_in_form.toString(),
    });
  };

  return (
    <form role="form" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="serial_number" className="label">
            <span className="label-text">
              Serial Number<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="serial_number"
            name="serial_number"
            type="text"
            required
            defaultValue={props.defaultValues?.serial_number}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="series" className="label">
            <span className="label-text">
              Series<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="series"
            name="series"
            type="text"
            required
            defaultValue={props.defaultValues?.series}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="brand" className="brand">
            <span className="label-text">
              Brand<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            required
            defaultValue={props.defaultValues?.brand}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="oem" className="label">
            <span className="label-text">
              Original Equipment Manufacture
              <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="oem"
            name="oem"
            type="text"
            required
            defaultValue={props.defaultValues?.oem}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="yom" className="label">
            <span className="label-text">
              Year of Manufacture<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="yom"
            name="yom"
            type="number"
            required
            defaultValue={props.defaultValues?.yom}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="made_in" className="label">
            <span className="label-text">
              Made In<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="made_in"
            name="made_in"
            type="text"
            required
            defaultValue={props.defaultValues?.made_in}
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

export default InsertUnitForm;
