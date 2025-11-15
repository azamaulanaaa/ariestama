import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";

import { Boiler } from "@/util/calculation.ts";
import { cn as classNames } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const FireTubeTubeThicknessPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type FireTubeTubeThicknessProps = z.input<
  typeof FireTubeTubeThicknessPropsSchema
>;

export const FireTubeTubeThickness = (props: FireTubeTubeThicknessProps) => {
  const zProps = FireTubeTubeThicknessPropsSchema.parse(props);

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
      return Boiler.temperatureFactorGrondslagen(
        temperature + 75,
      );
    } catch {
      return NaN;
    }
  }, [temperature]);

  const correctedYieldStrength = useMemo(() => {
    try {
      return Boiler.correctedYieldStrengthGrondslagen(
        temperatureFactor,
        yieldStrength,
      );
    } catch {
      return NaN;
    }
  }, [temperatureFactor, yieldStrength]);

  const minThicknessShellDrum = useMemo(() => {
    try {
      return Boiler.minThicknessTubeFireTubeGrondslagen(
        pressure,
        diameter,
        weldJointEfficiency,
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
    correctedYieldStrength,
    corrosionAllowance,
  ]);

  return (
    <form className="prose">
      <h2>Standart</h2>
      <label className="form-control w-full">
        <select
          className="select select-bordered w-full text-right"
          value={standart}
          onChange={(e) => {
            setStandart(e.target.value);
          }}
        >
          <option value="grondslagen">Grondslagen</option>
        </select>
      </label>
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Pressure</span>
          <span className="label-text-alt">
            kilo gram force per centi meter square
          </span>
        </div>
        <input
          ref={pressureRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": pressureError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Weld Joint Efficiency</span>
        </div>
        <input
          ref={weldJointEfficiencyRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": weldJointEfficiencyError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Temperature</span>
          <span className="label-text-alt">celcius</span>
        </div>
        <input
          ref={temperatureRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": temperatureError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Yield Strength</span>
          <span className="label-text-alt">
            kilo gram force per mili meter square
          </span>
        </div>
        <input
          ref={yieldStrengthRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": yieldStrengthError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Corrosion Allowance</span>
        </div>
        <input
          ref={corrosionAllowanceRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": corrosionAllowanceError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">
            Diameter
          </span>
          <span className="label-text-alt">
            mili meter
          </span>
        </div>
        <input
          ref={diameterRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": diameterError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter Type</span>
        </div>
        <select className="select select-bordered w-full text-right">
          <option>Inner</option>
          <option>Outter</option>
        </select>
      </label>
      <div className="divider">Note</div>
      <label className="form-control w-full">
        <textarea
          className={classNames("textarea textarea-bordered h-24", {
            "textarea-error": edited,
          })}
          onClick={handleNoteClick}
        >
        </textarea>
      </label>
      <h2>Result</h2>
      <div className="divider">Drum</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Minimum Thickness</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(minThicknessShellDrum)}
        />
      </label>
    </form>
  );
};
