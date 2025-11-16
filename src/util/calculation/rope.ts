import { z } from "zod";

export const SafetyFactor = {
  wire_sling: 5,
  wire_running: 3.5,
};

/**
 * Calculate Safety Working Load of wire rope sling
 *
 * @param diameter - diameter of the wire rope in inch.
 * @param grade - grade of the wire rope is one of [1770].
 *
 * @returns Safety Working Load in ton.
 */
export function swlWireSling(diameter: number, grade: number): number {
  const zDiameter = z.number().positive().parse(diameter);
  const zGrade = z.literal(1770).parse(grade);

  if (zGrade == 1770) {
    return zDiameter ** 2 * 8;
  }

  return NaN;
}

/**
 * Calculate Safety Working Load of running wire rope
 *
 * @param diameter - diameter of the wire rope in inch.
 * @param reavingNumber - number of reaving used in the rope.
 * @param grade - grade of the wire rope is one of [1770].
 *
 * @returns Safety Working Load in kilo gram.
 */
export function swlWireRunning(
  diameter: number,
  reavingNumber: number,
  grade: number,
): number {
  const zDiameter = z.number().positive().parse(diameter);
  const zReavingNumber = z.number().int().positive().parse(reavingNumber);
  const zGrade = z.literal(1770).parse(grade);

  if (zGrade == 1770) {
    return (
      (SafetyFactor.wire_sling / SafetyFactor.wire_running) *
      swlWireSling(zDiameter, zGrade) *
      zReavingNumber
    );
  }

  return NaN;
}
