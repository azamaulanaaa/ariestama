"use client";

import { useEffect, useMemo, useState } from "react";
import { Lingkungan } from "../../_utils/calculation";
import classNames from "classnames";

const AnchorResultante = () => {
  const [alpha, setAlpha] = useState(0);
  const [mass, setMass] = useState(0);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [alpha, mass]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const resultante = useMemo(() => {
    try {
      const result = Lingkungan.anchorResultante(alpha, mass);

      return result.toFixed(2);
    } catch (error) {
      return NaN;
    }
  }, [alpha, mass]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Alpha</span>
          <span className="label-text-alt">degree</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={alpha}
          onChange={(e) => {
            setAlpha(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Mass</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={mass}
          onChange={(e) => {
            setMass(parseFloat(e.target.value));
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
          <span className="label-text">Resultante</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={resultante}
        />
      </label>
    </form>
  );
};

export default AnchorResultante;
