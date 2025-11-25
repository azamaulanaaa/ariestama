import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { InstalasiPenyalurPetir } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.ts";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type IPPRadiusConvensionalProps = {
  className?: string;
  locale: string;
};

const IPPRadiusConvensionalPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<IPPRadiusConvensionalProps>;

export const IPPRadiusConventional = (props: IPPRadiusConvensionalProps) => {
  const zProps = IPPRadiusConvensionalPropsSchema.parse(props);

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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>
        Instalasi Penyalur Petir - Radius Conventional
      </CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black dark:text-white">Height</label>
          <label
            className={cn("input w-full", {
              "input-error": heightError != null,
            })}
          >
            <input
              ref={heightRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{m}" />
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
          <label className="label text-black dark:text-white">Radius</label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(radiusKonvensional)}
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{m}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
