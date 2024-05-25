import { ChangeEvent, useState, useMemo } from "react";

import { radius_meter } from "./calculation";

function PetirKonvensionalCalculator() {
  const [tinggi, setTinggi] = useState<number>(0);
  const [tinggiError, setTinggiError] = useState<boolean>(false);

  const radius = useMemo(() => radius_meter(tinggi), [tinggi]);

  const handleChangeTinggi = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setTinggiError(isNaN(value) || value < 0 || !Number.isInteger(value));
    setTinggi(value);
  };

  const errorClassName = (value: boolean) => {
    if (value) {
      return "input-error";
    }

    return "";
  };

  return (
    <form
      data-testid="TinggiKonvensionalCalculator"
      className="grid grid-rows-1 gap-4"
    >
      <div className="divider">Variable</div>
      <div className="form-control">
        <label htmlFor="tinggi" className="label">
          <span className="label-text">Tinggi</span>
          <span className="label-alt">meter</span>
        </label>
        <input
          id="tinggi"
          name="tinggi"
          type="number"
          onChange={handleChangeTinggi}
          value={tinggi.toString()}
          required
          className={"input input-bordered " + errorClassName(tinggiError)}
        />
      </div>
      <div className="divider">Result</div>
      <div className="form-control">
        <label htmlFor="radius" className="label">
          <span className="label-text">Radius</span>
          <span className="label-alt">meter</span>
        </label>
        <input
          data-testid="radius"
          id="radius"
          name="radius"
          type="text"
          readOnly
          value={radius.toFixed(1)}
          className="input input-bordered join-item"
        />
      </div>
    </form>
  );
}

export default PetirKonvensionalCalculator;
