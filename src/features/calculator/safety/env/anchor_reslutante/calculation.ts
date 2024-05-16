export function AnchorResultante_kg(alpha_degree: number, weight_kg: number) {
  const resultante_kg = weight_kg / (2 * Math.cos(alpha_degree / 2));
  return resultante_kg;
}
