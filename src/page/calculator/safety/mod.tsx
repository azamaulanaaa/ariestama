import { ChangeEventHandler, ReactNode, useEffect, useState } from "react";

import { useShareAsImage } from "@/hook/useShareAsImage.tsx";

import { APARUnitCount } from "@/component/calculator/apar/unit_count.tsx";
import { BejanaTekanPipeThickness } from "@/component/calculator/bejana_tekan/pipe_thickness.tsx";
import { BoilerDrumWaterTubeThickness } from "@/component/calculator/boiler/drum_water_tube_thickness.tsx";
import { BoilerSafetyValveDiameter } from "@/component/calculator/boiler/safety_valve_diameter.tsx";
import { BoilerPipeThickness } from "@/component/calculator/boiler/pipe_thickness.tsx";
import { BoilerShellFireTubeThickness } from "@/component/calculator/boiler/shell_fire_tube_thickness.tsx";
import { BoilerTubeHoleThickness } from "@/component/calculator/boiler/tube_hole_thickness.tsx";
import { ChainSWLBlock } from "@/component/calculator/chain/swl_block.tsx";
import { ChainSWLSling } from "@/component/calculator/chain/swl_sling.tsx";
import { ForkliftSWLFork } from "@/component/calculator/forklfit/swl_fork.tsx";
import { GirderDeflection } from "@/component/calculator/girder/deflection.tsx";
import { GeneralVolume } from "@/component/calculator/general/volume.tsx";
import { HydrantReservoirCapacity } from "@/component/calculator/hydrant/reservoir_capacity.tsx";
import { IPPRadiusConventional } from "@/component/calculator/instalasi_penyalur_petir/radius_konvensional.tsx";
import { LingkunganAnchorResultante } from "@/component/calculator/lingkungan/anchor_resultante.tsx";
import { RopeSWLWireRope } from "@/component/calculator/rope/swl_wire_rope.tsx";
import { TangkiTimbunThickness } from "@/component/calculator/tangki_timbun/thickness.tsx";

enum CalculatorKind {
  APAR_UnitCount = "Alat Pemadam Api Ringan - Unit Count",
  BejanaTekan_PipeThickness = "Bejana Tekan - Pipe Thickness",
  Boiler_DrumWaterTubeThickness = "Boiler - Drum Water Tube Thickness",
  Boiler_PipeThickness = "Boiler - Pipe Thickness",
  Boiler_SafetyValveDiameter = "Boiler - Safety Valve Diameter",
  Boiler_ShellFireTubeThickness = "Boiler - Shell Fire Tube Thickness",
  Boiler_TubeHoleThickness = "Boiler - Tube Hole Thickness",
  Chain_SWLBlock = "Chain - SWL Bock",
  Chain_SWLSling = "Chain - SWL Sling",
  Forklift_SWLFork = "Forklift - SWL Fork",
  General_Volume = "General - Volume",
  Girder_Deflection = "Girder - Deflection",
  Hydrant_ReservoirCapacity = "Hydrant - Reservoir Capacity",
  IPP_RadiusConventional = "Instalasi Penyalur Petir - Radius Conventional",
  Lingkungan_AnchorResultante = "Linkungan - Anchor Resultante",
  Rope_SWLWireRope = "Rope - SWL Wire Rope",
  TangkiTimbun_PipeThickness = "Tangki Timbun - Pipe Thickness",
}

const CalculatorMap: Record<CalculatorKind, ReactNode> = {
  [CalculatorKind.APAR_UnitCount]: <APARUnitCount locale="id-ID" />,
  [CalculatorKind.BejanaTekan_PipeThickness]: (
    <BejanaTekanPipeThickness locale="id-ID" />
  ),
  [CalculatorKind.Boiler_DrumWaterTubeThickness]: (
    <BoilerDrumWaterTubeThickness locale="id-ID" />
  ),
  [CalculatorKind.Boiler_PipeThickness]: <BoilerPipeThickness locale="id-ID" />,
  [CalculatorKind.Boiler_SafetyValveDiameter]: (
    <BoilerSafetyValveDiameter locale="id-ID" />
  ),
  [CalculatorKind.Boiler_ShellFireTubeThickness]: (
    <BoilerShellFireTubeThickness locale="id-ID" />
  ),
  [CalculatorKind.Boiler_TubeHoleThickness]: (
    <BoilerTubeHoleThickness locale="id-ID" />
  ),
  [CalculatorKind.Chain_SWLBlock]: <ChainSWLBlock locale="id-ID" />,
  [CalculatorKind.Chain_SWLSling]: <ChainSWLSling locale="id-ID" />,
  [CalculatorKind.Forklift_SWLFork]: <ForkliftSWLFork locale="id-ID" />,
  [CalculatorKind.General_Volume]: <GeneralVolume locale="id-ID" />,
  [CalculatorKind.Girder_Deflection]: <GirderDeflection locale="id-ID" />,
  [CalculatorKind.Hydrant_ReservoirCapacity]: (
    <HydrantReservoirCapacity locale="id-ID" />
  ),
  [CalculatorKind.IPP_RadiusConventional]: (
    <IPPRadiusConventional locale="id-ID" />
  ),
  [CalculatorKind.Lingkungan_AnchorResultante]: (
    <LingkunganAnchorResultante locale="id-ID" />
  ),
  [CalculatorKind.Rope_SWLWireRope]: <RopeSWLWireRope locale="id-ID" />,
  [CalculatorKind.TangkiTimbun_PipeThickness]: (
    <TangkiTimbunThickness locale="id-ID" />
  ),
};

export const CalculatorPage = () => {
  const [kind, setKind] = useState<CalculatorKind>(
    CalculatorKind.APAR_UnitCount,
  );
  const [shareRef, share] = useShareAsImage();

  useEffect(() => {
    document.title = "Calculator - Safety";
  }, []);

  const handleSelectOnChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const target = event.target as HTMLSelectElement;
    const title = target.value as CalculatorKind;

    setKind(title);
  };

  return (
    <div className="flex flex-col gap-2 m-2 mx-auto max-w-[500px]">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <select className="select w-full" onChange={handleSelectOnChange}>
            {Object.values(CalculatorKind).sort().map((kind, index) => {
              return <option key={index} value={kind}>{kind}</option>;
            })}
          </select>
        </div>
      </div>
      <div ref={shareRef}>
        {CalculatorMap[kind]}
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
