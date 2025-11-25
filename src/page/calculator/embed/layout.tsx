import { useEffect } from "react";
import { Outlet } from "react-router";

import { useShareAsImage } from "@/hook/useShareAsImage.ts";

export const CalculatorEmbedLayout = () => {
  const [shareRef, share] = useShareAsImage();

  useEffect(() => {
    document.title = "Calculator - Safety";
  }, []);

  return (
    <div className="flex flex-col gap-2 m-2 mx-auto max-w-[500px]">
      <div ref={shareRef}>
        <Outlet />
      </div>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <button type="button" className="btn" onClick={share}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
