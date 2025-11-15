"use client";

import { useEffect, useMemo, useState } from "react";
import { General, Hydrant } from "../../_utils/calculation";
import convert from "convert-units";
import classNames from "classnames";
import { z } from "zod";
import useNumber from "@/app/calculator/_hooks/useNumber";
import { NumberFormatter } from "@internationalized/number";

const ReservoirPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type ReservoirProps = z.input<typeof ReservoirPropsSchema>;

const Reservoir = (props: ReservoirProps) => {
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
      if (shape == "cylinder")
        return convert(General.volumeCylinder(diameter, height))
          .from("m3")
          .to("l");
      else if (shape == "cuboid")
        return convert(General.volumeCuboid(height, width, length))
          .from("m3")
          .to("l");
      else if (shape == "direct_input") return directVolume;

      return NaN;
    } catch (error) {
      return NaN;
    }
  }, [shape, directVolume, diameter, height, width, length]);

  const waterFlow = useMemo(() => {
    try {
      return Hydrant.waterFlow(nozzleInletDiameter, waterPreasure);
    } catch (error) {
      return NaN;
    }
  }, [nozzleInletDiameter, waterPreasure]);

  const waterFlow45MinAllNozzle = useMemo(
    () => waterFlow * duration * numberOpenNozzle,
    [waterFlow, duration, numberOpenNozzle],
  );

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <div className="divider">Reservoir</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Shape</span>
        </div>
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
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: shape != "direct_input",
        })}
      >
        <div className="label">
          <span className="label-text">Volume</span>
          <span className="label-text-alt">liter</span>
        </div>
        <input
          ref={directVolumeRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": directVolumeError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: shape != "cylinder",
        })}
      >
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={diameterRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": diameterError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: shape != "cylinder" && shape != "cuboid",
        })}
      >
        <div className="label">
          <span className="label-text">Height</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={heightRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": heightError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: shape != "cuboid",
        })}
      >
        <div className="label">
          <span className="label-text">Width</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={widthRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": widthError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: shape != "cuboid",
        })}
      >
        <div className="label">
          <span className="label-text">Length</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={lengthRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": lengthError != null,
          })}
          placeholder="0"
        />
      </label>
      <div className="divider">Nozzle</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Inlet Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={nozzleInletDiameterRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": nozzleInletDiameterError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Water Preasure</span>
          <span className="label-text-alt">
            kilo gram per centi meter square
          </span>
        </div>
        <input
          ref={waterPreasureRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": waterPreasureError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Number Nozzle Open</span>
        </div>
        <input
          ref={numberOpenNozzleRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": numberOpenNozzleError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Nozzle Open Duration</span>
          <span className="label-text-alt">minute</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={duration}
          onChange={(e) => {
            setDuration(parseFloat(e.target.value));
          }}
        >
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="90">90</option>
        </select>
      </label>
      <div className="divider">Note</div>
      <label className="form-control w-full">
        <textarea
          className={classNames("textarea textarea-bordered h-24", {
            "textarea-error": edited,
          })}
          onClick={handleNoteClick}
        ></textarea>
      </label>
      <h2>Result</h2>
      <div className="divider">Reservoir</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Volume</span>
          <span className="label-text-alt">liter</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(volume)}
        />
      </label>
      <div className="divider">Nozzle</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Water Flow per Nozzle</span>
          <span className="label-text-alt">liter per minute</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(waterFlow)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Water Volume Needed for All Nozzle</span>
          <span className="label-text-alt">liter per {duration} minute</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(waterFlow45MinAllNozzle)}
        />
      </label>
    </form>
  );
};

export default Reservoir;
