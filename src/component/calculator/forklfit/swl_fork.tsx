import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";

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
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Kapasitas (A)</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          ref={capacityRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": capacityError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Jarak COG ke Muka Fork (B)</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <input
          ref={cog2forkRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": cog2forkError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Load Center Fork</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={loadCenterFork}
          onChange={(e) => {
            setLoadCenterFork(parseFloat(e.target.value));
          }}
        >
          <option value="55">55</option>
          <option value="60">60</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Berat Beban Uji (D)</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          ref={weightRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": weightError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Load Center Beban (E)</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <input
          ref={loadCenterWeightRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": loadCenterWeightError != null,
          })}
          placeholder="0"
        />
      </label>
      <div className="divider">Note</div>
      <label className="form-control w-full">
        <textarea
          className={cn("textarea textarea-bordered h-24", {
            "textarea-error": edited,
          })}
          onClick={handleNoteClick}
        >
        </textarea>
      </label>
      <h2>Result</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">SWL Fork</span>
          <span className="label-text-alt">kilo gram</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(swl)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Load Center ketika 100% SWL</span>
          <span className="label-text-alt">centi meter</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(maxLoadCenterWeight)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Nilai Pengujian</span>
          <span className="label-text-alt">% SWL</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(weightPercentToSwl)}
        />
      </label>
      <h2>Reference</h2>
      <img className="w-full" src="/img/swl_fork-0.png" alt="reference" />
    </form>
  );
};
