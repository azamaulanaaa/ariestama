import { z } from "zod";
import { General } from "../calculation.ts";

/**
 * Calculates the temperature-dependent stress reduction factor (f(Θ)) based on
 * the Grondslagen/older empirical formula.
 *
 * @param temperature - The gas operating temperature (Θ) in celcius
 * @returns The unitless temperature reduction factor f(Θ).
 */
export function temperatureFactor_Grondslagen(
  temperature: number,
) {
  const zProps = z.object({
    Theta: z.number(),
  })
    .parse({ Theta: temperature });

  return (1 - (zProps.Theta / 525) ** 2);
}

/**
 * Calculates the corrected yield strength (SV^Θ) by applying the temperature factor.
 * This result represents the allowable stress at the operating temperature.
 *
 * @param temperatureFactor - The unitless reduction factor f(Θ) obtained from temperatureFactorGrondslagen.
 * @param yieldStrength - The base yield strength (SV) at a reference/ambient temperature in kilo gram force per mili meter square.
 * @returns The corrected yield strength (SV^Θ) with the same unit as yieldStrength.
 */
export function correctedYieldStrength_Grondslagen(
  temperatureFactor: number,
  yieldStrength: number,
) {
  const zProps = z.object({
    temperatureFactor: z.number(),
    yieldStrength: z.number(),
  }).parse({ temperatureFactor, yieldStrength });

  return zProps.yieldStrength * zProps.temperatureFactor;
}

/**
 * Calculate minimum diameter required for a safety valve
 * based on Grondslagen formula
 *
 * @param areaChamber - The area of chamber in meter square.
 * @param pressure - The design pressure (P or p) in kilo gram force per centi meter square
 * @returns minimum diameter of a safety valve in mili meter
 */
export function minDiameterSafetyValve_Grondslagen(
  areaChamber: number,
  pressure: number,
) {
  const zProps = z.object({
    r: z.number(),
    p: z.number(),
  }).parse({
    r: areaChamber,
    p: pressure,
  });

  return (2 / 3) * 140 * Math.sqrt((zProps.r + 0.4) / (zProps.p + 4));
}

/**
 * Calculates the minimum required pipe thickness (t) for a Fire-Tube Boiler
 * based on the Grondslagen formula.
 *
 * @param pressure - The design pressure (P or p) in kilo gram force per centi meter square.
 * @param innerDiameter - The internal diameter of the tube (d) in mili meter.
 * @param weldJointEfficiency - The factor for weld strength or safety (x).
 * @param correctedYieldStrength - The allowable stress (SV^Θ) obtained from correctedYieldStrengthGrondslagen.
 * @param corrosionAllowance - The added thickness for corrosion (Δ) mili meter.
 * @returns The minimum required shell thickness (t) with the same unit as innerDiameter and corrosionAllowance in mili meter.
 */
export function minPipeThickness_Grondslagen(
  pressure: number,
  innerDiameter: number,
  weldJointEfficiency: number,
  correctedYieldStrength: number,
  corrosionAllowance: number,
) {
  const zProps = z.object({
    p: z.number(),
    d: z.number(),
    x: z.number(),
    svTheta: z.number(),
    delta: z.number(),
  }).parse({
    p: pressure,
    d: innerDiameter,
    x: weldJointEfficiency,
    svTheta: correctedYieldStrength,
    delta: corrosionAllowance,
  });

  return (zProps.p * zProps.d * zProps.x) /
      (200 * zProps.svTheta + zProps.p * zProps.x) + zProps.delta;
}

/**
 * Calculates the minimum required shell thickness (t) for a Fire-Tube Boiler shell
 * based on the Grondslagen formula.
 *
 * @param pressure - The design pressure (P or p) in kilo gram force per centi meter square.
 * @param innerDiameter - The internal diameter of the shell (d) in mili meter.
 * @param weldJointEfficiency - The factor for weld strength or safety (x).
 * @param shellReductionFactor - The factor for construction strength reduction (z).
 * @param constantC - A formula-specific constant (c), often related to stress concentration.
 * @param correctedYieldStrength - The allowable stress (SV^Θ) obtained from correctedYieldStrengthGrondslagen.
 * @param corrosionAllowance - The added thickness for corrosion (Δ).
 * @returns The minimum required shell thickness (t) with the same unit as innerDiameter and corrosionAllowance in mili meter.
 */
