import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Girder } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.ts";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type GirderDeflectionProps = {
  className?: string;
  locale: string;
};

const GirderDeflectionPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<GirderDeflectionProps>;

export const GirderDeflection = (props: GirderDeflectionProps) => {
  const zProps = GirderDeflectionPropsSchema.parse(props);

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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Gider - Deflection</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black dark:text-white">Type</label>
          <select
            className="select w-full text-right"
            value={typee}
            onChange={(e) => {
              setTypee(e.target.value);
            }}
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
          </select>
          <label className="label text-black dark:text-white">
            Length of Span
          </label>
          <label
            className={cn("input w-full", {
              "input-error": lengthOfSpanError != null,
            })}
          >
            <input
              ref={lengthOfSpanRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Note</legend>
          <textarea
            className={cn("textarea h-24 w-full", {
              "textarea-error": edited,
            })}
            onClick={handleNoteClick}
          >
          </textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Result</legend>
          <label className="label text-black dark:text-white">
            Max Deflection
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(deflection)}
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
