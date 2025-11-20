import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Forklift, General } from "@/util/calculator/mod.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";
import {
  CalculatorBody,
  CalculatorRoot,
  CalculatorTitle,
} from "@/component/card/calculator/mod.tsx";

export type ForkliftSWLForkProps = {
  className?: string;
  locale: string;
};

const ForkliftSWLForkPropsSchema = z.object({
  className: z.string().optional(),
  locale: z.string(),
}) as z.ZodType<ForkliftSWLForkProps>;

export const ForkliftSWLFork = (props: ForkliftSWLForkProps) => {
  const zProps = ForkliftSWLForkPropsSchema.parse(props);

  const [capacityRef, capacity, capacityError] = useNumber(zProps.locale);
  const [cog2forkRef, cog2fork, cog2forkError] = useNumber(zProps.locale);
  const [loadCenterFork, setLoadCenterFork] = useState(55);
  const [weightRef, weight, weightError] = useNumber(zProps.locale);
  const [loadCenterWeightRef, loadCenterWeight, loadCenterWeightError] =
    useNumber(zProps.locale);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [capacity, cog2fork, loadCenterFork, weight, loadCenterWeight]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const swl = useMemo(() => {
    try {
      return Forklift.swlFork(
        capacity,
        cog2fork,
        loadCenterFork,
        loadCenterWeight,
      );
    } catch {
      return NaN;
    }
  }, [capacity, cog2fork, loadCenterFork, loadCenterWeight]);

  const maxLoadCenterWeight = useMemo(() => {
    try {
      return Forklift.maxLoadCenterWeight(
        capacity,
        cog2fork,
        weight,
        loadCenterFork,
      );
    } catch {
      return NaN;
    }
  }, [capacity, cog2fork, weight, loadCenterFork]);

  const weightPercentToSwl = useMemo(() => {
    try {
      return General.weightToSwlRatio(swl, weight) * 100;
    } catch {
      return NaN;
    }
  }, [swl, weight]);

  return (
    <CalculatorRoot className={zProps.className}>
      <CalculatorTitle>Forklift - SWL Fork</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameter</legend>
          <label className="label text-black">Kapasitas (A)</label>
          <label
            className={cn("input input-bordered w-full", {
              "input-error": capacityError != null,
            })}
          >
            <input
              ref={capacityRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{kg}" />
            </span>
          </label>
          <label className="label text-black">
            Jarak COG ke Muka Fork (B)
          </label>
          <label
            className={cn("input input-bordered w-full", {
              "input-error": cog2forkError != null,
            })}
          >
            <input
              ref={cog2forkRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{cm}" />
            </span>
          </label>
          <label className="label text-black">Load Center Fork</label>
          <select
            className="select select-bordered w-full text-right"
            value={loadCenterFork}
            onChange={(e) => {
              setLoadCenterFork(parseFloat(e.target.value));
            }}
          >
            <option value="55">55 cm</option>
            <option value="60">60 cm</option>
          </select>
          <label className="label text-black">Berat Beban Uji (D)</label>
          <label
            className={cn("input input-bordered w-full", {
              "input-error": weightError != null,
            })}
          >
            <input
              ref={weightRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{kg}" />
            </span>
          </label>
          <label className="label text-black">Load Center Beban (E)</label>
          <label
            className={cn("input input-bordered w-full", {
              "input-error": loadCenterWeightError != null,
            })}
          >
            <input
              ref={loadCenterWeightRef}
              className="text-right"
              placeholder="0"
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{cm}" />
            </span>
          </label>
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
          <label className="label text-black">SWL Fork</label>
          <label className="input input-bordered w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(swl)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{kg}" />
            </span>
          </label>
          <label className="label text-black">
            Load Center ketika 100% SWL
          </label>
          <label className="input input-bordered w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(maxLoadCenterWeight)}
            />
            <span className="label text-black">
              <InlineMath math="\mathrm{cm}" />
            </span>
          </label>
          <label className="label text-black">Nilai Pengujian</label>
          <label className="input input-bordered w-full">
            <input
              type="tel"
              readOnly
              className="text-right"
              value={numberFormatter.format(weightPercentToSwl)}
            />
            <span className="label text-black">
              % SWL
            </span>
          </label>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Reference</legend>
          <img className="w-full" src="/img/swl_fork-0.png" alt="reference" />
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
