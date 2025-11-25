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

export type BoilerTubeHoleThicknessProps = {
  className?: string;
  locale: string;
};

const BoilerTubeHoleThicknessPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<BoilerTubeHoleThicknessProps>;

export const BoilerTubeHoleThickness = (
  props: BoilerTubeHoleThicknessProps,
) => {
  const zProps = BoilerTubeHoleThicknessPropsSchema.parse(props);

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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Boiler - Tube Hole Thickness</CalculatorTitle>
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
            <option value="jis">Japanese Industrial Standart (JIS)</option>
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
            Allowable Tensile Stress of The Material
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
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Outter Diameter
          </label>
          <label
            className={cn("input w-full", {
              "input-error": outterDiameterHoleError != null,
            })}
          >
            <input
              ref={outterDiameterHoleRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{mm}" />
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
          <label className="label text-black dark:text-white">
            Minimum Thickness
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(minTubeHoleThickness)}
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
