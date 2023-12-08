import { ChangeEvent, useState, useEffect } from "react";

import { SWLChainSling_ton, Grade } from "./calculation";

function SWLChainSlingCalculator() {
  const [grade, setGrade] = useState<Grade>(80);
  const [diameterOfChain, setDiameterOfChain] = useState<number>(0);
  const [errorDiameterOfChain, setErrorDiameterOfChain] =
    useState<boolean>(false);
  const [swl, setSWL] = useState<number>(0);

  const recalculate = () => {
    setSWL(SWLChainSling_ton(diameterOfChain, grade));
  };

  const handleChangeGrade = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setGrade(value as Grade);
  };

  const handleChangeDiameterOfChain = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseFloat(event.target.value);
    setErrorDiameterOfChain(isNaN(value) || value <= 0);
    setDiameterOfChain(value);
  };
  useEffect(recalculate, [grade, diameterOfChain]);

  const conditionalClassName_diameterOfChain = () => {
    if (errorDiameterOfChain) {
      return "input-error";
    }

    return "";
  };

  return (
    <form
      data-testid="SWLChainSlingCalculator"
      className="grid grid-rows-1 gap-4"
    >
      <div className="form-control">
        <label htmlFor="grade" className="label">
          <span className="label-text">
            Grade<span className="text-red-400">*</span>
          </span>
        </label>
        <select
          data-testid="grade"
          id="grade"
          name="grade"
          onChange={handleChangeGrade}
          value={grade.toString()}
          className="select select-bordered"
        >
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="diameterOfChain" className="label">
          <span className="label-text">Diameter of Chain</span>
          <span className="label-alt">mm</span>
        </label>
        <input
          data-testid="diameterOfChain"
          id="diameterOfChain"
          name="diameterOfChain"
          type="number"
          onChange={handleChangeDiameterOfChain}
          value={diameterOfChain}
          required
          className={
            "input input-bordered " + conditionalClassName_diameterOfChain()
          }
        />
      </div>
      <div className="divider">Result</div>
      <div className="form-control">
        <label htmlFor="swl" className="label">
          <span className="label-text">Safety Working Load (SWL)</span>
          <span className="label-alt">ton</span>
        </label>
        <input
          data-testid="swl"
          id="swl"
          name="swl"
          type="text"
          readOnly
          value={swl.toFixed(1)}
          className="input input-bordered join-item"
        />
      </div>
    </form>
  );
}

export default SWLChainSlingCalculator;
