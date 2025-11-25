import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Boiler } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.ts";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type BoilerShellFireTubeThicknessProps = {
  className?: string;
  locale: string;
};

const BoilerShellFireTubeThicknessPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<BoilerShellFireTubeThicknessProps>;

export const BoilerShellFireTubeThickness = (
  props: BoilerShellFireTubeThicknessProps,
) => {
  const zProps = BoilerShellFireTubeThicknessPropsSchema.parse(props);

  const [standart, setStandart] = useState("grondslagen");
  const [pressureRef, pressure, pressureError] = useNumber(zProps.locale);
  const [diameterRef, diameter, diameterError] = useNumber(
    zProps.locale,
  );
  const [
    weldJointEfficiencyRef,
    weldJointEfficiency,
    weldJointEfficiencyError,
  ] = useNumber(
    zProps.locale,
  );
  const [
    shellReductionFactorRef,
    shellReductionFactor,
    shellReductionFactorError,
  ] = useNumber(
    zProps.locale,
  );
  const [constantCRef, constantC, constantCError] = useNumber(
    zProps.locale,
  );
  const [temperatureRef, temperature, temperatureError] = useNumber(
    zProps.locale,
  );
  const [yieldStrengthRef, yieldStrength, yieldStrengthError] = useNumber(
    zProps.locale,
  );
  const [corrosionAllowanceRef, corrosionAllowance, corrosionAllowanceError] =
    useNumber(zProps.locale);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [
    standart,
    pressure,
    diameter,
    weldJointEfficiency,
    shellReductionFactor,
    constantC,
    temperature,
    yieldStrength,
    corrosionAllowance,
  ]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const temperatureFactor = useMemo(() => {
    try {
      return Boiler.temperatureFactor_Grondslagen(
        temperature,
      );
    } catch {
      return NaN;
    }
  }, [temperature]);

  const correctedYieldStrength = useMemo(() => {
    try {
      return Boiler.correctedYieldStrength_Grondslagen(
        temperatureFactor,
        yieldStrength,
      );
    } catch {
      return NaN;
    }
  }, [temperatureFactor, yieldStrength]);

  const minShellFireTubeThickness = useMemo(() => {
    try {
      return Boiler.minShellFireTubeThickness_Grondslagen(
        pressure,
        diameter,
        weldJointEfficiency,
        shellReductionFactor,
        constantC,
        correctedYieldStrength,
        corrosionAllowance,
      );
    } catch {
      return NaN;
    }
  }, [
    pressure,
    diameter,
    weldJointEfficiency,
    shellReductionFactor,
    constantC,
    correctedYieldStrength,
    corrosionAllowance,
  ]);

  return (
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Boiler - Shell Fire Tube Thickness</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Standart</legend>
          <select
            className="select w-full text-right"
            value={standart}
            onChange={(e) => {
              setStandart(e.target.value);
            }}
          >
            <option value="grondslagen">Grondslagen</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black dark:text-white">Pressure</label>
          <label
            className={cn("input w-full", {
              "input-error": pressureError != null,
            })}
          >
            <input
              ref={pressureRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Weld Joint Efficiency
          </label>
          <input
            ref={weldJointEfficiencyRef}
            className={cn("input w-full text-right", {
              "input-error": weldJointEfficiencyError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black dark:text-white">
            Shell Reduction Factor
          </label>
          <input
            ref={shellReductionFactorRef}
            className={cn("input w-full text-right", {
              "input-error": shellReductionFactorError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black dark:text-white">Constant C</label>
          <input
            ref={constantCRef}
            className={cn("input w-full text-right", {
              "input-error": constantCError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black dark:text-white">
            Temperature
          </label>
          <label
            className={cn("input w-full", {
              "input-error": temperatureError != null,
            })}
          >
            <input
              ref={temperatureRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\degree\mathrm{C}" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Yield Strength
          </label>
          <label
            className={cn("input w-full", {
              "input-error": yieldStrengthError != null,
            })}
          >
            <input
              ref={yieldStrengthRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Corrosion Allowance
          </label>
          <label
            className={cn("input w-full", {
              "input-error": corrosionAllowanceError != null,
            })}
          >
            <input
              ref={corrosionAllowanceRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Diameter
          </label>
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
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Diameter Type
          </label>
          <select className="select w-full text-right">
            <option>Inner</option>
            <option>Outter</option>
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
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Result</legend>
          <label className="label text-black dark:text-white">
            Minimum Thickness
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(minShellFireTubeThickness)}
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
