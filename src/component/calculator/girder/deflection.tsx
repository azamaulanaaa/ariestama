"use client";

import { useEffect, useMemo, useState } from "react";
import { Girder } from "../../_utils/calculation";
import classNames from "classnames";
import { z } from "zod";
import useNumber from "@/app/calculator/_hooks/useNumber";
import { NumberFormatter } from "@internationalized/number";

const DeflectionPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type DeflectionProps = z.input<typeof DeflectionPropsSchema>;

const Deflection = (props: DeflectionProps) => {
  const zProps = DeflectionPropsSchema.parse(props);

  const [typee, setTypee] = useState("single");
  const [lengthOfSpanRef, lengthOfSpan, lengthOfSpanError] = useNumber(
    zProps.locale,
  );

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [typee, lengthOfSpan]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const deflection = useMemo(() => {
    try {
      return Girder.deflection(typee, lengthOfSpan);
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
          ref={lengthOfSpanRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": lengthOfSpanError != null,
          })}
          placeholder="0"
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
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(deflection)}
        />
      </label>
    </form>
  );
};

export default Deflection;
