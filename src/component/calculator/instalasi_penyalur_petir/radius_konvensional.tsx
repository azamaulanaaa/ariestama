"use client";

import { useEffect, useMemo, useState } from "react";
import { InstalasiPenyalurPetir } from "../../_utils/calculation";
import classNames from "classnames";
import { z } from "zod";
import useNumber from "@/app/calculator/_hooks/useNumber";
import { NumberFormatter } from "@internationalized/number";

const RadiusKonvensionalPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type RadiusKonvensionalProps = z.input<
  typeof RadiusKonvensionalPropsSchema
>;

const RadiusKonvensional = (props: RadiusKonvensionalProps) => {
  const zProps = RadiusKonvensionalPropsSchema.parse(props);

  const [heightRef, height, heightError] = useNumber(zProps.locale);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [height]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const radiusKonvensional = useMemo(() => {
    try {
      return InstalasiPenyalurPetir.radiusKonvensional(height);
    } catch (error) {
      return NaN;
    }
  }, [height]);

  return (
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
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
          <span className="label-text">Radius</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(radiusKonvensional)}
        />
      </label>
    </form>
  );
};

export default RadiusKonvensional;
