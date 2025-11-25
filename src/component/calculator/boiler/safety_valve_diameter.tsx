import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Boiler, General } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.ts";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type BoilerSafetyValveDiameterProps = {
  className?: string;
  locale: string;
};

const BoilerSafetyValveDiameterPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<BoilerSafetyValveDiameterProps>;

export const BoilerSafetyValveDiameter = (
  props: BoilerSafetyValveDiameterProps,
) => {
  const zProps = BoilerSafetyValveDiameterPropsSchema.parse(props);

  const [standart, setStandart] = useState("grondslagen");
  const [pressureRef, pressure, pressureError] = useNumber(zProps.locale);

  const [areaChamberKind, setAreaChamberKind] = useState("direct_input");
  const [
    directInputAreaChamberRef,
    directInputAreaChamber,
    directInputAreaChamberError,
  ] = useNumber(
    zProps.locale,
  );
  const [radiusChamberRef, radiusChamber, radiusChamberError] = useNumber(
    zProps.locale,
  );
  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [directInputAreaChamber, pressure]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const areaChamber = useMemo(() => {
    switch (areaChamberKind) {
      case "direct_input":
        return directInputAreaChamber;
      case "calculate":
        return General.areaCircle(radiusChamber);
      default:
        return NaN;
    }
  }, [areaChamberKind, directInputAreaChamber, radiusChamber]);
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
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Boiler - Safety Valve Diameter</CalculatorTitle>
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
            <option value="grondslagen">Grondslagen</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black dark:text-white">Pressure</label>
          <label
            className={cn("input w-full", {
              "input-error": pressureError != null,
            })}
          >
            <input
              ref={pressureRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black dark:text-white">
              <InlineMath math="\mathrm{kgf}/\mathrm{cm}^2" />
            </span>
          </label>
          <label className="label text-black dark:text-white">
            Chamber Area Kind
          </label>
          <select
            className="select w-full"
            value={areaChamberKind}
            onChange={(e) => {
              setAreaChamberKind(e.target.value);
            }}
          >
            <option value="direct_input">Direct Input</option>
            <option value="calculate">Calculate</option>
          </select>
          <div
            className={cn({
              hidden: areaChamberKind != "direct_input",
            })}
          >
            <label className="label text-black dark:text-white">
              Chamber Area
            </label>
            <label
              className={cn("input w-full", {
                "input-error": directInputAreaChamberError != null,
              })}
            >
              <input
                ref={directInputAreaChamberRef}
                className="text-right"
                placeholder="0"
              />
              <span className="label text-black dark:text-white">
                <InlineMath math="\mathrm{m}^2" />
              </span>
            </label>
          </div>
          <div
            className={cn({
              hidden: areaChamberKind != "calculate",
            })}
          >
            <label className="label text-black dark:text-white">
              Chamber Radius
            </label>
            <label
              className={cn("input w-full", {
                "input-error": radiusChamberError != null,
              })}
            >
              <input
                ref={radiusChamberRef}
                className="text-right"
                placeholder="0"
              />
              <span className="label text-black dark:text-white">
                <InlineMath math="\mathrm{m}" />
              </span>
            </label>
          </div>
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
          <div
            className={cn({
              hidden: areaChamberKind != "calculate",
            })}
          >
            <label className="label text-black dark:text-white">
              Chamber Area
            </label>
            <label className="input w-full">
              <input
                type="tel"
                readOnly
                className="text-right"
                value={numberFormatter.format(areaChamber)}
              />
              <span className="label text-black dark:text-white">
                <InlineMath math="\mathrm{mm}" />
              </span>
            </label>
          </div>
          <label className="label text-black dark:text-white">
            Minimum Diameter
          </label>
          <label className="input w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(minDiameterSafetyValve)}
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
