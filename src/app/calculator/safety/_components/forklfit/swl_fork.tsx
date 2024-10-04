"use client";

import { useMemo, useState } from "react";
import { Forklift, General } from "../../_utils/calculation";

const SWLFork = () => {
  const [capacity, setCapacity] = useState(0);
  const [cog2fork, setCog2fork] = useState(0);
  const [loadCenterFork, setLoadCenterFork] = useState(55);
  const [weight, setWeight] = useState(0);
  const [loadCenterWeight, setLoadCenterWeight] = useState(0);

  const swl = useMemo(() => {
    try {
      const result = Forklift.swlFork(
        capacity,
        cog2fork,
        loadCenterFork,
        loadCenterWeight,
      );

      return result;
    } catch (error) {
      return NaN;
    }
  }, [capacity, cog2fork, loadCenterFork, loadCenterWeight]);

  const maxLoadCenterWeight = useMemo(() => {
    try {
      const result = Forklift.maxLoadCenterWeight(
        capacity,
        cog2fork,
        weight,
        loadCenterFork,
      );

      return result;
    } catch (error) {
      return NaN;
    }
  }, [capacity, cog2fork, weight, loadCenterFork]);

  const weightPercentToSwl = useMemo(() => {
    try {
      const result = General.weightToSwlRatio(swl, weight);

      return result * 100;
    } catch (error) {
      return NaN;
    }
  }, [swl, weight]);

  return (
    <form>
      <div className="divider">Parameter</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Kapasitas (A)</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={capacity}
          onChange={(e) => {
            setCapacity(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Jarak COG ke Muka Fork (B)</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={cog2fork}
          onChange={(e) => {
            setCog2fork(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Load Center Fork</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={loadCenterFork}
          onChange={(e) => {
            setLoadCenterFork(parseFloat(e.target.value));
          }}
        >
          <option value="55">55</option>
          <option value="60">60</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Berat Beban Uji (D)</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={weight}
          onChange={(e) => {
            setWeight(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Load Center Beban (E)</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={loadCenterWeight}
          onChange={(e) => {
            setLoadCenterWeight(parseFloat(e.target.value));
          }}
        />
      </label>
      <div className="divider">Result</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">SWL Fork</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={swl.toFixed(0)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Load Center ketika 100% SWL</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={maxLoadCenterWeight.toFixed(0)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Nilai Pengujian</span>
          <span className="label-text-alt">% SWL</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={weightPercentToSwl.toFixed(0)}
        />
      </label>
      <div className="divider">Reference</div>
      <img className="w-full" src="/img/swl_fork-0.png" alt="reference" />
    </form>
  );
};

export default SWLFork;
