"use client";

import { useEffect, useMemo, useState } from "react";
import { TangkiTimbun } from "../../_utils/calculation";
import convert from "convert-units";
import classNames from "classnames";
import useNumber from "@/app/calculator/_hooks/useNumber";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";

const ThicknessPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type ThicknessProps = z.input<typeof ThicknessPropsSchema>;

const Thickness = (props: ThicknessProps) => {
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
    } catch (error) {
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
    <form className="prose">
      <h2>Standart</h2>
      <label className="form-control w-full">
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
      </label>
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={diameterRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": diameterError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter Type</span>
        </div>
        <select className="select select-bordered w-full text-right">
          <option>Inner</option>
          <option>Outter</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Design Liquid Level</span>
          <span className="label-text-alt">meter</span>
        </div>
        <input
          ref={designLiquidLevelRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": designLiquidLevelError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Design Specific Gravity Liquid</span>
        </div>
        <input
          ref={designSpecificGravityLiquidRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": designSpecificGravityLiquidError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Allowable Stress</span>
          <span className="label-text-alt">mega pascal</span>
        </div>
        <input
          ref={allowableStressRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": allowableStressError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Corrosion Allowance</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={corrosionAllowableRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": corrosionAllowableError != null,
          })}
          placeholder="0"
        />
      </label>
      <div className="divider">Note</div>
      <label className="form-control w-full">
        <textarea
          className={classNames("textarea textarea-bordered h-24", {
            "textarea-error": edited,
          })}
          onClick={handleNoteClick}
        ></textarea>
      </label>
      <h2>Result</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Minimum Required Thickness</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(minimum_required_thickness)}
        />
      </label>
    </form>
  );
};

export default Thickness;
