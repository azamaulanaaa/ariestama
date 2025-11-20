import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { cn } from "@/util/classname.ts";
import { APAR, General } from "@/util/calculator/mod.ts";
import { useNumber } from "@/hook/useNumber.tsx";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type APARUnitCountProps = {
  locale: string;
  className?: string;
};

const APARUnitCountPropsSchema = z.object({
  locale: z.string(),
  className: z.string().optional(),
}) as z.ZodType<APARUnitCountProps>;

export const APARUnitCount = (props: APARUnitCountProps) => {
  const zProps = APARUnitCountPropsSchema.parse(props);

  const [kind, setKind] = useState("direct_input");
  const [heightRef, height, heightError] = useNumber(zProps.locale);
  const [widthRef, width, widthError] = useNumber(zProps.locale);
  const [directInputRef, directInput, directInputError] = useNumber(
    zProps.locale,
  );

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [height, width, directInput]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const area = useMemo(() => {
    try {
      if (kind == "direct_input") return directInput;
      if (kind == "calculate") return General.areaRectangular(height, width);
      return NaN;
    } catch {
      return NaN;
    }
  }, [kind, height, width, directInput]);

  const numOfAPAR = useMemo(() => {
    try {
      return APAR.minUnit(area);
    } catch {
      return NaN;
    }
  }, [area]);

  return (
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Alat Pemadam Api Ringan - Unit Count</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">
            Kind of Coverage Area
          </label>
          <select
            className="select w-full"
            value={kind}
            onChange={(e) => {
              setKind(e.target.value);
            }}
          >
            <option value="direct_input">Direct Input</option>
            <option value="calculate">Calculate</option>
          </select>
          <div className={cn({ hidden: kind != "direct_input" })}>
            <label className="label text-black">
              Coverage Area
            </label>
            <label
              className={cn("input w-full", {
                "input-error": directInputError !== null,
              })}
            >
              <input
                ref={directInputRef}
                className="text-right"
                placeholder="0"
              />{" "}
              <span className="label text-black">
                <InlineMath math="\mathrm{m}^2" />
              </span>
            </label>
          </div>
          <div className={cn({ hidden: kind != "calculate" })}>
            <label className="label text-black">Coverage Height</label>
            <label
              className={cn("input w-full", {
                "input-error": heightError !== null,
              })}
            >
              <input
                ref={heightRef}
                className="text-right"
                placeholder="0"
              />
              <span className="label text-black">
                <InlineMath math="\mathrm{m}" />
              </span>
            </label>
            <label className="label text-black">Coverage Width</label>
            <label
              className={cn("input w-full", {
                "input-error": widthError !== null,
              })}
            >
              <input
                ref={widthRef}
                className="text-right"
                placeholder="0"
              />
              <span className="label text-black">
                <InlineMath math="\mathrm{m}" />
              </span>
            </label>
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Note</legend>
          <textarea
            className={cn("textarea textarea-bordered h-24 w-full", {
              "textarea-error": edited,
            })}
            onClick={handleNoteClick}
          >
          </textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Result</legend>
          <div className={cn({ hidden: kind != "calculate" })}>
            <label className="label text-black">
              Coverage Area
            </label>
            <label className="input w-full">
              <input
                type="tel"
                readOnly
                className="text-right"
                value={numberFormatter.format(area)}
              />
              <span className="label text-black">
                <InlineMath math="\mathrm{m}^2" />
              </span>
            </label>
          </div>
          <label className="label text-black">Minimum Unit Count</label>
          <input
            type="tel"
            readOnly
            className="input w-full text-right"
            value={numberFormatter.format(numOfAPAR)}
          />
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
