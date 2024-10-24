"use client";

import { useEffect, useMemo, useState } from "react";
import { Boiler } from "../../_utils/calculation";
import classNames from "classnames";
import { z } from "zod";
import useNumber from "@/app/calculator/_hooks/useNumber";
import { NumberFormatter } from "@internationalized/number";

const WaterTubeThicknessDrumPropsScheam = z.object({
  locale: z.string().optional().default("en-US"),
});

export type WaterTubeDrumThicknessProps = z.input<
  typeof WaterTubeThicknessDrumPropsScheam
>;

const WaterTubeDrumThickness = (props: WaterTubeDrumThicknessProps) => {
  const zProps = WaterTubeThicknessDrumPropsScheam.parse(props);

  const [standart, setStandart] = useState("jis");
  const [type, setType] = useState("ferritic_steel");
  const [pressureRef, pressure, pressureError] = useNumber(zProps.locale);
  const [diameterRef, diameter, diameterError] = useNumber(zProps.locale);
  const [sigmaRef, sigma, sigmaError] = useNumber(zProps.locale);
  const [temperatureRef, temperature, temperatureError] = useNumber(
    zProps.locale,
  );
  const [innerDiameterHoleRef, innerDiameterHole, innerDiameterHoleError] =
    useNumber(zProps.locale);
  const [pitchHoleRef, pitchHole, pitchHoleError] = useNumber(zProps.locale);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(true);
  }, [
    type,
    standart,
    pressure,
    diameter,
    sigma,
    innerDiameterHole,
    pitchHole,
    temperature,
  ]);

  const handleNoteClick = () => {
    setEdited(false);
  };

  const numberFormatter = new NumberFormatter(zProps.locale);

  const efficiencyHole = useMemo(() => {
    try {
      return Boiler.efficiencyLigamentsWaterTubeJIS(
        pitchHole,
        innerDiameterHole,
      );
    } catch {
      return NaN;
    }
  }, [pitchHole, innerDiameterHole]);

  const minThicknessUpperDrumm = useMemo(() => {
    try {
      return Boiler.minThicknessShellWaterTubeJIS(
        type,
        pressure,
        diameter,
        sigma,
        efficiencyHole,
        temperature,
      );
    } catch {
      return NaN;
    }
  }, [type, pressure, diameter, sigma, efficiencyHole, temperature]);

  return (
    <form className="prose">
      <h2>Standart</h2>
      <label className="form-control w-full">
        <select
          className="select select-bordered w-full text-right"
          value={standart}
          onChange={(e) => {
            setStandart(e.target.value);
          }}
        >
          <option value="jis">Japanese Industrial Standart (JIS)</option>
        </select>
      </label>
      <h2>Parameter</h2>
      <div className="divider">Tube Holes</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Pitch</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={pitchHoleRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": pitchHoleError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Inner Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={innerDiameterHoleRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": innerDiameterHoleError != null,
          })}
          placeholder="0"
        />
      </label>
      <div className="divider">Drum</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Pressure</span>
          <span className="label-text-alt">
            kilo gram force per centi meter square
          </span>
        </div>
        <input
          ref={pressureRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": pressureError != null,
          })}
          placeholder="0"
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
          ref={sigmaRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": sigmaError != null,
          })}
          placeholder="0"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Steam Temperature</span>
          <span className="label-text-alt">celcius</span>
        </div>
        <input
          ref={temperatureRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": temperatureError != null,
          })}
          placeholder="0"
        />
      </label>
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
          <span className="label-text">Diameter</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          ref={diameterRef}
          className={classNames("input input-bordered w-full text-right", {
            "input-error": diameterError != null,
          })}
          placeholder="0"
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
      <div className="divider">Tube Holes</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Efficiency of Ligament</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(efficiencyHole)}
        />
      </label>
      <div className="divider">Drum</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Minimum Thickness</span>
          <span className="label-text-alt">mili meter</span>
        </div>
        <input
          type="tel"
          readOnly
          className="input input-bordered w-full text-right"
          value={numberFormatter.format(minThicknessUpperDrumm)}
        />
      </label>
    </form>
  );
};

export default WaterTubeDrumThickness;
