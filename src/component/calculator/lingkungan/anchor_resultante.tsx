import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Lingkungan } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const AnchorResultantePropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type AnchorResultanteProps = z.input<typeof AnchorResultantePropsSchema>;

export const AnchorResultante = (props: AnchorResultanteProps) => {
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
    } catch {
      return NaN;
    }
  }, [alpha, mass]);

  return (
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Alpha</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": alphaError != null,
          })}
        >
          <input
            ref={alphaRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{degree}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Mass</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": massError != null,
          })}
        >
          <input
            ref={massRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{kg}" />
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
        <legend className="fieldset-legend">Resultante</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(resultante)}
          />
          <span className="label">
            <InlineMath math="\mathrm{kg}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
