import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";
import { InlineMath } from "react-katex";

import { General, Hydrant } from "@/util/calculation/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const convert = configureMeasurements(allMeasures);

const ReservoirPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type ReservoirProps = z.input<typeof ReservoirPropsSchema>;

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
    <form>
      <h2>Parameter</h2>
      <div className="divider">Reservoir</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Shape</legend>
        <select
          className="select select-bordered w-full text-right"
          value={shape}
          onChange={(e) => {
            setShape(e.target.value);
          }}
        >
          <option value="cylinder">Cylinder</option>
          <option value="cuboid">Cuboid</option>
          <option value="direct_input">[Direct Input]</option>
        </select>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "direct_input",
        })}
      >
        <legend className="fieldset-legend">Volume</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": directVolumeError != null,
          })}
        >
          <input
            ref={directVolumeRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{l}" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "cylinder",
        })}
      >
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
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "cylinder" && shape != "cuboid",
        })}
      >
        <legend className="fieldset-legend">Height</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": heightError != null,
          })}
        >
          <input
            ref={heightRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "cuboid",
        })}
      >
        <legend className="fieldset-legend">Width</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": widthError != null,
          })}
        >
          <input
            ref={widthRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: shape != "cuboid",
        })}
      >
        <legend className="fieldset-legend">Length</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": lengthError != null,
          })}
        >
          <input
            ref={lengthRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <div className="divider">Nozzle</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Inlet Diameter</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": nozzleInletDiameterError != null,
          })}
        >
          <input
            ref={nozzleInletDiameterRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Water Preasure</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": waterPreasureError != null,
          })}
        >
          <input
            ref={waterPreasureRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Number Nozzle Open</legend>
        <input
          ref={numberOpenNozzleRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": numberOpenNozzleError != null,
          })}
          placeholder="0"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nozzle Open Duration</legend>
        <select
          className="select select-bordered w-full text-right"
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
      <div className="divider">Note</div>
      <textarea
        className={cn("textarea textarea-bordered h-24 w-full", {
          "textarea-error": edited,
        })}
        onClick={handleNoteClick}
      >
      </textarea>
      <h2>Result</h2>
      <div className="divider">Reservoir</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Volume</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(volume)}
          />
          <span className="label">
            <InlineMath math="\mathrm{l}" />
          </span>
        </label>
      </fieldset>
      <div className="divider">Nozzle</div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Water Flow per Nozzle</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(waterFlow)}
          />
          <span className="label">
            <InlineMath math="\mathrm{l}/\mathrm{min}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Water Volume Needed for All Nozzle
        </legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(waterFlow45MinAllNozzle)}
          />
          <span className="label">
            <InlineMath math={"\\mathrm{l}/" + duration + "\\mathrm{min}"} />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
