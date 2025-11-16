import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { NumberFormatter } from "@internationalized/number";
import { InlineMath } from "react-katex";

import { cn } from "@/util/classname.ts";
import { APAR, General } from "@/util/calculation/mod.ts";
import { useNumber } from "@/hook/useNumber.tsx";

const MinUnitPropsSchema = z.object({
  locale: z.string().optional().default("en-US"),
});

export type MinUnitProps = z.input<typeof MinUnitPropsSchema>;

export const MinUnit = (props: MinUnitProps) => {
  const zProps = MinUnitPropsSchema.parse(props);

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
    <form>
      <h2>Parameter</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Type</legend>
        <select
          className="select select-bordered w-full text-right"
          value={kind}
          onChange={(e) => {
            setKind(e.target.value);
          }}
        >
          <option value="direct_input">Direct Input</option>
          <option value="calculate">Calculate</option>
        </select>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: kind != "direct_input",
        })}
      >
        <legend className="fieldset-legend">Area</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": directInputError != null,
          })}
        >
          <input
            ref={directInputRef}
            className="grow text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}^2" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: kind != "calculate",
        })}
      >
        <legend className="fieldset-legend">Height</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": heightError != null,
          })}
        >
          <input
            ref={heightRef}
            className="grow text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
          </span>
        </label>
      </fieldset>
      <fieldset
        className={cn("fieldset", {
          hidden: kind != "calculate",
        })}
      >
        <legend className="fieldset-legend">Width</legend>
        <label
          className={cn("input input-bordered w-full", {
            "input-error": widthError != null,
          })}
        >
          <input
            ref={widthRef}
            className="grow text-right"
            placeholder="0"
          />
          <span className="label">
            <InlineMath math="\mathrm{m}" />
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
      <fieldset
        className={cn("fieldset", {
          hidden: kind != "calculate",
        })}
      >
        <legend className="fieldset-legend">Area</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(area)}
          />
          <span className="label">
            <InlineMath math="\mathrm{m}^2" />
          </span>
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Number of APAR</legend>
        <label className="input input-bordered w-full">
          <input
            type="tel"
            readOnly
            className="text-right"
            value={numberFormatter.format(numOfAPAR)}
          />
          <span className="label">unit</span>
        </label>
      </fieldset>
    </form>
  );
};
