import { z } from "zod";

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

export const Boiler = {
  /**
   * Calculates the temperature-dependent stress reduction factor (f(Θ)) based on
   * the Grondslagen/older empirical formula.
   *
   * @param temperature - The gas operating temperature (Θ) in celcius
   * @returns The unitless temperature reduction factor f(Θ).
   */
  temperatureFactor_Grondslagen(
    temperature: number,
  ) {
    const zProps = z.object({
      Theta: z.number(),
    })
      .parse({ Theta: temperature });

    return (1 - (zProps.Theta / 525) ** 2);
  },

  /**
   * Calculates the corrected yield strength (SV^Θ) by applying the temperature factor.
   * This result represents the allowable stress at the operating temperature.
   *
   * @param temperatureFactor - The unitless reduction factor f(Θ) obtained from temperatureFactorGrondslagen.
   * @param yieldStrength - The base yield strength (SV) at a reference/ambient temperature in kilo gram force per mili meter square.
   * @returns The corrected yield strength (SV^Θ) with the same unit as yieldStrength.
   */
  correctedYieldStrength_Grondslagen(
    temperatureFactor: number,
    yieldStrength: number,
  ) {
    const zProps = z.object({
      temperatureFactor: z.number(),
      yieldStrength: z.number(),
    }).parse({ temperatureFactor, yieldStrength });

    return zProps.yieldStrength * zProps.temperatureFactor;
  },

  /**
   * Calculate minimum diameter required for a safety valve
   * based on Grondslagen formula
   *
   * @param areaChamber - The area of chamber in meter square.
   * @param pressure - The design pressure (P or p) in kilo gram force per centi meter square
   * @returns minimum diameter of a safety valve in mili meter
   */
  minDiameterSafetyValve_Grondslagen(
    areaChamber: number,
    pressure: number,
  ) {
    const zProps = z.object({
      r: z.number(),
      p: z.number(),
    }).parse({
      r: areaChamber,
      p: pressure,
    });

    return (2 / 3) * 140 * Math.sqrt((zProps.r + 0.4) / (zProps.p + 4));
  },

  /**
   * Calculates the minimum required pipe thickness (t) for a Fire-Tube Boiler
   * based on the Grondslagen formula.
   *
   * @param pressure - The design pressure (P or p) in kilo gram force per centi meter square.
   * @param innerDiameter - The internal diameter of the tube (d) in mili meter.
   * @param weldJointEfficiency - The factor for weld strength or safety (x).
   * @param correctedYieldStrength - The allowable stress (SV^Θ) obtained from correctedYieldStrengthGrondslagen.
   * @param corrosionAllowance - The added thickness for corrosion (Δ) mili meter.
   * @returns The minimum required shell thickness (t) with the same unit as innerDiameter and corrosionAllowance in mili meter.
   */
  minPipeThickness_Grondslagen(
    pressure: number,
    innerDiameter: number,
    weldJointEfficiency: number,
    correctedYieldStrength: number,
    corrosionAllowance: number,
  ) {
    const zProps = z.object({
      p: z.number(),
      d: z.number(),
      x: z.number(),
      svTheta: z.number(),
      delta: z.number(),
    }).parse({
      p: pressure,
      d: innerDiameter,
      x: weldJointEfficiency,
      svTheta: correctedYieldStrength,
      delta: corrosionAllowance,
    });

    return (zProps.p * zProps.d * zProps.x) /
        (200 * zProps.svTheta + zProps.p * zProps.x) + zProps.delta;
  },

  /**
   * Calculates the minimum required shell thickness (t) for a Fire-Tube Boiler shell
   * based on the Grondslagen formula.
   *
   * @param pressure - The design pressure (P or p) in kilo gram force per centi meter square.
   * @param innerDiameter - The internal diameter of the shell (d) in mili meter.
   * @param weldJointEfficiency - The factor for weld strength or safety (x).
   * @param shellReductionFactor - The factor for construction strength reduction (z).
   * @param constantC - A formula-specific constant (c), often related to stress concentration.
   * @param correctedYieldStrength - The allowable stress (SV^Θ) obtained from correctedYieldStrengthGrondslagen.
   * @param corrosionAllowance - The added thickness for corrosion (Δ).
   * @returns The minimum required shell thickness (t) with the same unit as innerDiameter and corrosionAllowance in mili meter.
   */
  minShellFireTubeThickness_Grondslagen(
    pressure: number,
    innerDiameter: number,
    weldJointEfficiency: number,
    shellReductionFactor: number,
    constantC: number,
    correctedYieldStrength: number,
    corrosionAllowance: number,
  ) {
    const zProps = z.object({
      p: z.number(),
      d: z.number(),
      x: z.number(),
      z: z.number(),
      c: z.number(),
      svTheta: z.number(),
      delta: z.number(),
    }).parse({
      p: pressure,
      d: innerDiameter,
      x: weldJointEfficiency,
      z: shellReductionFactor,
      c: constantC,
      svTheta: correctedYieldStrength,
      delta: corrosionAllowance,
    });

    return (zProps.p * zProps.d * zProps.x) /
        (2 * (zProps.z - zProps.c) * zProps.svTheta - zProps.p * zProps.x) +
      zProps.delta;
  },

  /**
   * Calculate efficiency of ligaments between tube holes in Water Tube
   * Base on Japaense Industrial Standart
   *
   * @param p - ptich of the tube holes in mili meter
   * @param d - diameter of the tube holes in mili meter
   *
   * @returns efficiency without unit
   */
  efficiencyLigamentsWaterTube_JIS(p: number, d: number): number {
    const zProps = z
      .object({
        p: z.number(),
        d: z.number(),
      })
      .parse({ p, d });

    return (zProps.p - zProps.d) / zProps.p;
  },

  /**
   * Calculate Minimum Plate Thickness of Drum in Water Tube
   * Base on Japaense Industrial Standart
   *
   * @param type - plate type is one of ["ferritic_steel", "austenitic_steel"]
   * @param pressure - maximum allowable working preasure in kilogram-force per centi meter square
   * @param innerDiameter - inside diameter of the shell or dome in mili meter
   * @param sigma - allowable tensile stress of the material used kilogram-force per mili meter square
   * @param efficiencyLigament - minimum joint efficiency of the part with a longitudinal joint or a ... of openings
   * @param temperature - temperature of the steam in celcius
   * @param additionalThickness - additional thickness in mili meter shall be 1 mm
   *
   * @returns minimum thickness of the in mili meter
   */
  minDrumWaterTubeThickness_JIS(
    type: string,
    pressure: number,
    innerDiameter: number,
    sigma: number,
    efficiencyLigament: number,
    temperature: number,
    additionalThickness: number = 1,
  ) {
    const zProps = z
      .object({
        type: z.union([
          z.literal("ferritic_steel"),
          z.literal("austenitic_steel"),
        ]),
        p: z.number(),
        di: z.number(),
        sigma: z.number(),
        pi: z.number(),
        temp: z.number(),
        a: z.number().optional().default(1),
      })
      .parse({
        type,
        p: pressure,
        di: innerDiameter,
        sigma,
        pi: efficiencyLigament,
        temp: temperature,
        a: additionalThickness,
      });

    let k: number = NaN;
    if (zProps.type == "ferritic_steel") {
      if (zProps.temp <= 480) k = 0.4;
      else if (zProps.temp >= 620) k = 0.7;
      else {
        const points: [number, number][] = [
          [480, 0.4],
          [510, 0.5],
          [535, 0.7],
          [565, 0.7],
          [590, 0.7],
          [620, 0.7],
        ];

        k = General.lagrangeInterpolation(points, zProps.temp);
      }
    } else if (zProps.type == "austenitic_steel") {
      if (zProps.temp <= 480) k = 0.4;
      else if (zProps.temp >= 620) k = 0.7;
      else {
        const points: [number, number][] = [
          [480, 0.4],
          [510, 0.7],
          [535, 0.7],
          [565, 0.7],
          [590, 0.5],
          [620, 0.7],
        ];

        k = General.lagrangeInterpolation(points, zProps.temp);
      }
    }

    return (
      (zProps.p * zProps.di) /
        (200 * zProps.sigma * zProps.pi - 2 * zProps.p * (1 - k)) +
      zProps.a
    );
  },

  /**
   * Calculate minimum thickness of water tube hole
   * base on JIS Standart
   *
   * @param pressure - maximum allowable working pressure in kilogram-force per centi meter square
   * @param outterDiameter - outter diameter of the steel tube in mili meter
   * @param sigma - allowable tensile stress of the material in kilogram-force per mili meter square
   * @param additionalThickness - additional thickness in mili meter and shall be 1 mm
   *
   * @returns minimum thickness required of water tube in mili meter
   */
  minThicknesTubeHole_JIS(
    pressure: number,
    outterDiameter: number,
    sigma: number,
    additionalThickness: number = 1,
  ) {
    const zProps = z
      .object({
        pressure: z.number(),
        outterDiameter: z.number(),
        sigma: z.number(),
        additionalThickness: z.number(),
      })
      .parse({
        pressure,
        outterDiameter,
        sigma,
        additionalThickness,
      });

    return (
      (zProps.pressure * zProps.outterDiameter) /
        (200 * zProps.sigma + zProps.pressure) +
      0.005 * zProps.outterDiameter +
      zProps.additionalThickness
    );
  },
};

