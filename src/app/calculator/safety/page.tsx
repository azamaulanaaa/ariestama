"use client";

import { useMemo, useState, ReactNode, useEffect } from "react";
import TangkiTimbun from "./_components/tangki_timbun";
import InstalasiPenyalurPetir from "./_components/instalasi_penyalur_petir";
import Lingkungan from "./_components/lingkungan";
import Chain from "./_components/chain";
import Forklift from "./_components/forklfit";
import Rope from "./_components/rope";
import Hydrant from "./_components/hydrant";
import Girder from "./_components/girder";
import General from "./_components/general";
import { useToBlob } from "@hugocxl/react-to-image";
import Boiler from "./_components/boiler";

const calculator: Record<string, ReactNode> = {
  "Boiler - Water Tube - Thickness": <Boiler.WaterTubeThickness />,
  "Chain - SWL Block": <Chain.SWLBlock />,
  "Chain - SWL Sling": <Chain.SWLSling />,
  "Forklift - SWL Fork": <Forklift.SWLFork />,
  "General - Volume": <General.Volume />,
  "Girder - Deflection": <Girder.Deflection />,
  "Hydrant - Reservoir": <Hydrant.Reservoir />,
  "Instalasi Penyalur Petir - Radius Konvensional": (
    <InstalasiPenyalurPetir.RadiusConventional />
  ),
  "Lingkungan - Anchor Resultante": <Lingkungan.AnchorResultante />,
  "Rope - SWL Wire": <Rope.SwlRunningRope />,
  "Tangki Timbun - Thickness": <TangkiTimbun.Thickness />,
};

const SafetyCalculator = () => {
  const [type, setType] = useState<string>("Tangki Timbun - Thickness");

  const Calculator = useMemo(() => calculator[type] || "", [type]);

  const [state, convert, captureRef] = useToBlob<HTMLDivElement>();
  useEffect(() => {
    if (state.data && state.isSuccess) {
      const file = new File([state.data], "image.png", { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file] }).catch(() => {});
      }
    }
  }, [state.isSuccess]);

  return (
    <div className="flex flex-col gap-2 m-2 mx-auto max-w-[500px]">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <select
            className="select select-bordered w-full"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            {Object.keys(calculator)
              .sort()
              .map((key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div ref={captureRef} className="card bg-base-100 shadow-xl">
        <div className="card-body relative">
          <div className="absolute inset-0 z-0 opacity-10 rounded-2xl bg-[url('/img/logo.png')] bg-top"></div>
          <div className="relative z-1 prose">
            <h1>{type}</h1>
            {Calculator}
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body flex gap-2">
          <button className="btn" onClick={convert}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyCalculator;