export function minShellFireTubeThickness_Grondslagen(
  pressure: number,
  innerDiameter: number,
  weldJointEfficiency: number,
  shellReductionFactor: number,
  constantC: number,
  correctedYieldStrength: number,
  corrosionAllowance: number,
) {
  const zProps = z.object({
    p: z.number(),
    d: z.number(),
    x: z.number(),
    z: z.number(),
    c: z.number(),
    svTheta: z.number(),
    delta: z.number(),
  }).parse({
    p: pressure,
    d: innerDiameter,
    x: weldJointEfficiency,
    z: shellReductionFactor,
    c: constantC,
    svTheta: correctedYieldStrength,
    delta: corrosionAllowance,
  });

  return (zProps.p * zProps.d * zProps.x) /
      (2 * (zProps.z - zProps.c) * zProps.svTheta - zProps.p * zProps.x) +
    zProps.delta;
}

/**
 * Calculate efficiency of ligaments between tube holes in Water Tube
 * Base on Japaense Industrial Standart
 *
 * @param p - ptich of the tube holes in mili meter
 * @param d - diameter of the tube holes in mili meter
 *
 * @returns efficiency without unit
 */
export function efficiencyLigamentsWaterTube_JIS(p: number, d: number): number {
  const zProps = z
    .object({
      p: z.number(),
      d: z.number(),
    })
    .parse({ p, d });

  return (zProps.p - zProps.d) / zProps.p;
}

/**
 * Calculate Minimum Plate Thickness of Drum in Water Tube
 * Base on Japaense Industrial Standart
 *
 * @param type - plate type is one of ["ferritic_steel", "austenitic_steel"]
 * @param pressure - maximum allowable working preasure in kilogram-force per centi meter square
 * @param innerDiameter - inside diameter of the shell or dome in mili meter
 * @param sigma - allowable tensile stress of the material used kilogram-force per mili meter square
 * @param efficiencyLigament - minimum joint efficiency of the part with a longitudinal joint or a ... of openings
 * @param temperature - temperature of the steam in celcius
 * @param additionalThickness - additional thickness in mili meter shall be 1 mm
 *
 * @returns minimum thickness of the in mili meter
 */
export function minDrumWaterTubeThickness_JIS(
  type: string,
  pressure: number,
  innerDiameter: number,
  sigma: number,
  efficiencyLigament: number,
  temperature: number,
  additionalThickness: number = 1,
) {
  const zProps = z
    .object({
      type: z.union([
        z.literal("ferritic_steel"),
        z.literal("austenitic_steel"),
      ]),
      p: z.number(),
      di: z.number(),
      sigma: z.number(),
      pi: z.number(),
      temp: z.number(),
      a: z.number().optional().default(1),
    })
    .parse({
      type,
      p: pressure,
      di: innerDiameter,
      sigma,
      pi: efficiencyLigament,
      temp: temperature,
      a: additionalThickness,
    });

  let k: number = NaN;
  if (zProps.type == "ferritic_steel") {
    if (zProps.temp <= 480) k = 0.4;
    else if (zProps.temp >= 620) k = 0.7;
    else {
      const points: [number, number][] = [
        [480, 0.4],
        [510, 0.5],
        [535, 0.7],
        [565, 0.7],
        [590, 0.7],
        [620, 0.7],
      ];

      k = General.lagrangeInterpolation(points, zProps.temp);
    }
  } else if (zProps.type == "austenitic_steel") {
    if (zProps.temp <= 480) k = 0.4;
    else if (zProps.temp >= 620) k = 0.7;
    else {
      const points: [number, number][] = [
        [480, 0.4],
        [510, 0.7],
        [535, 0.7],
        [565, 0.7],
        [590, 0.5],
        [620, 0.7],
      ];

      k = General.lagrangeInterpolation(points, zProps.temp);
    }
  }

  return (
    (zProps.p * zProps.di) /
      (200 * zProps.sigma * zProps.pi - 2 * zProps.p * (1 - k)) +
    zProps.a
  );
}

/**
 * Calculate minimum thickness of water tube hole
 * base on JIS Standart
 *
 * @param pressure - maximum allowable working pressure in kilogram-force per centi meter square
 * @param outterDiameter - outter diameter of the steel tube in mili meter
 * @param sigma - allowable tensile stress of the material in kilogram-force per mili meter square
 * @param additionalThickness - additional thickness in mili meter and shall be 1 mm
 *
 * @returns minimum thickness required of water tube in mili meter
 */
export function minThicknesTubeHole_JIS(
  pressure: number,
  outterDiameter: number,
  sigma: number,
  additionalThickness: number = 1,
) {
  const zProps = z
    .object({
      pressure: z.number(),
      outterDiameter: z.number(),
      sigma: z.number(),
      additionalThickness: z.number(),
    })
    .parse({
      pressure,
      outterDiameter,
      sigma,
      additionalThickness,
    });

  return (
    (zProps.pressure * zProps.outterDiameter) /
      (200 * zProps.sigma + zProps.pressure) +
    0.005 * zProps.outterDiameter +
    zProps.additionalThickness
  );
}
