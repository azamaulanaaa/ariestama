import { BrowserRouter, Route, Routes } from "react-router";
import "@/app.css";

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
import { GeneralVolume } from "@/component/calculator/general/volume.tsx";
import { GirderDeflection } from "@/component/calculator/girder/deflection.tsx";
import { HydrantReservoirCapacity } from "@/component/calculator/hydrant/reservoir_capacity.tsx";
import { IPPRadiusConventional } from "@/component/calculator/instalasi_penyalur_petir/radius_konvensional.tsx";
import { LingkunganAnchorResultante } from "@/component/calculator/lingkungan/anchor_resultante.tsx";
import { RopeSWLWireRope } from "@/component/calculator/rope/swl_wire_rope.tsx";
import { TangkiTimbunThickness } from "@/component/calculator/tangki_timbun/thickness.tsx";
import { CalculatorLayout } from "@/page/calculator/layout.tsx";
import { CalculatorEmbedLayout } from "@/page/calculator/embed/layout.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="calculator">
          <Route element={<CalculatorLayout />}>
            <Route path="apar">
              <Route
                path="unit_count"
                element={<APARUnitCount locale="id-ID" />}
              />
            </Route>
            <Route path="bejana_tekan">
              <Route
                path="pipe_thickness"
                element={<BejanaTekanPipeThickness locale="id-ID" />}
              />
            </Route>
            <Route path="boiler">
              <Route
                path="drum_water_tube_thickness"
                element={<BoilerDrumWaterTubeThickness locale="id-ID" />}
              />
              <Route
                path="safety_valve_diameter"
                element={<BoilerSafetyValveDiameter locale="id-ID" />}
              />
              <Route
                path="shell_fire_tube_thickness"
                element={<BoilerShellFireTubeThickness locale="id-ID" />}
              />
              <Route
                path="pipe_thickness"
                element={<BoilerPipeThickness locale="id-ID" />}
              />
              <Route
                path="tube_hole_thickness"
                element={<BoilerTubeHoleThickness locale="id-ID" />}
              />
            </Route>
            <Route path="chain">
              <Route
                path="swl_block"
                element={<ChainSWLBlock locale="id-ID" />}
              />
              <Route
                path="swl_sling"
                element={<ChainSWLSling locale="id-ID" />}
              />
            </Route>
            <Route path="forklift">
              <Route
                path="swl_fork"
                element={<ForkliftSWLFork locale="id-ID" />}
              />
            </Route>
            <Route path="girder">
              <Route
                path="deflection"
                element={<GirderDeflection locale="id-ID" />}
              />
            </Route>
            <Route path="general">
              <Route path="volume" element={<GeneralVolume locale="id-ID" />} />
            </Route>
            <Route path="hydrant">
              <Route
                path="reservoir_capacity"
                element={<HydrantReservoirCapacity locale="id-ID" />}
              />
            </Route>
            <Route path="ipp">
              <Route
                path="radius_conventional"
                element={<IPPRadiusConventional locale="id-ID" />}
              />
            </Route>
            <Route path="lingkungan">
              <Route
                path="anchor_resultante"
                element={<LingkunganAnchorResultante locale="id-ID" />}
              />
            </Route>
            <Route path="rope">
              <Route
                path="swl_wire_rope"
                element={<RopeSWLWireRope locale="id-ID" />}
              />
            </Route>
            <Route path="tangki_timbun">
              <Route
                path="thickness"
                element={<TangkiTimbunThickness locale="id-ID" />}
              />
            </Route>
          </Route>
          <Route path="embed" element={<CalculatorEmbedLayout />}>
            <Route path="apar">
              <Route
                path="unit_count"
                element={<APARUnitCount locale="id-ID" />}
              />
            </Route>
            <Route path="bejana_tekan">
              <Route
                path="pipe_thickness"
                element={<BejanaTekanPipeThickness locale="id-ID" />}
              />
            </Route>
            <Route path="boiler">
              <Route
                path="drum_water_tube_thickness"
                element={<BoilerDrumWaterTubeThickness locale="id-ID" />}
              />
              <Route
                path="safety_valve_diameter"
                element={<BoilerSafetyValveDiameter locale="id-ID" />}
              />
              <Route
                path="shell_fire_tube_thickness"
                element={<BoilerShellFireTubeThickness locale="id-ID" />}
              />
              <Route
                path="pipe_thickness"
                element={<BoilerPipeThickness locale="id-ID" />}
              />
              <Route
                path="tube_hole_thickness"
                element={<BoilerTubeHoleThickness locale="id-ID" />}
              />
            </Route>
            <Route path="chain">
              <Route
                path="swl_block"
                element={<ChainSWLBlock locale="id-ID" />}
              />
              <Route
                path="swl_sling"
                element={<ChainSWLSling locale="id-ID" />}
              />
            </Route>
            <Route path="forklift">
              <Route
                path="swl_fork"
                element={<ForkliftSWLFork locale="id-ID" />}
              />
            </Route>
            <Route path="girder">
              <Route
                path="deflection"
                element={<GirderDeflection locale="id-ID" />}
              />
            </Route>
            <Route path="general">
              <Route path="volume" element={<GeneralVolume locale="id-ID" />} />
            </Route>
            <Route path="hydrant">
              <Route
                path="reservoir_capacity"
                element={<HydrantReservoirCapacity locale="id-ID" />}
              />
            </Route>
            <Route path="ipp">
              <Route
                path="radius_conventional"
                element={<IPPRadiusConventional locale="id-ID" />}
              />
            </Route>
            <Route path="lingkungan">
              <Route
                path="anchor_resultante"
                element={<LingkunganAnchorResultante locale="id-ID" />}
              />
            </Route>
            <Route path="rope">
              <Route
                path="swl_wire_rope"
                element={<RopeSWLWireRope locale="id-ID" />}
              />
            </Route>
            <Route path="tangki_timbun">
              <Route
                path="thickness"
                element={<TangkiTimbunThickness locale="id-ID" />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
