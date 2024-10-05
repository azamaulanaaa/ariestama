"use client";

import { useMemo, useState } from "react";
import { General, Rope } from "../../_utils/calculation";
import convert from "convert-units";

const SwlWireRope = () => {
  const [diameter, setDiameter] = useState(0);
  const [reavingNumber, setReavingNumber] = useState(0);
  const [grade, setGrade] = useState(1770);

  const diameterInch = useMemo(
    () => convert(diameter).from("mm").to("in"),
    [diameter],
  );

  const swlSling = useMemo(() => {
    try {
      return Rope.swlWireSling(diameterInch, grade);
    } catch (error) {
      return NaN;
    }
  }, [diameterInch, grade]);

  const breakingStrenghSling = useMemo(() => {
    try {
      return General.breakingStrength(swlSling, Rope.SafetyFactor.wire_sling);
    } catch (error) {
      return NaN;
    }
  }, [swlSling]);

  const swlRunning = useMemo(() => {
    try {
      return Rope.swlWireRunning(diameterInch, reavingNumber, grade);
    } catch (error) {
      return NaN;
    }
  }, [diameterInch, reavingNumber, grade]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">mili meter</span>
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
          <span className="label-text">Reaving</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={reavingNumber}
          onChange={(e) => {
            setReavingNumber(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Grade</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={grade}
          onChange={(e) => {
            setGrade(parseFloat(e.target.value));
          }}
        >
          <option value="1770">1770</option>
        </select>
      </label>
      <h2>Result</h2>
      <div className="divider">Wire Rope Sling</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Safety Working Load (SWL)</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={swlSling.toFixed(1)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Breaking Strength</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={breakingStrenghSling.toFixed(1)}
        />
      </label>
      <div className="divider">Running Wire Rope</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Safety Working Load (SWL)</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={swlRunning.toFixed(1)}
        />
      </label>
    </form>
  );
};

export default SwlWireRope;