export const APAR = {
  /**
   * Caculate required number of APAR given area
   *
   * @param {number} area - area where APAR should exist in meter square
   * @returns {number} number of APAR
   */
  minUnit(area: number): number {
    const zParams = z
      .object({
        area: z.number(),
      })
      .parse({ area });

    return Math.ceil(zParams.area / (15 * 15));
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
   * Calculate the area of a rectangle
   *
   * @param {number} width - the width of the rectangle in meter
   * @param {number} height - the height of the rectangle in meter
   *
   * @returns {number} the area of the rectangle in meter square
   */
  areaRectangular(height: number, width: number): number {
    const params = z
      .object({
        height: z.number(),
        width: z.number(),
      })
      .parse({ height, width });

    return params.height * params.width;
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

  /**
   * Performs Lagrange interpolation to find the value of the polynomial at a given x.
   *
   * @param points - An array of Point tuples that define the data points through which the polynomial will pass.
   * @param x - The x-coordinate at which to evaluate the polynomial.
   * @returns The interpolated y value corresponding to the given x.
   *
   * @example
   * const points: [number, number][] = [
   *     [0, 1],
   *     [1, 2],
   *     [2, 0],
   *     [3, 5],
   *     [4, 4],
   * ];
   *
   * const yValue = lagrangeInterpolation(points, 2.5);
   * console.log(yValue); // Outputs the interpolated y value at x = 2.5
   */
  lagrangeInterpolation(points: [number, number][], x: number): number {
    let result = 0; // Initialize the result to zero
    const n = points.length; // Number of points

    // Loop over each point
    for (let i = 0; i < n; i++) {
      let term = points[i][1]; // Start with the y-value of the current point

      // Calculate the Lagrange basis polynomial
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          // Multiply by the factors for L_i(x)
          term *= (x - points[j][0]) / (points[i][0] - points[j][0]);
        }
      }
      result += term; // Add the current term to the result
    }

    return result; // Return the final interpolated value
  },
};
