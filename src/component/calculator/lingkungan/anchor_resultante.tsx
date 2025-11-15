"use client";

import { useEffect, useMemo, useState } from "react";
import { Lingkungan } from "../../_utils/calculation";
import classNames from "classnames";
import { z } from "zod";
import useNumber from "@/app/calculator/_hooks/useNumber";
import { NumberFormatter } from "@internationalized/number";

const AnchorResultantePropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type AnchorResultanteProps = z.input<typeof AnchorResultantePropsSchema>;

const AnchorResultante = (props: AnchorResultanteProps) => {
  const zProps = AnchorResultantePropsSchema.parse(props);

  const [alphaRef, alpha, alphaError] = useNumber(zProps.locale);
  const [massRef, mass, massError] = useNumber(zProps.locale);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [alpha, mass]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const resultante = useMemo(() => {
    try {
      return Lingkungan.anchorResultante(alpha, mass);
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
          ref={alphaRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": alphaError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Mass</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          ref={massRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": massError != null,
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
          <span className="label-text">Resultante</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(resultante)}
        />
      </label>
    </form>
  );
};

export default AnchorResultante;
