"use client";

import { useEffect, useMemo, useState } from "react";
import { Boiler } from "../../_utils/calculation";
import classNames from "classnames";

const WaterTubeThickness = () => {
  const [standart, setStandart] = useState("jis");
  const [type, setType] = useState("ferritic_steel");
  const [pressure, setPressure] = useState(0);
  const [diameterUpper, setDiameterUpper] = useState(0);
  const [diameterLower, setDiameterLower] = useState(0);
  const [sigma, setSigma] = useState(0);
  const [diameterHole, setDiameterHole] = useState(0);
  const [pitchHole, setPitchHole] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [
    type,
    standart,
    pressure,
    diameterUpper,
    diameterLower,
    sigma,
    diameterHole,
    pitchHole,
    temperature,
  ]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const efficiencyHole = useMemo(() => {
    try {
      return Boiler.efficiencyLigamentsWaterTubeJIS(pitchHole, diameterHole);
    } catch {
      return NaN;
    }
  }, [pitchHole, diameterHole]);

  const minThicknessUpperDrumm = useMemo(() => {
    try {
      return Boiler.minThicknessShellWaterTubeJIS(
        type,
        pressure,
        diameterUpper,
        sigma,
        efficiencyHole,
        temperature,
      );
    } catch {
      return NaN;
    }
  }, [type, pressure, diameterUpper, sigma, efficiencyHole, temperature]);

  const minThicknessLowerDrum = useMemo(() => {
    try {
      return Boiler.minThicknessShellWaterTubeJIS(
        type,
        pressure,
        diameterLower,
        sigma,
        efficiencyHole,
        temperature,
      );
    } catch {
      return NaN;
    }
  }, [type, pressure, diameterLower, sigma, efficiencyHole, temperature]);
  return (
    <form className="prose">
      <h2>Standart</h2>
      <label className="form-control w-full">
        <select
          className="select select-bordered w-full text-right"
          value={standart}
          onkkChange={(e) => {
            setStandart(e.target.value);
          }}
        >
          <option value="jis">Japanese Industrial Standart (JIS)</option>
        </select>
      </label>
      <h2>Parameter</h2>
      <div className="divider">General</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Type</span>
        </div>
        <select
          className="select select-bordered w-full text-right"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="ferritic_steel">Ferritic Steel</option>
          <option value="austenitic_steel">Austenitic Steel</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Pressure</span>
          <span className="label-text-alt">
            kilo gram force per centi meter square
          </span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={pressure}
          onChange={(e) => {
            setPressure(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">
            Allowable Tensile Stress of The Material
          </span>
          <span className="label-text-alt">
            kilo gram force per mili meter square
          </span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={sigma}
          onChange={(e) => {
            setSigma(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Steam Temperature</span>
          <span className="label-text-alt">celcius</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={temperature}
          onChange={(e) => {
            setTemperature(parseFloat(e.target.value));
          }}
        />
      </label>
      <div className="divider">Upper Drum</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={diameterUpper}
          onChange={(e) => {
            setDiameterUpper(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter Type</span>
        </div>
        <select className="select select-bordered w-full text-right">
          <option>Inner</option>
          <option>Outter</option>
        </select>
      </label>
      <div className="divider">Lower Drum</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={diameterLower}
          onChange={(e) => {
            setDiameterLower(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter Type</span>
        </div>
        <select className="select select-bordered w-full text-right">
          <option>Inner</option>
          <option>Outter</option>
        </select>
      </label>
      <div className="divider">Tube Holes</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Pitch</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={pitchHole}
          onChange={(e) => {
            setPitchHole(parseFloat(e.target.value));
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full text-right"
          value={diameterHole}
          onChange={(e) => {
            setDiameterHole(parseFloat(e.target.value));
          }}
        />
      </label>
      <div className="divider">Note</div>
      <label className="form-control w-full">
        <textarea
          className={classNames("textarea textarea-bordered h-24", {
            "textarea-error": edited,
          })}
          onClick={handleNoteClick}
        ></textarea>
      </label>
      <h2>Result</h2>
      <div className="divider">Upper Drum</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Minimum Thickness</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={minThicknessUpperDrumm.toFixed(1)}
        />
      </label>
      <div className="divider">Lower Drum</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Minimum Thickness</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={minThicknessLowerDrum.toFixed(1)}
        />
      </label>
      <div className="divider">Tube Holes</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Efficiency of Ligament</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="number"
          readOnly
          className="input input-bordered w-full text-right"
          value={efficiencyHole.toFixed(1)}
        />
      </label>
    </form>
  );
};

export default WaterTubeThickness;
