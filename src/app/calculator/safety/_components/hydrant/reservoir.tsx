"use client";

import { useMemo, useState } from "react";
import { General, Hydrant } from "../../_utils/calculation";
import convert from "convert-units";
import classNames from "classnames";

const Reservoir = () => {
  const [shape, setShape] = useState("cylinder");
  const [diameter, setDiameter] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [volume, setVolume] = useState(NaN);
  const [duration, setDuration] = useState(45);

  const [nozzleInletDiameter, setNozzleInletDiameter] = useState(0);
  const [waterPreasure, setWaterPreasure] = useState(0);
  const [numberOpenNozzle, setNumberOpenNozzle] = useState(1);

  useMemo(() => {
    try {
      if (shape == "cylinder")
        setVolume(
          convert(General.volumeCylinder(diameter, height)).from("m3").to("l"),
        );
      else if (shape == "cuboid")
        setVolume(
          convert(General.volumeCuboid(height, width, length))
            .from("m3")
            .to("l"),
        );
    } catch (error) {
      setVolume(NaN);
    }
  }, [shape, diameter, height, width, length]);

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
          <option value="unknown">[Direct Input]</option>
        </select>
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: shape != "unknown",
        })}
      >
        <div className="label">
          <span className="label-text">Volume</span>
          <span className="label-text-alt">liter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
          }}
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
          type="number"
          className="input input-bordered w-full text-right"
          value={diameter}
          onChange={(e) => {
            setDiameter(parseFloat(e.target.value));
          }}
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
          type="number"
          className="input input-bordered w-full text-right"
          value={height}
          onChange={(e) => {
            setHeight(parseFloat(e.target.value));
          }}
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
          type="number"
          className="input input-bordered w-full text-right"
          value={width}
          onChange={(e) => {
            setWidth(parseFloat(e.target.value));
          }}
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
          type="number"
          className="input input-bordered w-full text-right"
          value={length}
          onChange={(e) => {
            setLength(parseFloat(e.target.value));
          }}
        />
      </label>
      <div className="divider">Nozzle</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Inlet Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={nozzleInletDiameter}
          onChange={(e) => {
            setNozzleInletDiameter(parseFloat(e.target.value));
          }}
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
          type="number"
          className="input input-bordered w-full text-right"
          value={waterPreasure}
          onChange={(e) => {
            setWaterPreasure(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Number Nozzle Open</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={numberOpenNozzle}
          onChange={(e) => {
            setNumberOpenNozzle(parseFloat(e.target.value));
          }}
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
      <h2>Result</h2>
      <div className="divider">Reservoir</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Volume</span>
          <span className="label-text-alt">liter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={volume.toFixed(1)}
        />
      </label>
      <div className="divider">Nozzle</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Water Flow per Nozzle</span>
          <span className="label-text-alt">liter per minute</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={waterFlow.toFixed(1)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Water Volume Needed for All Nozzle</span>
          <span className="label-text-alt">liter per {duration} minute</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={waterFlow45MinAllNozzle.toFixed(1)}
        />
      </label>
    </form>
  );
};

export default Reservoir;
