import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { InstalasiPenyalurPetir } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
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
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Height</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": heightError != null,
          })}
        >
          <input
            ref={heightRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <div className="divider">Note</div>
      <textarea
        className={cn("textarea textarea-bordered h-24 w-full", {
          "textarea-error": edited,
        })}
        onClick={handleNoteClick}
      >
      </textarea>
      <h2>Result</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Radius</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(radiusKonvensional)}
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
