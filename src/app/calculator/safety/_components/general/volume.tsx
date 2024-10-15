"use client";

import { useEffect, useMemo, useState } from "react";
import { General } from "../../_utils/calculation";
import convert from "convert-units";
import classNames from "classnames";

const Volume = () => {
  const [shape, setShape] = useState("cylinder");
  const [diameter, setDiameter] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [volume, setVolume] = useState(NaN);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [shape, diameter, height, width, length, volume]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  useMemo(() => {
    try {
      if (shape == "cylinder")
        setVolume(
          convert(General.volumeCylinder(diameter, height)).from("m3").to("l"),
        );
      else if (shape == "cuboid")
        setVolume(General.volumeCuboid(height, width, length));
      else setVolume(NaN);
    } catch (error) {
      setVolume(NaN);
    }
  }, [shape, diameter, height, width, length]);

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
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Volume</span>
          <span className="label-text-alt">meter cubic</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={volume.toFixed(1)}
        />
      </label>
    </form>
  );
};

export default Volume;
