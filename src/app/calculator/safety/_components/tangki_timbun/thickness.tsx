"use client";

import { useMemo, useState } from "react";
import { TangkiTimbun } from "../../_utils/calculation";
import convert from "convert-units";

const Thickness = () => {
  const [diameter, setDiameter] = useState(0);
  const [designLiquidLevel, setDesignLiquidLevel] = useState(0);
  const [designSpecificGravityLiquid, setDesignSpecificGravityLiquid] =
    useState(0);
  const [allowableStress, setAllowableStress] = useState(1);
  const [corrosionAllowable, setCorrosionAllowable] = useState(0);

  const minimum_required_thickness = useMemo(() => {
    try {
      const result = TangkiTimbun.thickness(
        diameter,
        designLiquidLevel,
        designSpecificGravityLiquid,
        convert(allowableStress).from("bar").to("MPa"),
        corrosionAllowable,
      );

      return result.toFixed(1);
    } catch (error) {
      return NaN;
    }
  }, [
    diameter,
    designLiquidLevel,
    designSpecificGravityLiquid,
    allowableStress,
    corrosionAllowable,
  ]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
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
          <span className="label-text">Design Liquid Level</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={designLiquidLevel}
          onChange={(e) => {
            setDesignLiquidLevel(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Design Specific Gravity Liquid</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={designSpecificGravityLiquid}
          onChange={(e) => {
            setDesignSpecificGravityLiquid(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Allowable Stress</span>
          <span className="label-text-alt">bar</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={allowableStress}
          onChange={(e) => {
            setAllowableStress(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Corrosion Allowance</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={corrosionAllowable}
          onChange={(e) => {
            setCorrosionAllowable(parseFloat(e.target.value));
          }}
        />
      </label>
      <h2>Result</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Minimum Required Thickness</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={minimum_required_thickness}
        />
      </label>
    </form>
  );
};

export default Thickness;
