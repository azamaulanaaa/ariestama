import { z } from "zod";

export const TangkiTimbun = {
  /**
   * Calculate Minimum Required Thickness
   *
   * @param diameter - diamter tangki in meter.
   * @param designLiquidLevel - design liquid level
   * @param designSpecificGravityLiquid - design specific gravity liquid in raw molases.
   * @param allowableStress - allowable stress in meter pascal. the value cannot be 0.
   * @param corrosionAllowance - corrosion allowance in mili meter.
   *
   * @returns minimum required thickness in mili meter.
   */
  thickness(
    diameter: number,
    designLiquidLevel: number,
    designSpecificGravityLiquid: number,
    allowableStress: number,
    corrosionAllowance: number,
  ): number {
    const zDiameter = z.number().parse(diameter);
    const zDesignLiquidLevel = z.number().parse(designLiquidLevel);
    const zDesignSpecificGravityLiquid = z
      .number()
      .parse(designSpecificGravityLiquid);
    const zAllowableStress = z
      .number()
      .refine((value) => value != 0)
      .parse(allowableStress);
    const zCorrosionAllowance = z.number().parse(corrosionAllowance);

    const minimumRequiredThickness =
      (4.9 *
        zDiameter *
        (zDesignLiquidLevel - 0.3) *
        zDesignSpecificGravityLiquid) /
        zAllowableStress +
      zCorrosionAllowance;

    return minimumRequiredThickness;
  },
};

export const InstalasiPenyalurPetir = {
  /**
   * Calculate radius tangkap instalasi penyalur petir konvensional
   *
   * @param tinggi - tinggi penyalur petir dari permukaan tanah in meter.
   *
   * @returns radius cakupan in meter.
   */
  radiusKonvensional(tinggi: number): number {
    const derajat = 112;

    const zTinggi = z.number().parse(tinggi);

    return zTinggi * Math.tan((derajat * Math.PI) / 180 / 2);
  },
};

export const Chain = {
  /**
   * Calculate SWL of Chain Sling in ton.
   *
   * @param diamter - diameter of chain in mili meter.
   * @param grade - grade of the chain is one of [80, 100].
   *
   * @returns - swl of the chain sling in ton.
   */
  swlSling(diameter: number, grade: number) {
    const zDiameter = z.number().parse(diameter);
    const zfactor = z
      .union([
        z.literal(80).transform(() => 20.4),
        z.literal(100).transform(() => 25.7),
      ])
      .parse(grade);

    return (zDiameter * 0.03937) ** 2 * zfactor;
  },

  /**
   * Calculate SWL of Chain Block in ton.
   *
   * @param diamter - diameter of chain in mm.
   * @param reavingNumber - number of reaving used in the chain.
   * @param grade - grade of the chain is one of [80, 100].
   *
   * @returns - swl of the chain block in ton.
   */
  swlBlock(diameter: number, reavingNumber: number, grade: number) {
    const zDiameter = z.number().parse(diameter);
    const zReavingNumber = z.number().parse(reavingNumber);
    const zGrade = z.union([z.literal(80), z.literal(100)]).parse(grade);

    const safetyFaactorChainSling = 4;
    const safetyFaactorChainBlock = 5;

    return (
      (safetyFaactorChainBlock / safetyFaactorChainSling) *
      this.swlSling(zDiameter, zGrade) *
      zReavingNumber
    );
  },
};

export const Lingkungan = {
  /**
   * Calculate Anchor Resultante
   *
   * @param alpha - degree used in the anchor in degree.
   * @param mass - weight used in fo the test in kilo gram.
   *
   * @returns resultante in kilo gram.
   */
  anchorResultante(alpha: number, mass: number): number {
    const zAlpha = z
      .number()
      .refine((value) => value >= 0 && value <= 360)
      .parse(alpha);
    const zMass = z.number().parse(mass);

    return zMass / (2 * Math.cos(zAlpha / 2));
  },
};

export const Forklift = {
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
  swlFork(
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
  },

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
  maxLoadCenterWeight(
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
  },
};

export const General = {
  /**
   * Calculate ratio beban realtive to swl
   *
   * @param swl - safety working load in kilo gram.
   * @param weight - weight in kilo gram.
   *
   * @returns ratio
   */
  weightToSwlRatio(swl: number, weight: number): number {
    const zSwl = z.number().positive().parse(swl);
    const zWeight = z.number().positive().parse(weight);

    return zWeight / zSwl;
  },
};
