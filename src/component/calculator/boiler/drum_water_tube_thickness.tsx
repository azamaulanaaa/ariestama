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

export type BoilerDrumWaterTubeThicknessProps = {
  className?: string;
  locale: string;
};
const BoilerDrumWaterTubeThicknessPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<BoilerDrumWaterTubeThicknessProps>;

export const BoilerDrumWaterTubeThickness = (
  props: BoilerDrumWaterTubeThicknessProps,
) => {
  const zProps = BoilerDrumWaterTubeThicknessPropsSchema.parse(props);

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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Boiler - Drum Water Tube Thickness</CalculatorTitle>
      <CalculatorBody>
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
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Tube Holes - Pitch</label>
          <label
            className={cn("input w-full", {
              "input-error": pitchHoleError != null,
            })}
          >
            <input
              ref={pitchHoleRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black">
            Tube Holes - Inner Diameter
          </label>
          <label
            className={cn("input w-full", {
              "input-error": innerDiameterHoleError != null,
            })}
          >
            <input
              ref={innerDiameterHoleRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black">Drum - Pressure</label>
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
            <span className="label text-black">
              <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
            </span>
          </label>
          <label className="label text-black">
            Drum - Allowable Tensile Stress of The Material
          </label>
          <label
            className={cn("input w-full", {
              "input-error": sigmaError != null,
            })}
          >
            <input
              ref={sigmaRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
            </span>
          </label>
          <label className="label text-black">Drum - Steam Temperature</label>
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
            <span className="label text-black">
              <InlineMath math="\degree\mathrm{C}" />
            </span>
          </label>
          <label className="label text-black">Drum - Material Kind</label>
          <select
            className="select w-full"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="ferritic_steel">Ferritic Steel</option>
            <option value="austenitic_steel">Austenitic Steel</option>
          </select>
          <label className="label text-black">Drum - Diameter</label>
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
          <label className="label text-black">Drum - Diameter Kind</label>
          <select className="select select-bordered w-full text-right">
            <option>Inner</option>
            <option>Outter</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Note</legend>
          <textarea
            className={cn("textarea textarea-bordered h-24 w-full", {
              "textarea-error": edited,
            })}
            onClick={handleNoteClick}
          >
          </textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Result</legend>
          <label className="label text-black">
            Tube Holes - Efficiency of Ligament
          </label>
          <label className="input input-bordered w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(efficiencyHole)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black">Drum - Minimum Thickness</label>
          <label className="input input-bordered w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(minDrumWaterTubeThickness)}
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
