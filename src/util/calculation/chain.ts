import { z } from "zod";

/**
 * Calculate SWL of Chain Sling in ton.
 *
 * @param diamter - diameter of chain in mili meter.
 * @param grade - grade of the chain is one of [80, 100].
 *
 * @returns - swl of the chain sling in ton.
 */
export function swlSling(diameter: number, grade: number) {
  const zDiameter = z.number().parse(diameter);
  const zfactor = z
    .union([
      z.literal(80).transform(() => 20.4),
      z.literal(100).transform(() => 25.7),
    ])
    .parse(grade);

  return (zDiameter * 0.03937) ** 2 * zfactor;
}

/**
 * Calculate SWL of Chain Block in ton.
 *
 * @param diamter - diameter of chain in mm.
 * @param reavingNumber - number of reaving used in the chain.
 * @param grade - grade of the chain is one of [80, 100].
 *
 * @returns - swl of the chain block in ton.
 */
export function swlBlock(
  diameter: number,
  reavingNumber: number,
  grade: number,
) {
  const zDiameter = z.number().parse(diameter);
  const zReavingNumber = z.number().parse(reavingNumber);
  const zGrade = z.union([z.literal(80), z.literal(100)]).parse(grade);

  const safetyFaactorChainSling = 4;
  const safetyFaactorChainBlock = 5;

  return (
    (safetyFaactorChainBlock / safetyFaactorChainSling) *
    swlSling(zDiameter, zGrade) *
    zReavingNumber
  );
}
