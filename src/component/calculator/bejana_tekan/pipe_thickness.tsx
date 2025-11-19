import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";

import { cn } from "@/util/classname.ts";
import { BejanaTekan } from "@/util/calculator/mod.ts";
import { useNumber } from "@/hook/useNumber.tsx";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "../../card/calculator/mod.tsx";

const convert = configureMeasurements(allMeasures);

export enum PipeThicknessStandart {
  asme_b31_1 = "ASME B31.1",
}

/**
 * @property {string} locale - number formating, default is en-US
 */
export type PipeThicknessProps = {
  locale: string;
  className?: string;
};

const PipeThicknessPropsSchema = z.object({
  locale: z.string(),
  className: z.string().optional(),
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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Bejana Tekan - Pipe Thickness</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Standart</legend>
          <select
            className="select w-full text-right"
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
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">
            Maximum Allowable Working Preasure
          </label>
          <label
            className={cn("input w-full", {
              "input-error": mawpError != null,
            })}
          >
            <input
              ref={mawpRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{psig}" />
            </span>
          </label>
          <label className="label text-black">
            Outer Diameter
          </label>
          <label
            className={cn("input w-full", {
              "input-error": outerDiameterError != null,
            })}
          >
            <input
              ref={outerDiameterRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{inch}" />
            </span>
          </label>
          <label className="label text-black">
            Maximum Allowable Stress Relative to Weld Joint Efficiency Factor
          </label>
          <label
            className={cn("input w-full", {
              "input-error":
                maximumAllowableStressRelativeToWeldJoinEfficiencyError != null,
            })}
          >
            <input
              ref={maximumAllowableStressRelativeToWeldJoinEfficiencyRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{psi}" />
            </span>
          </label>
          <label className="label text-black">
            Weld Strength Reduction Factor
          </label>
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
          <label className="label text-black">
            Coefficient
          </label>
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
          <label className="label text-black">
            Additional Thickness
          </label>
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
            <span className="label text-black">
              <InlineMath math="\mathrm{inch}" />
            </span>
          </label>
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
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Result</legend>
          <label className="label text-black">Minimum Thickness</label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(minPipeThickness)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{inch}" />
            </span>
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(minPipeThickness_mm)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
