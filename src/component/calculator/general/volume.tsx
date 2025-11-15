import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";

import { General } from "@/util/calculation.ts";
import { cn } from "@/util/classname.tsx";
import { useNumber } from "@/hook/useNumber.tsx";

const convert = configureMeasurements(allMeasures);

const VolumePropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type VolumeProps = z.input<typeof VolumePropsSchema>;

export const Volume = (props: VolumeProps) => {
  const zProps = VolumePropsSchema.parse(props);

  const [shape, setShape] = useState("cylinder");
  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [heightRef, height, heightError] = useNumber(zProps.locale);
  const [widthRef, width, widthError] = useNumber(zProps.locale);
  const [lengthRef, length, lengthError] = useNumber(zProps.locale);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [shape, diameter, height, width, length]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const volume = useMemo(() => {
    try {
      if (shape == "cylinder") {
        return convert(General.volumeCylinder(diameter, height))
          .from("m3")
          .to("l");
      } else if (shape == "cuboid") {
        return General.volumeCuboid(height, width, length);
      }

      return NaN;
    } catch {
      return NaN;
    }
  }, [shape, diameter, height, width, length]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <div className="divider">Reservoir</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Shape</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={shape}
          onChange={(e) => {
            setShape(e.target.value);
          }}
        >
          <option value="cylinder">Cylinder</option>
          <option value="cuboid">Cuboid</option>
        </select>
      </label>
      <label
        className={cn("form-control w-full", {
          hidden: shape != "cylinder",
        })}
      >
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={diameterRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": diameterError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={cn("form-control w-full", {
          hidden: shape != "cylinder" && shape != "cuboid",
        })}
      >
        <div className="label">
          <span className="label-text">Height</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={heightRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": heightError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={cn("form-control w-full", {
          hidden: shape != "cuboid",
        })}
      >
        <div className="label">
          <span className="label-text">Width</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={widthRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": widthError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={cn("form-control w-full", {
          hidden: shape != "cuboid",
        })}
      >
        <div className="label">
          <span className="label-text">Length</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={lengthRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": lengthError != null,
          })}
          placeholder="0"
        />
      </label>
      <div className="divider">Note</div>
      <label className="form-control w-full">
        <textarea
          className={cn("textarea textarea-bordered h-24", {
            "textarea-error": edited,
          })}
          onClick={handleNoteClick}
        >
        </textarea>
      </label>
      <h2>Result</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Volume</span>
          <span className="label-text-alt">meter cubic</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(volume)}
        />
      </label>
    </form>
  );
};
