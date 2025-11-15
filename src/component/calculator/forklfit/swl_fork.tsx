import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { Forklift, General } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const SWLForkPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type SWLForkProps = z.input<typeof SWLForkPropsSchema>;

export const SWLFork = (props: SWLForkProps) => {
  const zProps = SWLForkPropsSchema.parse(props);

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
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Kapasitas (A)</legend>
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
          <span className="label">
            <InlineMath math="\mathrm{kg}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Jarak COG ke Muka Fork (B)
        </legend>
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
          <span className="label">
            <InlineMath math="\mathrm{cm}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Load Center Fork</legend>
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
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Berat Beban Uji (D)</legend>
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
          <span className="label">
            <InlineMath math="\mathrm{kg}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Load Center Beban (E)</legend>
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
          <span className="label">
            <InlineMath math="\mathrm{cm}" />
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
        <legend className="fieldset-legend">SWL Fork</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(swl)}
          />
          <span className="label">
            <InlineMath math="\mathrm{kg}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Load Center ketika 100% SWL</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(maxLoadCenterWeight)}
          />
          <span className="label">
            <InlineMath math="\mathrm{cm}" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nilai Pengujian</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(weightPercentToSwl)}
          />
          <span className="label">
            % SWL
          </span>
        </label>
      </fieldset>
      <h2>Reference</h2>
      <img className="w-full" src="/img/swl_fork-0.png" alt="reference" />
    </form>
  );
};
