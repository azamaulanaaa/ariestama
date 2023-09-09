import { Button, Input } from "@material-tailwind/react";
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
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="serial_number"
          name="serial_number"
          type="text"
          label="Serial Number"
          labelProps={{ htmlFor: "serial_number" }}
          required
        />
        <Input
          id="series"
          name="series"
          type="text"
          label="Series"
          labelProps={{ htmlFor: "series" }}
          required
        />
        <Input
          id="brand"
          name="brand"
          type="text"
          label="Brand"
          labelProps={{ htmlFor: "brand" }}
          required
        />
        <Input
          id="oem"
          name="oem"
          type="text"
          label="Original Equipment Manufacture"
          labelProps={{ htmlFor: "oem" }}
          required
        />
        <Input
          id="yom"
          name="yom"
          type="number"
          label="Year of Manufacture"
          labelProps={{ htmlFor: "yom" }}
          required
        />
        <Input
          id="made_in"
          name="made_in"
          type="text"
          label="Made In"
          labelProps={{ htmlFor: "made_in" }}
          required
        />
        <Button type="submit" variant="gradient" className="col-span-2">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default InsertUnitForm;
