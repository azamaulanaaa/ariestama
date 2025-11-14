"use client";

import { useEffect, useMemo, useState } from "react";
import { APAR, General } from "../../_utils/calculation";
import classNames from "classnames";
import { z } from "zod";
import useNumber from "@/app/calculator/_hooks/useNumber";
import { NumberFormatter } from "@internationalized/number";

const MinUnitPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type MinUnitProps = z.input<typeof MinUnitPropsSchema>;

const MinUnit = (props: MinUnitProps) => {
  const zProps = MinUnitPropsSchema.parse(props);

  const [typee, setTypee] = useState("direct_input");
  const [heightRef, height, heightError] = useNumber(zProps.locale);
  const [widthRef, width, widthError] = useNumber(zProps.locale);
  const [directInputRef, directInput, directInputError] = useNumber(
    zProps.locale,
  );

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [height, width, directInput]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const area = useMemo(() => {
    try {
      if (typee == "direct_input") return directInput;
      if (typee == "calculate") return General.areaRectangular(height, width);
      return NaN;
    } catch (error) {
      return NaN;
    }
  }, [typee, height, width, directInput]);

  const numOfAPAR = useMemo(() => {
    try {
      return APAR.minUnit(area);
    } catch (error) {
      return NaN;
    }
  }, [area]);

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
          <option value="direct_input">Direct Input</option>
          <option value="calculate">Calculate</option>
        </select>
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: typee != "direct_input",
        })}
      >
        <div className="label">
          <span className="label-text">Area</span>
          <span className="label-text-alt">meter square</span>
        </div>
        <input
          ref={directInputRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": directInputError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: typee != "calculate",
        })}
      >
        <div className="label">
          <span className="label-text">Height</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={heightRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": heightError != null,
          })}
          placeholder="0"
        />
      </label>
      <label
        className={classNames("form-control w-full", {
          hidden: typee != "calculate",
        })}
      >
        <div className="label">
          <span className="label-text">Width</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={widthRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": widthError != null,
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
        >
        </textarea>
      </label>
      <h2>Result</h2>
      <label
        className={classNames("form-control w-full", {
          hidden: typee != "calculate",
        })}
      >
        <div className="label">
          <span className="label-text">Area</span>
          <span className="label-text-alt">meter square</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(area)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Number of APAR</span>
          <span className="label-text-alt">unit</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(numOfAPAR)}
        />
      </label>
    </form>
  );
};

export default MinUnit;
