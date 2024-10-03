"use client";

import { useMemo, useState } from "react";
import { Chain } from "../../_utils/calculation";

const SWLSling = () => {
  const [diameter, setDiameter] = useState(0);
  const [grade, setGrade] = useState(80);

  const swl = useMemo(() => {
    try {
      const result = Chain.swlSling(diameter, grade);

      return result.toFixed(2);
    } catch (error) {
      return NaN;
    }
  }, [diameter, grade]);

  return (
    <form>
      <div className="divider">Parameter</div>
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
          <span className="label-text">Grade</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={grade}
          onChange={(e) => {
            setGrade(parseInt(e.target.value));
          }}
        >
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
      </label>
      <div className="divider">Result</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">SWL</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={swl}
        />
      </label>
    </form>
  );
};

export default SWLSling;
