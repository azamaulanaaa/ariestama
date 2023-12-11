import { ChangeEvent, useState, useEffect } from "react";

import { SWLChainBlock_ton, Grade } from "./calculation";

function SWLChainBlockCalculator() {
  const [grade, setGrade] = useState<Grade>(80);
  const [diameterOfChain, setDiameterOfChain] = useState<number>(0);
  const [errorDiameterOfChain, setErrorDiameterOfChain] =
    useState<boolean>(false);
  const [numberOfReaving, setNumberOfReaving] = useState<number>(1);
  const [errorNumberOfReaving, setErrorNumberOfReaving] =
    useState<boolean>(false);
  const [swl, setSWL] = useState<number>(0);

  const recalculate = () => {
    setSWL(SWLChainBlock_ton(diameterOfChain, numberOfReaving, grade));
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

  const handleChangeNumberOfReaving = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseFloat(event.target.value);
    setErrorNumberOfReaving(
      isNaN(value) || value <= 0 || !Number.isInteger(value),
    );
    setNumberOfReaving(value);
  };

  useEffect(recalculate, [grade, diameterOfChain, numberOfReaving]);

  const errorClassName = (value: boolean) => {
    if (value) {
      return "input-error";
    }

    return "";
  };

  return (
    <form
      data-testid="SWLChainBlockCalculator"
      className="grid grid-rows-1 gap-4"
    >
      <div className="form-control">
        <label htmlFor="grade" className="label">
          <span className="label-text">
            Grade<span className="text-red-400">*</span>
          </span>
        </label>
        <select
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
          id="diameterOfChain"
          name="diameterOfChain"
          type="number"
          onChange={handleChangeDiameterOfChain}
          value={diameterOfChain.toString()}
          required
          className={
            "input input-bordered " + errorClassName(errorDiameterOfChain)
          }
        />
      </div>
      <div className="form-control">
        <label htmlFor="numberOfReaving" className="label">
          <span className="label-text">Number of Reaving</span>
        </label>
        <input
          id="numberOfReaving"
          name="numberOfReaving"
          type="number"
          onChange={handleChangeNumberOfReaving}
          value={numberOfReaving.toString()}
          required
          className={
            "input input-bordered " + errorClassName(errorNumberOfReaving)
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

export default SWLChainBlockCalculator;
