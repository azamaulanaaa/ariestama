import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { TangkiTimbun } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const ThicknessPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type ThicknessProps = z.input<typeof ThicknessPropsSchema>;

export const Thickness = (props: ThicknessProps) => {
  const zProps = ThicknessPropsSchema.parse(props);

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
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Standart</legend>
        <select
          className="select select-bordered w-full text-right"
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
        <legend className="fieldset-legend">Diameter</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": diameterError != null,
          })}
        >
          <input
            ref={diameterRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Diameter Type</legend>
        <select className="select select-bordered w-full text-right">
          <option>Inner</option>
          <option>Outter</option>
        </select>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Design Liquid Level</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": designLiquidLevelError != null,
          })}
        >
          <input
            ref={designLiquidLevelRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Design Specific Gravity Liquid
        </legend>
        <input
          ref={designSpecificGravityLiquidRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": designSpecificGravityLiquidError != null,
          })}
          placeholder="0"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Allowable Stress</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": allowableStressError != null,
          })}
        >
          <input
            ref={allowableStressRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{MPa}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Corrosion Allowance</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": corrosionAllowableError != null,
          })}
        >
          <input
            ref={corrosionAllowableRef}
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
        <legend className="fieldset-legend">Minimum Required Thickness</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(minimum_required_thickness)}
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
