import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Boiler } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const ShellFireTubeThicknessPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type ShellFireTubeThicknessProps = z.input<
  typeof ShellFireTubeThicknessPropsSchema
>;

export const ShellFireTubeThickness = (props: ShellFireTubeThicknessProps) => {
  const zProps = ShellFireTubeThicknessPropsSchema.parse(props);

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
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Standart</legend>
        <select
          className="select select-bordered w-full text-right"
          value={standart}
          onChange={(e) => {
            setStandart(e.target.value);
          }}
        >
          <option value="grondslagen">Grondslagen</option>
        </select>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pressure</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": pressureError != null,
          })}
        >
          <input
            ref={pressureRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Weld Joint Efficiency</legend>
        <input
          ref={weldJointEfficiencyRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": weldJointEfficiencyError != null,
          })}
          placeholder="0"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Shell Reduction Factor</legend>
        <input
          ref={shellReductionFactorRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": shellReductionFactorError != null,
          })}
          placeholder="0"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Constant C</legend>
        <input
          ref={constantCRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": constantCError != null,
          })}
          placeholder="0"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Temperature</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": temperatureError != null,
          })}
        >
          <input
            ref={temperatureRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\degree\mathrm{C}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Yield Strength</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": yieldStrengthError != null,
          })}
        >
          <input
            ref={yieldStrengthRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Corrosion Allowance</legend>
        <input
          ref={corrosionAllowanceRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": corrosionAllowanceError != null,
          })}
          placeholder="0"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Diameter
        </legend>
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
        <legend className="fieldset-legend">Diameter Type</legend>
        <select className="select select-bordered w-full text-right">
          <option>Inner</option>
          <option>Outter</option>
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
      <div className="divider">Drum</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Minimum Thickness</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(minShellFireTubeThickness)}
          />
          <span className="lable">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
