import { z } from "zod";

/**
 * Calculate Anchor Resultante
 *
 * @param alpha - degree used in the anchor in degree.
 * @param mass - weight used in fo the test in kilo gram.
 *
 * @returns resultante in kilo gram.
 */
export function anchorResultante(alpha: number, mass: number): number {
  const zAlpha = z
    .number()
    .refine((value) => value >= 0 && value <= 360)
    .parse(alpha);
  const zMass = z.number().parse(mass);

  return zMass / (2 * Math.cos(zAlpha / 2));
}
