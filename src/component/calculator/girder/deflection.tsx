import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Girder } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const DeflectionPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type DeflectionProps = z.input<typeof DeflectionPropsSchema>;

export const Deflection = (props: DeflectionProps) => {
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
    } catch {
      return NaN;
    }
  }, [typee, lengthOfSpan]);

  return (
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Type</legend>
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
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Length of Span</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": lengthOfSpanError != null,
          })}
        >
          <input
            ref={lengthOfSpanRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
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
        <legend className="fieldset-legend">Max Deflection</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(deflection)}
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
