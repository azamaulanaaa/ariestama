"use client";

import { useEffect, useMemo, useState } from "react";
import { Girder } from "../../_utils/calculation";
import classNames from "classnames";

const Deflection = () => {
  const [typee, setTypee] = useState("single");
  const [lengthOfSpan, setLengthOfSpan] = useState(0);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [typee, lengthOfSpan]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const deflection = useMemo(() => {
    try {
      const result = Girder.deflection(typee, lengthOfSpan);

      return result;
    } catch (error) {
      return NaN;
    }
  }, [typee, lengthOfSpan]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Type</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={typee}
          onChange={(e) => {
            setTypee(e.target.value);
          }}
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Length of Span</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={lengthOfSpan}
          onChange={(e) => {
            setLengthOfSpan(parseFloat(e.target.value));
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
          <span className="label-text">Max Deflection</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={deflection.toFixed(0)}
        />
      </label>
    </form>
  );
};

export default Deflection;
