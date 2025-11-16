import { z } from "zod";

/**
 * Calculate radius tangkap instalasi penyalur petir konvensional
 *
 * @param tinggi - tinggi penyalur petir dari permukaan tanah in meter.
 *
 * @returns radius cakupan in meter.
 */
export function radiusKonvensional(tinggi: number): number {
  const derajat = 112;

  const zTinggi = z.number().parse(tinggi);

  return zTinggi * Math.tan((derajat * Math.PI) / 180 / 2);
}
