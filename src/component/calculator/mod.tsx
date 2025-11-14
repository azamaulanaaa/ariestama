import { ReactNode } from "react";
import { z } from "zod";

import { APAR } from "@/component/calculator/safety/apar/mod.tsx";

type InnerCalculatorProps = { locale: string };
type InnerCalculator = <T extends InnerCalculatorProps>(props: T) => ReactNode;

export enum CalculatorKind {
  Apar_MinUnit = "Apar_MinUnit",
}

const InnerCalculatorMap: Record<CalculatorKind, [string, InnerCalculator]> = {
  "Apar_MinUnit": ["APAR - Minimum Unit", APAR.MinUnit],
};

const CalculatorPropsSchema = z.object({
  kind: z.enum(CalculatorKind),
  locale: z.string().optional().default("en-US"),
});
export type CalculatorProps = z.input<typeof CalculatorPropsSchema>;

export const Calculator = (props: CalculatorProps) => {
  const zProps = CalculatorPropsSchema.parse(props);

  const [title, InnerCalculator] = InnerCalculatorMap[zProps.kind];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body relative">
        <div className="absolute inset-0 z-0 opacity-10 rounded-2xl bg-[url('/img/logo.png')] bg-top">
        </div>
        <div className="relative z-1 prose max-w-none">
          <h1>{title}</h1>
          <InnerCalculator locale={zProps.locale} />
        </div>
      </div>
    </div>
  );
};
