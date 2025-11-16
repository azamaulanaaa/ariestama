import { z } from "zod";

/**
 * Calculate SWL Fork of a Forklift.
 *
 * @param capacity - capacity of the Forklift in kilo gram.
 * @param cog2fork - center of gravity distance to face of fork in centi meter.
 * @param loadCenterFork - load center of the fork in centi meter.
 * @param loadCenterWeight - load center of the weight used in testing in centi meter.
 *
 * @returns SWL Fork in kilo gram.
 */
export function swlFork(
  capacity: number,
  cog2fork: number,
  loadCenterFork: number,
  loadCenterWeight: number,
): number {
  const zCapacity = z.number().positive().parse(capacity);
  const zCog2fork = z.number().positive().parse(cog2fork);
  const zLoadCenterFork = z.number().positive().parse(loadCenterFork);
  const zLoadCenterWeight = z.number().positive().parse(loadCenterWeight);

  return (
    (zCapacity * (zCog2fork + zLoadCenterFork)) /
    (zCog2fork + zLoadCenterWeight)
  );
}

/**
 * Calculate load center weight when weight equal to SWL.
 *
 * @param capasitas - capacity of the Forklift in kilo gram.
 * @param cog2fork - center of gravity distance to face of fork in centi meter.
 * @param loadCenterFork - load center of the fork in centi meter.
 * @param weight - the weight used in testing in kilo gram.
 *
 * @returns max load center weight in centi meter.
 */
export function maxLoadCenterWeight(
  capacity: number,
  cog2fork: number,
  weight: number,
  loadCenterFork: number,
) {
  const zCapacity = z.number().positive().parse(capacity);
  const zCog2fork = z.number().positive().parse(cog2fork);
  const zLoadCenterFork = z.number().positive().parse(loadCenterFork);
  const zWeight = z.number().positive().parse(weight);

  return (zCapacity * (zCog2fork + zLoadCenterFork)) / zWeight - zCog2fork;
}
