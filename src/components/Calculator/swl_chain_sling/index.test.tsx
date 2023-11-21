import { cleanup, render, screen } from "@testing-library/react";
import SWLChainSlingCalculator from ".";
import UserEvent from "@testing-library/user-event";

describe("SWL Chain Sling Calculator Components", () => {
  afterEach(() => {
    cleanup();
  });

  it("render default", () => {
    render(<SWLChainSlingCalculator />);
    const grade = screen.getByLabelText(/Grade/);
    const diameterOfChain = screen.getByLabelText(/Diameter of Chain/);
    const swl = screen.getByLabelText(/Safety Working Load \(SWL\)/);

    expect(grade).toHaveDisplayValue("80");
    expect(diameterOfChain).toHaveDisplayValue("0");
    expect(swl).toHaveDisplayValue("0.0");
  });

  it("calculate as calculator gives", async () => {
    const data = { diameter: "6", grade: "100", swl: "1.4" };

    const user = UserEvent.setup();

    render(<SWLChainSlingCalculator />);

    const grade = screen.getByLabelText(/Grade/);
    const diameterOfChain = screen.getByLabelText(/Diameter of Chain/);
    const swl = screen.getByLabelText(/Safety Working Load \(SWL\)/);

    await user.selectOptions(grade, data.grade);
    await user.type(diameterOfChain, data.diameter);

    expect(swl).toHaveDisplayValue(data.swl);
  });
});
