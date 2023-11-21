export type Grade = 80 | 100;

export function SWLChainSling_ton(diameter_mm: number, grade: Grade) {
  const constantGrade = {
    80: 20.4,
    100: 25.7,
  };

  return (diameter_mm * 0.03937) ** 2 * constantGrade[grade];
}
