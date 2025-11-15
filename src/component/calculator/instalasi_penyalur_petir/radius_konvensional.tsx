import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";

import { InstalasiPenyalurPetir } from "@/util/calculation.ts";
import { cn } from "@/util/classname.tsx";
import { useNumber } from "@/hook/useNumber.tsx";

const RadiusConvensionalPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type RadiusConvensionalProps = z.input<
  typeof RadiusConvensionalPropsSchema
>;

export const RadiusConventional = (props: RadiusConvensionalProps) => {
  const zProps = RadiusConvensionalPropsSchema.parse(props);

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
    } catch {
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
          className={cn("input input-bordered w-full text-right", {
            "input-error": heightError != null,
          })}
          placeholder="0"
        />
      </label>
      <div className="divider">Note</div>
      <label className="form-control w-full">
        <textarea
          className={cn("textarea textarea-bordered h-24", {
            "textarea-error": edited,
          })}
          onClick={handleNoteClick}
        >
        </textarea>
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
