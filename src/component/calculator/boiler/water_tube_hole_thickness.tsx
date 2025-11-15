import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";

import { Boiler } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const WaterTubeThicknessHolePropsScheam = z.object({
  locale: z.string().optional().default("en-US"),
});

export type WaterTubeHoleThicknessProps = z.input<
  typeof WaterTubeThicknessHolePropsScheam
>;

export const WaterTubeHoleThickness = (props: WaterTubeHoleThicknessProps) => {
  const zProps = WaterTubeThicknessHolePropsScheam.parse(props);

  const [standart, setStandart] = useState("jis");
  const [pressureRef, pressure, pressureError] = useNumber(zProps.locale);
  const [sigmaRef, sigma, sigmaError] = useNumber(zProps.locale);
  const [outterDiameterHoleRef, outterDiameterHole, outterDiameterHoleError] =
    useNumber(zProps.locale);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [standart, pressure, sigma]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const minThicknessTube = useMemo(() => {
    try {
      return Boiler.minThicknessTubeWaterTubeJIS(
        pressure,
        outterDiameterHole,
        sigma,
      );
    } catch {
      return NaN;
    }
  }, [pressure, outterDiameterHole, sigma]);
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
          <option value="jis">Japanese Industrial Standart (JIS)</option>
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
          className={cn("input input-bordered w-full text-right", {
            "input-error": pressureError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">
            Allowable Tensile Stress of The Material
          </span>
          <span className="label-text-alt">
            kilo gram force per mili meter square
          </span>
        </div>
        <input
          ref={sigmaRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": sigmaError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Outter Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={outterDiameterHoleRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": outterDiameterHoleError != null,
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
          <span className="label-text">Minimum Thickness</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(minThicknessTube)}
        />
      </label>
    </form>
  );
};
