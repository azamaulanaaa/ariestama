import { ChangeEvent, useState, useMemo } from "react";

import { AnchorResultante_kg } from "./calculation";

function AnchorResultanteCalculator() {
  const [aDegree, setADegree] = useState<number>(0);
  const [aDegreeError, setADegreeError] = useState<boolean>(false);
  const [bDegree, setBDegree] = useState<number>(0);
  const [bDegreeError, setBDegreeError] = useState<boolean>(false);
  const [weightKg, setWeightKg] = useState<number>(0);
  const [weightKgError, setWeightKgError] = useState<boolean>(false);

  const alphaDegree = useMemo(
    () => 180 - (aDegree + bDegree),
    [aDegree, bDegree],
  );

  const resultanteKg = useMemo(() => {
    return AnchorResultante_kg(alphaDegree, weightKg);
  }, [alphaDegree, weightKg]);

  const handleChangeADegree = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setADegreeError(
      isNaN(value) || value < 0 || value > 90 || !Number.isInteger(value),
    );
    setADegree(value);
  };

  const handleChangeBDegree = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setBDegreeError(
      isNaN(value) || value < 0 || value > 90 || !Number.isInteger(value),
    );
    setBDegree(value);
  };

  const handleChangeWieghtKg = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setWeightKgError(isNaN(value) || value < 0 || !Number.isInteger(value));
    setWeightKg(value);
  };

  const errorClassName = (value: boolean) => {
    if (value) {
      return "input-error";
    }

    return "";
  };

  return (
    <form
      data-testid="AnchorResultanteCalculator"
      className="grid grid-rows-1 gap-4"
    >
      <div className="divider">Information</div>
      <div className="form-control">
        <label htmlFor="jarakAntarAngkur" className="label">
          <span className="label-text">Jarak antar Angkur</span>
          <span className="label-alt">cm</span>
        </label>
        <input
          id="jarakAntarAngkur"
          name="jarakAntarAngkur"
          type="number"
          defaultValue={0}
          required
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label htmlFor="diameterWireRope" className="label">
          <span className="label-text">Diameter Wire Rope</span>
          <span className="label-alt">mm</span>
        </label>
        <input
          id="diameterWireRope"
          name="diameterWireRope"
          type="number"
          defaultValue={0}
          required
          className="input input-bordered"
        />
      </div>
      <div className="divider">Variable</div>
      <div className="form-control">
        <label htmlFor="aDegree" className="label">
          <span className="label-text">A</span>
          <span className="label-alt">derajat</span>
        </label>
        <input
          id="aDegree"
          name="aDegree"
          type="number"
          onChange={handleChangeADegree}
          value={aDegree.toString()}
          required
          className={"input input-bordered " + errorClassName(aDegreeError)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="bDegree" className="label">
          <span className="label-text">B</span>
          <span className="label-alt">derajat</span>
        </label>
        <input
          id="bDegree"
          name="bDegree"
          type="number"
          onChange={handleChangeBDegree}
          value={bDegree.toString()}
          required
          className={"input input-bordered " + errorClassName(bDegreeError)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="weightKg" className="label">
          <span className="label-text">Weight</span>
          <span className="label-alt">kg</span>
        </label>
        <input
          id="weightKg"
          name="weightKg"
          type="number"
          onChange={handleChangeWieghtKg}
          value={weightKg.toString()}
          required
          className={"input input-bordered " + errorClassName(weightKgError)}
        />
      </div>
      <div className="divider">Result</div>
      <div className="form-control">
        <label htmlFor="alphaDegree" className="label">
          <span className="label-text">Alpha</span>
          <span className="label-alt">derajat</span>
        </label>
        <input
          data-testid="alphaDegree"
          id="alphaDegree"
          name="salphaDegreewl"
          type="text"
          readOnly
          value={alphaDegree.toFixed(0)}
          className="input input-bordered join-item"
        />
      </div>
      <div className="form-control">
        <label htmlFor="resultanteKg" className="label">
          <span className="label-text">Resultante (F)</span>
          <span className="label-alt">kg</span>
        </label>
        <input
          data-testid="resultanteKg"
          id="resultanteKg"
          name="resultanteKg"
          type="text"
          readOnly
          value={resultanteKg.toFixed(0)}
          className="input input-bordered join-item"
        />
      </div>
    </form>
  );
}

export default AnchorResultanteCalculator;
