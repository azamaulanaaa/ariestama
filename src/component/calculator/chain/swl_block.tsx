import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Chain } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type SWLBlockProps = {
  className?: string;
  locale: string;
};

const SWLBlockPropsScheam = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<SWLBlockProps>;

export const SWLBlock = (props: SWLBlockProps) => {
  const zProps = SWLBlockPropsScheam.parse(props);

  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [reavingNumberRef, reavingNumber, reavingNumberError] = useNumber(
    zProps.locale,
  );
  const [grade, setGrade] = useState(80);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [diameter, reavingNumber, grade]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const swl = useMemo(() => {
    try {
      return Chain.swlBlock(diameter, reavingNumber, grade);
    } catch {
      return NaN;
    }
  }, [diameter, reavingNumber, grade]);

  return (
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Chain - SWL Block</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Diameter</label>
          <label
            className={cn("input w-full", {
              "input-error": diameterError != null,
            })}
          >
            <input
              ref={diameterRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{mm}" />
            </span>
          </label>
          <label className="label text-black">Reaving Number</label>
          <input
            ref={reavingNumberRef}
            className={cn("input w-full text-right", {
              "input-error": reavingNumberError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black">Grade</label>
          <select
            className="select w-full text-right"
            value={grade}
            onChange={(e) => {
              setGrade(parseInt(e.target.value));
            }}
          >
            <option value="80">80</option>
            <option value="100">100</option>
          </select>
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
          <label className="label text-black">Safety Working Load (SWL)</label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(swl)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{ton}" />
            </span>
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
