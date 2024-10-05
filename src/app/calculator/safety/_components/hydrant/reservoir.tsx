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

  const [nozzleInletDiameter, setNozzleInletDiameter] = useState(0);
  const [waterPreasure, setWaterPreasuer] = useState(0);
  const [numberOpenNozzle, setNumberOpenNozzle] = useState(1);

  const volume = useMemo(() => {
    try {
      if (shape == "cylinder") return General.volumeCylinder(diameter, height);
      if (shape == "cuboid") return General.volumeCuboid(height, width, length);

      return NaN;
    } catch (error) {
      return NaN;
    }
  }, [shape, diameter, height, width, length]);

  const volumeLiter = useMemo(
    () => convert(volume).from("m3").to("l"),
    [volume],
  );

  const waterFlow = useMemo(() => {
    try {
      return Hydrant.waterFlow(nozzleInletDiameter, waterPreasure);
    } catch (error) {
      return NaN;
    }
  }, [nozzleInletDiameter, waterPreasure]);

  const waterFlow45MinAllNozzle = useMemo(
    () => waterFlow * 45 * numberOpenNozzle,
    [waterFlow, numberOpenNozzle],
  );

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <div className="divider">Reservoir</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Reservoir Shape</span>
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
        </select>
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
      <label className="form-control w-full">
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
            setWaterPreasuer(parseFloat(e.target.value));
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
          value={volumeLiter.toFixed(1)}
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
          <span className="label-text-alt">liter per 45 minute</span>
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
