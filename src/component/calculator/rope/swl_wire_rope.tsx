import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";

import { General, Rope } from "@/util/calculation.ts";
import { cn } from "@/util/classname.tsx";
import { useNumber } from "@/hook/useNumber.tsx";

const convert = configureMeasurements(allMeasures);

const SwlWireRopePropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type SwlWireRopeProps = {
  locale?: string;
};

export const SwlWireRope = (props: SwlWireRopeProps) => {
  const zProps = SwlWireRopePropsSchema.parse(props);

  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [reavingNumberRef, reavingNumber, reavingNumberError] = useNumber(
    props.locale,
  );
  const [grade, setGrade] = useState(1770);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [diameter, reavingNumber, grade]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const swlSling = useMemo(() => {
    try {
      return Rope.swlWireSling(convert(diameter).from("mm").to("in"), grade);
    } catch {
      return NaN;
    }
  }, [diameter, grade]);

  const breakingStrenghSling = useMemo(() => {
    try {
      return General.breakingStrength(swlSling, Rope.SafetyFactor.wire_sling);
    } catch {
      return NaN;
    }
  }, [swlSling]);

  const swlRunning = useMemo(() => {
    try {
      return Rope.swlWireRunning(
        convert(diameter).from("mm").to("in"),
        reavingNumber,
        grade,
      );
    } catch {
      return NaN;
    }
  }, [diameter, reavingNumber, grade]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={diameterRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": diameterError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Reaving</span>
        </div>
        <input
          ref={reavingNumberRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": reavingNumberError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Grade</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={grade}
          onChange={(e) => {
            setGrade(parseFloat(e.target.value));
          }}
        >
          <option value="1770">1770</option>
        </select>
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
      <div className="divider">Wire Rope Sling</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Safety Working Load (SWL)</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(swlSling)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Breaking Strength</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(breakingStrenghSling)}
        />
      </label>
      <div className="divider">Running Wire Rope</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Safety Working Load (SWL)</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(swlRunning)}
        />
      </label>
    </form>
  );
};
