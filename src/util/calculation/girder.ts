import { z } from "zod";

/**
 * calculate max defelection given girder typee
 *
 * @param typee - type of girder could be one of ["single", "double"]
 * @param lengthOfSpan - length of the span in mili meter
 *
 * @returns maximum deflection allowed in mili meter
 */
export function deflection(typee: string, lengthOfSpan: number): number {
  const zProps = z
    .object({
      typee: z.union([z.literal("single"), z.literal("double")]),
      lengthOfSpan: z.number(),
    })
    .parse({
      typee,
      lengthOfSpan,
    });

  if (zProps.typee == "single") {
    return (1 / 888) * zProps.lengthOfSpan;
  }
  if (zProps.typee == "double") {
    return (1 / 600) * zProps.lengthOfSpan;
  }

  return NaN;
}
