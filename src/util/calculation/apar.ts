import { z } from "zod";

/**
 * Caculate required number of APAR given area
 *
 * @param {number} area - area where APAR should exist in meter square
 * @returns {number} number of APAR
 */
export function minUnit(area: number): number {
  const zParams = z
    .object({
      area: z.number(),
    })
    .parse({ area });

  return Math.ceil(zParams.area / (15 * 15));
}
