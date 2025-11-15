import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";

import { Chain } from "@/util/calculation.ts";
import { cn } from "@/util/classname.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const SWLBlockPropsScheam = z.object({
  locale: z.string().optional().default("en-US"),
});

export type SWLBlockProps = z.input<typeof SWLBlockPropsScheam>;

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
    <form className="prose">
      <h2>Parameter</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={diameterRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": diameterError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Reaving Number</span>
        </div>
        <input
          ref={reavingNumberRef}
          className={cn("input input-bordered w-full text-right", {
            "input-error": reavingNumberError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Grade</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={grade}
          onChange={(e) => {
            setGrade(parseInt(e.target.value));
          }}
        >
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
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
          <span className="label-text">SWL</span>
          <span className="label-text-alt">ton</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(swl)}
        />
      </label>
    </form>
  );
};
