import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";

import { General } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.ts";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

const convert = configureMeasurements(allMeasures);

export type GeneralVolumeProps = {
  className?: string;
  locale: string;
};

const GeneralVolumePropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<GeneralVolumeProps>;

export const GeneralVolume = (props: GeneralVolumeProps) => {
  const zProps = GeneralVolumePropsSchema.parse(props);

  const [shape, setShape] = useState("cylinder");
  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [heightRef, height, heightError] = useNumber(zProps.locale);
  const [widthRef, width, widthError] = useNumber(zProps.locale);
  const [lengthRef, length, lengthError] = useNumber(zProps.locale);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [shape, diameter, height, width, length]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const volume = useMemo(() => {
    try {
      if (shape == "cylinder") {
        return convert(General.volumeCylinder(diameter, height))
          .from("m3")
          .to("l");
      } else if (shape == "cuboid") {
        return General.volumeCuboid(height, width, length);
      }

      return NaN;
    } catch {
      return NaN;
    }
  }, [shape, diameter, height, width, length]);

  return (
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>General - Volume</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Shape</label>
          <select
            className="select w-full text-right"
            value={shape}
            onChange={(e) => {
              setShape(e.target.value);
            }}
          >
            <option value="cylinder">Cylinder</option>
            <option value="cuboid">Cuboid</option>
          </select>
          <div
            className={cn({
              hidden: shape != "cylinder",
            })}
          >
            <label className="label text-black">Diameter</label>
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
                <InlineMath math="\mathrm{m}" />
              </span>
            </label>
          </div>
          <label className="label text-black">Height</label>
          <label
            className={cn("input w-full", {
              "input-error": heightError != null,
            })}
          >
            <input
              ref={heightRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{m}" />
            </span>
          </label>
          <div
            className={cn({
              hidden: shape != "cuboid",
            })}
          >
            <label className="label text-black">Width</label>
            <label
              className={cn("input w-full", {
                "input-error": widthError != null,
              })}
            >
              <input
                ref={widthRef}
                className="text-right"
                placeholder="0"
              />
              <span className="label text-black">
                <InlineMath math="\mathrm{m}" />
              </span>
            </label>
            <label className="label text-black">Length</label>
            <label
              className={cn("input w-full", {
                "input-error": lengthError != null,
              })}
            >
              <input
                ref={lengthRef}
                className="text-right"
                placeholder="0"
              />
              <span className="label text-black">
                <InlineMath math="\mathrm{m}" />
              </span>
            </label>
          </div>
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
          <label className="label text-black">Volume</label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(volume)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{m}^3" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
