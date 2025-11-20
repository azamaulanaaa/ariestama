import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Hydrant } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type ReservoirCapacityProps = {
  className?: string;
  locale: string;
};

const ReservoirCapacityPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<ReservoirCapacityProps>;

export const ReservoirCapacity = (props: ReservoirCapacityProps) => {
  const zProps = ReservoirCapacityPropsSchema.parse(props);

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
    duration,
    nozzleInletDiameter,
    waterPreasure,
    numberOpenNozzle,
  ]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

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
      <CalculatorTitle>Hydrant - Reservoir Capacity</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Nozzle Inlet Diameter</label>
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
          <label className="label text-black">Nozzle Water Preasure</label>
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
          <label className="label text-black">Number Nozzle Open</label>
          <input
            ref={numberOpenNozzleRef}
            className={cn("input w-full text-right", {
              "input-error": numberOpenNozzleError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black">Open Duration</label>
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
          <label className="label text-black">
            Water Flow per Nozzle
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
            Min Reservoir Capacity
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(waterFlow45MinAllNozzle)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{l}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
