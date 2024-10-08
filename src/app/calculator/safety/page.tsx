"use client";
import { useMemo, useState, ReactNode } from "react";
import TangkiTimbun from "./_components/tangki_timbun";
import InstalasiPenyalurPetir from "./_components/instalasi_penyalur_petir";
import Lingkungan from "./_components/lingkungan";
import Chain from "./_components/chain";
import Forklift from "./_components/forklfit";
import Rope from "./_components/rope";
import Hydrant from "./_components/hydrant";

const calculator: Record<string, ReactNode> = {
  "Chain - SWL Block": <Chain.SWLBlock />,
  "Chain - SWL Sling": <Chain.SWLSling />,
  "Forklift - SWL Fork": <Forklift.SWLFork />,
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
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">{Calculator}</div>
      </div>
    </div>
  );
};

export default SafetyCalculator;
