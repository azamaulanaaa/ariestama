import { z } from "zod";

/**
 * Calcualte water flow of a nozzle in liter per minute
 *
 * @param nozzleInletDiamter - Nozzle Inlet Diameter in mili meter.
 * @param waterPreasure - Water Preasure of the nozzle in kilo gram per centi meter square.
 *
 * @returns water flow in liter per minute.
 */
export function waterFlow(
  nozzleInletDiamter: number,
  waterPreasure: number,
): number {
  const zNozzleInletDiamter = z.number().positive().parse(nozzleInletDiamter);
  const zWaterPreasure = z.number().positive().parse(waterPreasure);

  return 0.653 * zNozzleInletDiamter ** 2 * Math.sqrt(zWaterPreasure);
}
