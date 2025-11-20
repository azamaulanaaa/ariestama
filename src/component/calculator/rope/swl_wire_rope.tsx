import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";
import { InlineMath } from "react-katex";

import { General, Rope } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

const convert = configureMeasurements(allMeasures);

export type RopeSWLWireRopeProps = {
  className?: string;
  locale: string;
};

const RopeSwlWireRopePropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<RopeSWLWireRopeProps>;

export const RopeSWLWireRope = (props: RopeSWLWireRopeProps) => {
  const zProps = RopeSwlWireRopePropsSchema.parse(props);

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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Rope - Swl Wire Rope</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Diameter</label>
          <label
            className={cn("input w-full", {
              "input-error": diameterError != null,
            })}
          >
            <input
              ref={diameterRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black">Reaving</label>
          <input
            ref={reavingNumberRef}
            className={cn("input w-full text-right", {
              "input-error": reavingNumberError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black">Grade</label>
          <select
            className="select w-full text-right"
            value={grade}
            onChange={(e) => {
              setGrade(parseFloat(e.target.value));
            }}
          >
            <option value="1770">1770</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Note</legend>
          <textarea
            className={cn("textarea h-24 w-full", {
              "textarea-error": edited,
            })}
            onClick={handleNoteClick}
          >
          </textarea>
        </fieldset>
        <legend className="fieldset-legend">Result</legend>
        <fieldset className="fieldset">
          <label className="label text-black">
            Wire Rope Sling - Safety Working Load (SWL)
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(swlSling)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{ton}" />
            </span>
          </label>
          <label className="label text-black">
            Wire Rope Sling - Breaking Strength
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(breakingStrenghSling)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{ton}" />
            </span>
          </label>
          <label className="label text-black">
            Running Wire Rope - Safety Working Load (SWL)
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(swlRunning)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{ton}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
