import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";

import { cn } from "@/util/classname.ts";
import { BejanaTekan } from "@/util/calculator/mod.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const convert = configureMeasurements(allMeasures);

export enum PipeThicknessStandart {
  asme_b31_1 = "ASME B31.1",
}

/**
 * @property {string} locale - number formating, default is en-US
 */
export type PipeThicknessProps = {
  locale: string;
};

const PipeThicknessPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
}) as z.ZodType<PipeThicknessProps>;

export const PipeThickness = (props: PipeThicknessProps) => {
  const zProps = PipeThicknessPropsSchema.parse(props);

  const [standart, setStandart] = useState(PipeThicknessStandart.asme_b31_1);
  const [mawpRef, mawp, mawpError] = useNumber(zProps.locale);
  const [outerDiameterRef, outerDiameter, outerDiameterError] = useNumber(
    zProps.locale,
  );
  const [
    maximumAllowableStressRelativeToWeldJoinEfficiencyRef,
    maximumAllowableStressRelativeToWeldJoinEfficiency,
    maximumAllowableStressRelativeToWeldJoinEfficiencyError,
  ] = useNumber(
    zProps.locale,
  );
  const [
    weldStrengthReductionFactorRef,
    weldStrengthReductionFactor,
    weldStrengthReductionFactorError,
  ] = useNumber(zProps.locale);
  const [coefficientRef, coefficient, coefficientError] = useNumber(
    zProps.locale,
  );
  const [
    additionalThicknessRef,
    additionalThickness,
    additionalThicknessError,
  ] = useNumber(zProps.locale);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [
    standart,
    mawp,
    outerDiameter,
    maximumAllowableStressRelativeToWeldJoinEfficiency,
    weldStrengthReductionFactor,
    coefficient,
    additionalThickness,
  ]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const minPipeThickness = useMemo(() => {
    try {
      switch (standart) {
        case PipeThicknessStandart.asme_b31_1:
          return BejanaTekan.minPipeThickness_ASME_B3_1({
            P: mawp,
            D: outerDiameter,
            SE: maximumAllowableStressRelativeToWeldJoinEfficiency,
            W: weldStrengthReductionFactor,
            y: coefficient,
            A: additionalThickness,
          } as BejanaTekan.MinPipeThicknessParams_ASME_B31_1);
        default:
          return NaN;
      }
    } catch {
      return NaN;
    }
  }, [
    standart,
    mawp,
    outerDiameter,
    maximumAllowableStressRelativeToWeldJoinEfficiency,
    weldStrengthReductionFactor,
    coefficient,
    additionalThickness,
  ]);

  const minPipeThickness_mm = useMemo(
    () => {
      if (Number.isNaN(minPipeThickness)) return NaN;
      return convert(minPipeThickness).from("in").to("mm");
    },
    [minPipeThickness],
  );

  return (
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Standart</legend>
        <select
          className="select select-bordered w-full text-right"
          value={standart}
          onChange={(e) => {
            setStandart(e.target.value as PipeThicknessStandart);
          }}
        >
          {Object.values(PipeThicknessStandart).sort().map((value, index) => (
            <option key={index} value={value}>{value}</option>
          ))}
        </select>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Maximum Allowable Working Preasure
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": mawpError != null,
          })}
        >
          <input
            ref={mawpRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{psig}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Outer Diameter
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": outerDiameterError != null,
          })}
        >
          <input
            ref={outerDiameterRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{inch}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Maximum Allowable Stress Relative to Weld Joint Efficiency Factor
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error":
              maximumAllowableStressRelativeToWeldJoinEfficiencyError != null,
          })}
        >
          <input
            ref={maximumAllowableStressRelativeToWeldJoinEfficiencyRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{psi}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Weld Strength Reduction factor
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": weldStrengthReductionFactorError != null,
          })}
        >
          <input
            ref={weldStrengthReductionFactorRef}
            className="text-right"
            placeholder="0"
          />
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Coefficient
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": coefficientError != null,
          })}
        >
          <input
            ref={coefficientRef}
            className="text-right"
            placeholder="0"
          />
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Additional Thickness
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": additionalThicknessError != null,
          })}
        >
          <input
            ref={additionalThicknessRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{inch}" />
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
        <legend className="fieldset-legend">Minimum Thickness</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(minPipeThickness)}
          />
          <span className="label">
            <InlineMath math="\mathrm{inch}" />
          </span>
        </label>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(minPipeThickness_mm)}
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
