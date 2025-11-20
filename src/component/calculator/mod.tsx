import { forwardRef, ReactNode } from "react";
import { z } from "zod";

import { Forklift } from "@/component/calculator/forklfit/mod.tsx";
import { General } from "@/component/calculator/general/mod.tsx";
import { Girder } from "@/component/calculator/girder/mod.tsx";
import { Hydrant } from "@/component/calculator/hydrant/mod.tsx";
import { InstalasiPenyalurPetir } from "@/component/calculator/instalasi_penyalur_petir/mod.tsx";
import { Lingkungan } from "@/component/calculator/lingkungan/mod.tsx";
import { Rope } from "@/component/calculator/rope/mod.tsx";
import { TangkiTimbun } from "@/component/calculator/tangki_timbun/mod.tsx";

type InnerCalculatorProps = { locale: string };
type InnerCalculator = <T extends InnerCalculatorProps>(props: T) => ReactNode;

export enum CalculatorKind {
  Forklift_SwlFork = "Forklift - SWL Fork",
  General_Volume = "General - Volume",
  Girder_Deflection = "Girder - Deflection",
  Hydrant_Reservoir = "Hydrant - Reservoir",
  InstalsiPenyalurPetir_RadiusConventional =
    "Instalasi Penyalur Petir - Radius Conventional",
  Lingkungan_AnchorResultante = "Lingkungan - Anchor Resultante",
  Rope_SwlWireRope = "Rope - SWL Wire Rope",
  TangkiTimun_Thickness = "Tangki Timbun - Thickness",
}

const InnerCalculatorMap: Record<CalculatorKind, InnerCalculator> = {
  [CalculatorKind.Forklift_SwlFork]: Forklift.SWLFork,
  [CalculatorKind.General_Volume]: General.Volume,
  [CalculatorKind.Girder_Deflection]: Girder.Deflection,
  [CalculatorKind.Hydrant_Reservoir]: Hydrant.Reservoir,
  [CalculatorKind.InstalsiPenyalurPetir_RadiusConventional]:
    InstalasiPenyalurPetir.RadiusConventional,
  [CalculatorKind.Lingkungan_AnchorResultante]: Lingkungan.AnchorResultante,
  [CalculatorKind.Rope_SwlWireRope]: Rope.SwlWireRope,
  [CalculatorKind.TangkiTimun_Thickness]: TangkiTimbun.Thickness,
};

const CalculatorPropsSchema = z.object({
  kind: z.enum(CalculatorKind),
  locale: z.string().optional().default("en-US"),
});
export type CalculatorProps = z.input<typeof CalculatorPropsSchema>;

export const Calculator = forwardRef((props: CalculatorProps, ref) => {
  const zProps = CalculatorPropsSchema.parse(props);

  const InnerCalculator = InnerCalculatorMap[zProps.kind];

  return (
    <div ref={ref} className="card bg-base-100 shadow-xl">
      <div className="card-body relative">
        <div className="absolute inset-0 z-0 opacity-10 rounded-2xl bg-[url('/img/logo.png')] bg-top">
        </div>
        <div className="relative z-1 prose max-w-none">
          <h1>{zProps.kind}</h1>
          <InnerCalculator locale={zProps.locale} />
        </div>
      </div>
    </div>
  );
});
