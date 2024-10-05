"use client";

import { useMemo, useState } from "react";
import { InstalasiPenyalurPetir } from "../../_utils/calculation";

const RadiusKonvensional = () => {
  const [tinggi, setTinggi] = useState(0);

  const radiusKonvensional = useMemo(() => {
    try {
      const result = InstalasiPenyalurPetir.radiusKonvensional(tinggi);

      return result.toFixed(2);
    } catch (error) {
      return NaN;
    }
  }, [tinggi]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Tinggi</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={tinggi}
          onChange={(e) => {
            setTinggi(parseFloat(e.target.value));
          }}
        />
      </label>
      <h2>Result</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Radius</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={radiusKonvensional}
        />
      </label>
    </form>
  );
};

export default RadiusKonvensional;
