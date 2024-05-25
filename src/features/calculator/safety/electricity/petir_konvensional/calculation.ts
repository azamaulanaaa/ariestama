export function radius_meter(tinggi_meter: number) {
  const derajat = 112;
  return tinggi_meter * Math.tan((derajat * Math.PI) / 180 / 2);
}
