import { z } from "zod";

export type MinPipeThicknessParams_ASME_B31_1 = {
  /** Internal Design Pressure in psig */
  P: number;
  /** Pipe Outer Diameter in inch */
  D: number;
  /** Maximum Allowable Stress in material due to internal preasure and joint efficiency in psi */
  SE: number;
  /** Weld Strength reduction factor */
  W: number;
  /** Temperature coefficient */
  y: number;
  /** Additional thickness in inch */
  A: number;
};

export const minPipeThicknessParamsSchema_ASME_B31_1 = z.object({
  P: z.number(),
  D: z.number(),
  SE: z.number(),
  W: z.number(),
  y: z.number(),
  A: z.number(),
}) as z.ZodType<MinPipeThicknessParams_ASME_B31_1>;

/**
 * Minimum pipe wall thickness based on ASME B31.1 at 104.1.2
 *
 * @returns {number} Minimum thickness in inch
 *
 * # Example
 *
 * ```ts
 * import { assertAlmostEquals } from "@std/assert";
 *
 * const t = minPipeThickness_ASME_B3_1({
 *     P: 10,
 *     D: 2,
 *     SE: 1489,
 *     W: 1,
 *     y: 0.4,
 *     A: 3,
 * });
 * assertAlmostEquals(t, 3.007, 0.0005);
 * ```
 */
export function minPipeThickness_ASME_B3_1(
  params: MinPipeThicknessParams_ASME_B31_1,
) {
  const zParams = minPipeThicknessParamsSchema_ASME_B31_1.parse(params);

  const t = (zParams.P * zParams.D) /
      (2 * (zParams.SE * zParams.W + zParams.P * zParams.y)) + zParams.A;

  return t;
}
