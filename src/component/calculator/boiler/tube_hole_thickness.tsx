import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Boiler } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const TubeHoleThicknessPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type TubeHoleThicknessProps = z.input<
  typeof TubeHoleThicknessPropsSchema
>;

export const TubeHoleThickness = (props: TubeHoleThicknessProps) => {
  const zProps = TubeHoleThicknessPropsSchema.parse(props);

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

  const minTubeHoleThickness = useMemo(() => {
    try {
      return Boiler.minThicknesTubeHole_JIS(
        pressure,
        outterDiameterHole,
        sigma,
      );
    } catch {
      return NaN;
    }
  }, [pressure, outterDiameterHole, sigma]);
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
          <option value="jis">Japanese Industrial Standart (JIS)</option>
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
        <legend className="fieldset-legend">
          Allowable Tensile Stress of The Material
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": sigmaError != null,
          })}
        >
          <input
            ref={sigmaRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Outter Diameter</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": outterDiameterHoleError != null,
          })}
        >
          <input
            ref={outterDiameterHoleRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
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
            value={numberFormatter.format(minTubeHoleThickness)}
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
