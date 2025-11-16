import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Boiler } from "@/util/calculation/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const DrumWaterTubeThicknessPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type DrumWaterTubeThicknessProps = z.input<
  typeof DrumWaterTubeThicknessPropsSchema
>;

export const DrumWaterTubeThickness = (props: DrumWaterTubeThicknessProps) => {
  const zProps = DrumWaterTubeThicknessPropsSchema.parse(props);

  const [standart, setStandart] = useState("jis");
  const [type, setType] = useState("ferritic_steel");
  const [pressureRef, pressure, pressureError] = useNumber(zProps.locale);
  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [sigmaRef, sigma, sigmaError] = useNumber(zProps.locale);
  const [temperatureRef, temperature, temperatureError] = useNumber(
    zProps.locale,
  );
  const [innerDiameterHoleRef, innerDiameterHole, innerDiameterHoleError] =
    useNumber(zProps.locale);
  const [pitchHoleRef, pitchHole, pitchHoleError] = useNumber(zProps.locale);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [
    type,
    standart,
    pressure,
    diameter,
    sigma,
    innerDiameterHole,
    pitchHole,
    temperature,
  ]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const efficiencyHole = useMemo(() => {
    try {
      return Boiler.efficiencyLigamentsWaterTube_JIS(
        pitchHole,
        innerDiameterHole,
      );
    } catch {
      return NaN;
    }
  }, [pitchHole, innerDiameterHole]);

  const minDrumWaterTubeThickness = useMemo(() => {
    try {
      return Boiler.minDrumWaterTubeThickness_JIS(
        type,
        pressure,
        diameter,
        sigma,
        efficiencyHole,
        temperature,
      );
    } catch {
      return NaN;
    }
  }, [type, pressure, diameter, sigma, efficiencyHole, temperature]);

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
      <div className="divider">Tube Holes</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pitch</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": pitchHoleError != null,
          })}
        >
          <input
            ref={pitchHoleRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Inner Diameter</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": innerDiameterHoleError != null,
          })}
        >
          <input
            ref={innerDiameterHoleRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
      <div className="divider">Drum</div>
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
        <legend className="fieldset-legend">Steam Temperature</legend>
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
        <legend className="fieldset-legend">Type</legend>
        <select
          className="select select-bordered w-full text-right"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="ferritic_steel">Ferritic Steel</option>
          <option value="austenitic_steel">Austenitic Steel</option>
        </select>
      </fieldset>
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
      <div className="divider">Tube Holes</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Efficiency of Ligament</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(efficiencyHole)}
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
      <div className="divider">Drum</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Minimum Thickness</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(minDrumWaterTubeThickness)}
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
