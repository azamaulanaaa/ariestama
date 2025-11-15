import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";
import { InlineMath } from "react-katex";

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
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
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
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Reaving</legend>
        <input
          ref={reavingNumberRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": reavingNumberError != null,
          })}
          placeholder="0"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Grade</legend>
        <select
          className="select select-bordered w-full text-right"
          value={grade}
          onChange={(e) => {
            setGrade(parseFloat(e.target.value));
          }}
        >
          <option value="1770">1770</option>
        </select>
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
      <div className="divider">Wire Rope Sling</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Safety Working Load (SWL)</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(swlSling)}
          />
          <span className="label">
            <InlineMath math="\mathrm{ton}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Breaking Strength</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(breakingStrenghSling)}
          />
          <span className="label">
            <InlineMath math="\mathrm{ton}" />
          </span>
        </label>
      </fieldset>
      <div className="divider">Running Wire Rope</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Safety Working Load (SWL)</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(swlRunning)}
          />
          <span className="label">
            <InlineMath math="\mathrm{ton}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
