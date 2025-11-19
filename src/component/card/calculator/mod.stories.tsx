import { ChangeEventHandler, useState } from "react";
import { Story, StoryDefault } from "@ladle/react";
import { CalculatorBody, CalculatorRoot, CalculatorTitle } from "./mod.tsx";

export default {
  title: "Component / Card",
} as StoryDefault;

export const Demo: Story = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const c = a + b;

  const handleOnAChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let target = event.target as HTMLInputElement;
    let value = Number.parseInt(target.value);
    setA(value);
  };

  const handleOnBChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let target = event.target as HTMLInputElement;
    let value = Number.parseInt(target.value);
    setB(value);
  };

  return (
    <CalculatorRoot className="max-w-100">
      <CalculatorTitle>Sum</CalculatorTitle>
      <CalculatorBody>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Parameters</legend>
          <label className="input w-full">
            <span className="label">A</span>
            <input
              type="number"
              className="text-right"
              value={a}
              onChange={handleOnAChange}
            />
          </label>
          <label className="input w-full">
            <span className="label">B</span>
            <input
              type="number"
              className="text-right"
              value={b}
              onChange={handleOnBChange}
            />
          </label>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Result</legend>
          <label className="input w-full">
            <span className="label">C</span>
            <input type="number" className="text-right" readOnly value={c} />
          </label>
        </fieldset>
      </CalculatorBody>
    </CalculatorRoot>
  );
};
