import { z } from "zod";

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
