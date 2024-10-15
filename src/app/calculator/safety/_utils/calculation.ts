import { z } from "zod";

export const TangkiTimbun = {
  /**
   * Calculate Minimum Required Thickness
   *
   * @param diameter - diamter tangki in meter.
   * @param designLiquidLevel - design liquid level
   * @param designSpecificGravityLiquid - design specific gravity liquid in raw molases.
   * @param allowableStress - allowable stress in mega pascal. the value cannot be 0.
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

export const Rope = {
  SafetyFactor: {
    wire_sling: 5,
    wire_running: 3.5,
  },

  /**
   * Calculate Safety Working Load of wire rope sling
   *
   * @param diameter - diameter of the wire rope in inch.
   * @param grade - grade of the wire rope is one of [1770].
   *
   * @returns Safety Working Load in ton.
   */
  swlWireSling(diameter: number, grade: number): number {
    const zDiameter = z.number().positive().parse(diameter);
    const zGrade = z.literal(1770).parse(grade);

    if (zGrade == 1770) {
      return zDiameter ** 2 * 8;
    }

    return NaN;
  },

  /**
   * Calculate Safety Working Load of running wire rope
   *
   * @param diameter - diameter of the wire rope in inch.
   * @param reavingNumber - number of reaving used in the rope.
   * @param grade - grade of the wire rope is one of [1770].
   *
   * @returns Safety Working Load in kilo gram.
   */
  swlWireRunning(
    diameter: number,
    reavingNumber: number,
    grade: number,
  ): number {
    const zDiameter = z.number().positive().parse(diameter);
    const zReavingNumber = z.number().int().positive().parse(reavingNumber);
    const zGrade = z.literal(1770).parse(grade);

    if (zGrade == 1770) {
      return (
        (this.SafetyFactor.wire_sling / this.SafetyFactor.wire_running) *
        this.swlWireSling(zDiameter, zGrade) *
        zReavingNumber
      );
    }

    return NaN;
  },
};

export const Hydrant = {
  /**
   * Calcualte water flow of a nozzle in liter per minute
   *
   * @param nozzleInletDiamter - Nozzle Inlet Diameter in mili meter.
   * @param waterPreasure - Water Preasure of the nozzle in kilo gram per centi meter square.
   *
   * @returns water flow in liter per minute.
   */
  waterFlow(nozzleInletDiamter: number, waterPreasure: number): number {
    const zNozzleInletDiamter = z.number().positive().parse(nozzleInletDiamter);
    const zWaterPreasure = z.number().positive().parse(waterPreasure);

    return 0.653 * zNozzleInletDiamter ** 2 * Math.sqrt(zWaterPreasure);
  },
};

export const Girder = {
  /**
   * calculate max defelection given girder typee
   *
   * @param typee - type of girder could be one of ["single", "double"]
   * @param lengthOfSpan - length of the span in mili meter
   *
   * @returns maximum deflection allowed in mili meter
   */
  deflection(typee: string, lengthOfSpan: number): number {
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

  /**
   * Calculate breaking strength of an SWL for given safety factor
   *
   * @param swl - safety working load in kilo gram.
   * @param safetyFactor - constanta of safety factor
   *
   * @returns breaking strength in kilo gram
   */
  breakingStrength(swl: number, safetyFactor: number): number {
    const zSwl = z.number().parse(swl);
    const zSafetyFactor = z.number().parse(safetyFactor);

    return zSwl * zSafetyFactor;
  },

  /**
   * Calculate volume of a cube
   *
   * @param height - height of the cube in meter.
   * @param width - width of the cube in meter.
   * @param length - length of the cube in meter.
   *
   * @returns volume in meter cubic.
   */
  volumeCuboid(height: number, width: number, length: number): number {
    const zHeight = z.number().positive().parse(height);
    const zWidth = z.number().positive().parse(width);
    const zLength = z.number().positive().parse(length);

    return zHeight * zWidth * zLength;
  },

  /**
   * Calculate volume of a cylinder
   *
   * @param diameter - diameter of the cylinder in meter.
   * @param height - height of the cylinder in meter.
   *
   * @returns volume of the cylinder in meter cubic.
   */
  volumeCylinder(diameter: number, height: number): number {
    const zHeight = z.number().positive().parse(height);
    const zDiameter = z.number().positive().parse(diameter);

    return Math.PI * (zDiameter / 2) ** 2 * zHeight;
  },
};
