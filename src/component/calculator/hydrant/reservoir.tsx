import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";
import { InlineMath } from "react-katex";

import { General, Hydrant } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type ReservoirProps = {
  className?: string;
  locale: string;
};

const convert = configureMeasurements(allMeasures);

const ReservoirPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<ReservoirProps>;

export const Reservoir = (props: ReservoirProps) => {
  const zProps = ReservoirPropsSchema.parse(props);

  const [shape, setShape] = useState("cylinder");
  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [heightRef, height, heightError] = useNumber(zProps.locale);
  const [widthRef, width, widthError] = useNumber(zProps.locale);
  const [lengthRef, length, lengthError] = useNumber(zProps.locale);
  const [directVolumeRef, directVolume, directVolumeError] = useNumber(
    zProps.locale,
  );

  const [duration, setDuration] = useState(45);
  const [
    nozzleInletDiameterRef,
    nozzleInletDiameter,
    nozzleInletDiameterError,
  ] = useNumber(zProps.locale);
  const [waterPreasureRef, waterPreasure, waterPreasureError] = useNumber(
    zProps.locale,
  );
  const [numberOpenNozzleRef, numberOpenNozzle, numberOpenNozzleError] =
    useNumber(zProps.locale);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [
    shape,
    diameter,
    height,
    width,
    length,
    directVolume,
    duration,
    nozzleInletDiameter,
    waterPreasure,
    numberOpenNozzle,
  ]);

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
        return convert(General.volumeCuboid(height, width, length))
          .from("m3")
          .to("l");
      } else if (shape == "direct_input") return directVolume;

      return NaN;
    } catch {
      return NaN;
    }
  }, [shape, directVolume, diameter, height, width, length]);

  const waterFlow = useMemo(() => {
    try {
      return Hydrant.waterFlow(nozzleInletDiameter, waterPreasure);
    } catch {
      return NaN;
    }
  }, [nozzleInletDiameter, waterPreasure]);

  const waterFlow45MinAllNozzle = useMemo(
    () => waterFlow * duration * numberOpenNozzle,
    [waterFlow, duration, numberOpenNozzle],
  );

  return (
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Hydrant - Reservoir</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Reservoir - Shape</label>
          <select
            className="select w-full text-right"
            value={shape}
            onChange={(e) => {
              setShape(e.target.value);
            }}
          >
            <option value="cylinder">Cylinder</option>
            <option value="cuboid">Cuboid</option>
            <option value="direct_input">[Direct Input]</option>
          </select>
          <div
            className={cn({
              hidden: shape != "direct_input",
            })}
          >
            <label className="label text-black">Reservoir - Volume</label>
            <label
              className={cn("input w-full", {
                "input-error": directVolumeError != null,
              })}
            >
              <input
                ref={directVolumeRef}
                className="text-right"
                placeholder="0"
              />
              <span className="label text-black">
                <InlineMath math="\mathrm{l}" />
              </span>
            </label>
          </div>
          <div
            className={cn({
              hidden: shape != "cylinder",
            })}
          >
            <label className="label text-black">Reservoir - Diameter</label>
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
          <div
            className={cn({
              hidden: shape != "cylinder" && shape != "cuboid",
            })}
          >
            <label className="label text-black">Reservoir - Height</label>
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
          </div>
          <div
            className={cn({
              hidden: shape != "cuboid",
            })}
          >
            <label className="label text-black">Reservoir - Width</label>
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
            <label className="label text-black">Reservoir - Length</label>
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
          <label className="label text-black">Nozzle - Inlet Diameter</label>
          <label
            className={cn("input w-full", {
              "input-error": nozzleInletDiameterError != null,
            })}
          >
            <input
              ref={nozzleInletDiameterRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black">Nozzle - Water Preasure</label>
          <label
            className={cn("input w-full", {
              "input-error": waterPreasureError != null,
            })}
          >
            <input
              ref={waterPreasureRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
            </span>
          </label>
          <label className="label text-black">Nozzle - Number Open</label>
          <input
            ref={numberOpenNozzleRef}
            className={cn("input w-full text-right", {
              "input-error": numberOpenNozzleError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black">Nozzle - Open Duration</label>
          <select
            className="select w-full text-right"
            value={duration}
            onChange={(e) => {
              setDuration(parseFloat(e.target.value));
            }}
          >
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="90">90 min</option>
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
          <div className={cn({ hidden: shape == "direct_input" })}>
            <label className="label text-black">Reservoir - Volume</label>
            <label className="input w-full">
              <input
                type="tel"
                readOnly
                className="text-right"
                value={numberFormatter.format(volume)}
              />
              <span className="label text-black">
                <InlineMath math="\mathrm{l}" />
              </span>
            </label>
          </div>
          <label className="label text-black">
            Nozzle - Water Flow per Nozzle
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(waterFlow)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{l}/\mathrm{min}" />
            </span>
          </label>
          <label className="label text-black">
            Nozzle - Water Volume Needed for All Nozzle
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(waterFlow45MinAllNozzle)}
            />
            <span className="label text-black">
              <InlineMath math={"\\mathrm{l}/" + duration + "\\mathrm{min}"} />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
