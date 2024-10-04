"use client";

import { useMemo, useState } from "react";
import { General, Rope } from "../../_utils/calculation";

const SwlWireRope = () => {
  const [diameter, setDiameter] = useState(0);
  const [reavingNumber, setReavingNumber] = useState(0);
  const [grade, setGrade] = useState(1770);

  const swlSling = useMemo(() => {
    try {
      return Rope.swlWireSling(diameter, grade);
    } catch (error) {
      return NaN;
    }
  }, [diameter, grade]);

  const breakingStrenghSling = useMemo(() => {
    try {
      return General.breakingStrength(swlSling, Rope.SafetyFactor.wire_sling);
    } catch (error) {
      return NaN;
    }
  }, [swlSling]);

  const swlRunning = useMemo(() => {
    try {
      return Rope.swlWireRunning(diameter, reavingNumber, grade);
    } catch (error) {
      return NaN;
    }
  }, [diameter, reavingNumber, grade]);

  return (
    <form>
      <div className="divider">Parameter</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">centi meter</span>
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
      <div className="divider">Result</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">SWL Wire Rope Sling</span>
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
          <span className="label-text">Breaking Strength Wire Rope Sling</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={breakingStrenghSling.toFixed(1)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">SWL Running Wire Rope</span>
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
