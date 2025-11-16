import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Boiler } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const SafetyValveDiameterPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type SafetyValveDiameterProps = z.input<
  typeof SafetyValveDiameterPropsSchema
>;

export const SafetyValveDiameter = (props: SafetyValveDiameterProps) => {
  const zProps = SafetyValveDiameterPropsSchema.parse(props);

  const [standart, setStandart] = useState("grondslagen");
  const [areaChamberRef, areaChamber, areaChamberError] = useNumber(
    zProps.locale,
  );
  const [pressureRef, pressure, pressureError] = useNumber(zProps.locale);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [areaChamber, pressure]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const minDiameterSafetyValve = useMemo(() => {
    try {
      return Boiler.minDiameterSafetyValve_Grondslagen(
        areaChamber,
        pressure,
      );
    } catch {
      return NaN;
    }
  }, [areaChamber, pressure]);
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
          <option value="grondslagen">Grondslagen</option>
        </select>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pressure</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": pressureError != null,
          })}
        >
          <input
            ref={pressureRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Area of Chamber
        </legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": areaChamberError != null,
          })}
        >
          <input
            ref={areaChamberRef}
            className="text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}^2" />
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
        <legend className="fieldset-legend">Minimum Diameter</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(minDiameterSafetyValve)}
          />
          <span className="label">
            <InlineMath math="\mathrm{mm}" />
          </span>
        </label>
      </fieldset>
    </form>
  );
};
