import { Story } from "@ladle/react";
import { Calculator, CalculatorKind } from "./calculator/mod.tsx";

export const Apar_MinUnit: Story = () => (
  <Calculator kind={CalculatorKind.Apar_MinUnit} locale="en-US" />
);
