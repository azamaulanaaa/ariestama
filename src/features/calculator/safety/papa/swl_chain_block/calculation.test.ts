import { Grade, SWLChainBlock_ton } from "./calculation";

describe("Calculation of SWLChainBlock_ton Component", () => {
  it("estimate SWL Chain Block with error less than 0.05 ton", () => {
    type TestData = {
      diameter: number;
      numberOfReaving: number;
      grade: Grade;
      swl: number;
    };

    const testDatas: TestData[] = [
      { diameter: 6, numberOfReaving: 1, grade: 100, swl: 1.8 },
      { diameter: 6, numberOfReaving: 2, grade: 100, swl: 3.6 },
      { diameter: 7, numberOfReaving: 1, grade: 80, swl: 1.9 },
      { diameter: 8, numberOfReaving: 1, grade: 80, swl: 2.5 },
      { diameter: 8, numberOfReaving: 3, grade: 80, swl: 7.6 },
      { diameter: 8, numberOfReaving: 1, grade: 100, swl: 3.2 },
      { diameter: 10, numberOfReaving: 1, grade: 80, swl: 4 },
      { diameter: 10, numberOfReaving: 1, grade: 100, swl: 5.0 },
      { diameter: 10, numberOfReaving: 5, grade: 100, swl: 24.9 },
      { diameter: 13, numberOfReaving: 1, grade: 80, swl: 6.7 },
      { diameter: 13, numberOfReaving: 1, grade: 100, swl: 8.4 },
    ];

    testDatas.forEach((testData) => {
      expect(
        SWLChainBlock_ton(
          testData.diameter,
          testData.numberOfReaving,
          testData.grade,
        ),
      ).toBeCloseTo(testData.swl, 1);
    });
  });
});
