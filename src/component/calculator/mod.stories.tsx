import { Story, StoryDefault } from "@ladle/react";
import { Calculator, CalculatorKind } from "./mod.tsx";

export default {
  title: "Component / Calculator",
} as StoryDefault;

export const Container: Story<{ kind: CalculatorKind }> = ({ kind }) => (
  <Calculator kind={kind} locale="id-ID" />
);
Container.args = {
  kind: CalculatorKind.Apar_MinUnit,
};
Container.argTypes = {
  kind: {
    options: Object.values(CalculatorKind).sort(),
    control: { type: "select" },
  },
};
