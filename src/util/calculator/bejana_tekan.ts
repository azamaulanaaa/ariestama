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

export type minShellThickness_cicumferentialStress_cylindricalShell_ASME_UG_27Params =
  {
    /**
     * joint efficiency for, or the efficiency of, appropriate
     * joint in cylindrical or spherical shells, or the efficiency of
     * ligaments between openings, whichever is less.
     * For welded vessels, use the efficiency specified in UW-12.
     * For ligaments between openings, use the efficiency
     * calculated by the rules given in UG-53.
     */
    E: number;
    /* internal design pressure (see UG-21) */
    P: number;
    /*  inside radius of the shell course under consideration */
    R: number;
    /*  maximumallowable stress value (see UG-23 and the stress limitations specified in UG-24 */
    S: number;
  };

export const minShellThickness_cicumferentialStress_cylindricalShell_ASME_UG_27Schema =
  z.object({
    E: z.number(),
    P: z.number(),
    R: z.number(),
    S: z.number(),
  }) as z.ZodType<
    minShellThickness_cicumferentialStress_cylindricalShell_ASME_UG_27Params
  >;

/**
 * Minimum shell thickness given circumferential stress on cylindrical shell based on ASME UG-27
 *
 * @returns {number} Minimum thickness in inch
 *
 * # Example
 *
 * ```ts
 * import { assertAlmostEquals } from "@std/assert";
 *
 * const t = minShellThickness_cicumferentialStress_cylindricalShell_ASME_UG_27({
 *     E: 0.85,
 *     P: 142,
 *     R: 21.7,
 *     S: 14939
 * });
 * assertAlmostEquals(t, 0.244, 0.0005);
 * ```
 */
export function minShellThickness_cicumferentialStress_cylindricalShell_ASME_UG_27(
  params:
    minShellThickness_cicumferentialStress_cylindricalShell_ASME_UG_27Params,
) {
  const zParams =
    minShellThickness_cicumferentialStress_cylindricalShell_ASME_UG_27Schema
      .parse(params);

  const min_t = (zParams.P * zParams.R) /
    (zParams.S * zParams.E - 0.6 * zParams.P);

  return z.number().max(zParams.R * 1.5).parse(min_t);
}
