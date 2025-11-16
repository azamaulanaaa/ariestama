import { useEffect, useState } from "react";

import { Calculator, CalculatorKind } from "@/component/calculator/mod.tsx";
import { useShareAsImage } from "@/hook/useShareAsImage.tsx";

export const CalculatorPage = () => {
  const [kind, setKind] = useState<CalculatorKind>(CalculatorKind.Apar_MinUnit);
  const [shareRef, share] = useShareAsImage();

  useEffect(() => {
    document.title = "Calculator - Safety";
  }, []);

  return (
    <div className="flex flex-col gap-2 m-2 mx-auto max-w-[500px]">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <select
            className="select select-bordered w-full"
            value={kind}
            onChange={(e) => {
              setKind(e.target.value as CalculatorKind);
            }}
          >
            {Object.values(CalculatorKind)
              .sort()
              .map((key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
          </select>
        </div>
      </div>
      <Calculator ref={shareRef} kind={kind} locale="id-ID" />
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body flex gap-2">
          <button type="button" className="btn" onClick={share}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
