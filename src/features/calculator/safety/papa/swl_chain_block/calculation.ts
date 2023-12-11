const SAFETY_FACTOR = {
  chain_sling: 4,
  chain_block: 5,
};

export type Grade = 80 | 100;

export function SWLChainBlock_ton(
  diameter_mm: number,
  numberOfReaving: number,
  grade: Grade,
) {
  const constantGrade = {
    80: 20.4,
    100: 25.7,
  };

  const swl_chain_sling = (diameter_mm * 0.03937) ** 2 * constantGrade[grade];
  const ratio = SAFETY_FACTOR.chain_block / SAFETY_FACTOR.chain_sling;

  return ratio * swl_chain_sling * numberOfReaving;
}
