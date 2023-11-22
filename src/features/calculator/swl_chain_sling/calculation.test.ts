import { Grade, SWLChainSling_ton } from "./calculation";

describe("Calculation of SWLChainSling Component", () => {
  it("estimate SWL Chain Sling with error less than 0.1 ton", () => {
    type TestData = {
      grade: Grade;
      diameter: number;
      swl: number;
    };

    const testDatas: TestData[] = [
      { diameter: 6, grade: 100, swl: 1.4 },
      { diameter: 7, grade: 80, swl: 1.5 },
      { diameter: 8, grade: 80, swl: 2.0 },
      { diameter: 8, grade: 100, swl: 2.5 },
      { diameter: 10, grade: 80, swl: 3.15 },
      { diameter: 10, grade: 100, swl: 4.0 },
      { diameter: 13, grade: 80, swl: 5.3 },
      { diameter: 13, grade: 100, swl: 6.7 },
      // { diameter: 16, grade: 80, swl: 8.0 },
      // { diameter: 16, grade: 100, swl: 10.0 },
    ];

    testDatas.forEach((testData) => {
      expect(SWLChainSling_ton(testData.diameter, testData.grade)).toBeCloseTo(
        testData.swl,
        1,
      );
    });
  });

  it("estimate SWL Chain Sling with error less than 0.1 ton", () => {
    type TestData = {
      grade: Grade;
      diameter: number;
      swl: number;
    };

    const testDatas: TestData[] = [
      { diameter: 6, grade: 100, swl: 1.4 },
      { diameter: 7, grade: 80, swl: 1.5 },
      { diameter: 8, grade: 80, swl: 2.0 },
      { diameter: 8, grade: 100, swl: 2.5 },
      { diameter: 10, grade: 80, swl: 3.15 },
      { diameter: 10, grade: 100, swl: 4.0 },
      { diameter: 13, grade: 80, swl: 5.3 },
      { diameter: 13, grade: 100, swl: 6.7 },
      // { diameter: 16, grade: 80, swl: 8.0 },
      // { diameter: 16, grade: 100, swl: 10.0 },
    ];

    testDatas.forEach((testData) => {
      expect(SWLChainSling_ton(testData.diameter, testData.grade)).toBeCloseTo(
        testData.swl,
        1,
      );
    });
  });
});
