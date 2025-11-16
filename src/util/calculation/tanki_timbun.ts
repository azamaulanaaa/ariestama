import { z } from "zod";

/**
 * Calculate Minimum Required Thickness
 *
 * @param diameter - diamter tangki in meter.
 * @param designLiquidLevel - design liquid level
 * @param designSpecificGravityLiquid - design specific gravity liquid in raw molases.
 * @param allowableStress - allowable stress in mega pascal. the value cannot be 0.
 * @param corrosionAllowance - corrosion allowance in mili meter.
 *
 * @returns minimum required thickness in mili meter.
 */
export function thickness(
  diameter: number,
  designLiquidLevel: number,
  designSpecificGravityLiquid: number,
  allowableStress: number,
  corrosionAllowance: number,
): number {
  const zDiameter = z.number().parse(diameter);
  const zDesignLiquidLevel = z.number().parse(designLiquidLevel);
  const zDesignSpecificGravityLiquid = z
    .number()
    .parse(designSpecificGravityLiquid);
  const zAllowableStress = z
    .number()
    .refine((value) => value != 0)
    .parse(allowableStress);
  const zCorrosionAllowance = z.number().parse(corrosionAllowance);

  const minimumRequiredThickness = (4.9 *
        zDiameter *
        (zDesignLiquidLevel - 0.3) *
        zDesignSpecificGravityLiquid) /
      zAllowableStress +
    zCorrosionAllowance;

  return minimumRequiredThickness;
}
