import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Lingkungan } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.ts";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type LingkunganAnchorResultanteProps = {
  className?: string;
  locale: string;
};

const LingkunganAnchorResultantePropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<LingkunganAnchorResultanteProps>;

export const LingkunganAnchorResultante = (
  props: LingkunganAnchorResultanteProps,
) => {
  const zProps = LingkunganAnchorResultantePropsSchema.parse(props);

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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Lingkungan - Anchor Resultante</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Alpha</label>
          <label
            className={cn("input w-full", {
              "input-error": alphaError != null,
            })}
          >
            <input
              ref={alphaRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{degree}" />
            </span>
          </label>
          <label className="label text-black">Mass</label>
          <label
            className={cn("input w-full", {
              "input-error": massError != null,
            })}
          >
            <input
              ref={massRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{kg}" />
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
          <label className="label text-black">Resultante</label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(resultante)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{kg}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
