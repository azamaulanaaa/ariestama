import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";
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
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Shape</legend>
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
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "cylinder",
        })}
      >
        <legend className="fieldset-legend">Diameter</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": diameterError != null,
          })}
        >
          <input
            ref={diameterRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Height</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": heightError != null,
          })}
        >
          <input
            ref={heightRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "cuboid",
        })}
      >
        <legend className="fieldset-legend">Width</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": widthError != null,
          })}
        >
          <input
            ref={widthRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "cuboid",
        })}
      >
        <legend className="fieldset-legend">Length</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": lengthError != null,
          })}
        >
          <input
            ref={lengthRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <div className="divider">Note</div>
      <textarea
        className={cn("textarea textarea-bordered h-24 w-full", {
          "textarea-error": edited,
        })}
        onClick={handleNoteClick}
      >
      </textarea>
      <h2>Result</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Volume</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(volume)}
          />
          <span className="label">
            <InlineMath math="\mathrm{m}^3" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
