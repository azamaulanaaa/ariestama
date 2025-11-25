import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { TangkiTimbun } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.ts";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type TangkiTimbunThicknessProps = {
  className?: string;
  locale: string;
};

const TangkiTimbunThicknessPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<TangkiTimbunThicknessProps>;

export const TangkiTimbunThickness = (props: TangkiTimbunThicknessProps) => {
  const zProps = TangkiTimbunThicknessPropsSchema.parse(props);

  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [designLiquidLevelRef, designLiquidLevel, designLiquidLevelError] =
    useNumber(zProps.locale);
  const [
    designSpecificGravityLiquidRef,
    designSpecificGravityLiquid,
    designSpecificGravityLiquidError,
  ] = useNumber(zProps.locale);
  const [allowableStressRef, allowableStress, allowableStressError] = useNumber(
    zProps.locale,
  );
  const [corrosionAllowableRef, corrosionAllowable, corrosionAllowableError] =
    useNumber(zProps.locale);
  const [standart, setStandart] = useState("api-650");

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [
    diameter,
    designLiquidLevel,
    designSpecificGravityLiquid,
    allowableStress,
    corrosionAllowable,
    standart,
  ]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const minimum_required_thickness = useMemo(() => {
    try {
      return TangkiTimbun.thickness(
        diameter,
        designLiquidLevel,
        designSpecificGravityLiquid,
        allowableStress,
        corrosionAllowable,
      );
    } catch {
      return NaN;
    }
  }, [
    diameter,
    designLiquidLevel,
    designSpecificGravityLiquid,
    allowableStress,
    corrosionAllowable,
  ]);

  return (
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Tangki Timbun - Thickness</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Standart</legend>
          <select
            className="select w-full text-right"
            value={standart}
            onChange={(e) => {
              setStandart(e.target.value);
            }}
          >
            <option value="api-650">
              American Petroleum Institute (API) - 650
            </option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black dark:text-white">Diameter</label>
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
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{m}" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Diameter Type
          </label>
          <select className="select w-full text-right">
            <option>Inner</option>
            <option>Outter</option>
          </select>
          <label className="label text-black dark:text-white">
            Design Liquid Level
          </label>
          <label
            className={cn("input w-full", {
              "input-error": designLiquidLevelError != null,
            })}
          >
            <input
              ref={designLiquidLevelRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{m}" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Design Specific Gravity Liquid
          </label>
          <input
            ref={designSpecificGravityLiquidRef}
            className={cn("input w-full text-right", {
              "input-error": designSpecificGravityLiquidError != null,
            })}
            placeholder="0"
          />
          <label className="label text-black dark:text-white">
            Allowable Stress
          </label>
          <label
            className={cn("input w-full", {
              "input-error": allowableStressError != null,
            })}
          >
            <input
              ref={allowableStressRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{MPa}" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Corrosion Allowance
          </label>
          <label
            className={cn("input w-full", {
              "input-error": corrosionAllowableError != null,
            })}
          >
            <input
              ref={corrosionAllowableRef}
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
            Minimum Required Thickness
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(minimum_required_thickness)}
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
