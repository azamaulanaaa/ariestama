import { act, cleanup, render, screen, within } from "@testing-library/react";
import SWLChainSlingCalculator from ".";
import UserEvent from "@testing-library/user-event";

describe("SWL Chain Sling Calculator Components", () => {
  afterEach(() => {
    cleanup();
  });

  it("render default", async () => {
    await act(async () => {
      render(<SWLChainSlingCalculator />);
    });

    const form = screen.getByTestId("SWLChainSlingCalculator");
    const grade = within(form).getByLabelText(/Grade/);
    const diameterOfChain = within(form).getByLabelText(/Diameter of Chain/);
    const swl = within(form).getByLabelText(/Safety Working Load \(SWL\)/);

    expect(grade).toHaveDisplayValue("80");
    expect(diameterOfChain).toHaveDisplayValue("0");
    expect(swl).toHaveDisplayValue("0.0");
  });

  it("calculate as calculator gives", async () => {
    const data = { diameter: "6", grade: "100", swl: "1.4" };

    const user = UserEvent.setup();

    await act(async () => {
      render(<SWLChainSlingCalculator />);
    });

    const form = screen.getByTestId("SWLChainSlingCalculator");
    const grade = within(form).getByLabelText(/Grade/);
    const diameterOfChain = within(form).getByLabelText(/Diameter of Chain/);
    const swl = within(form).getByLabelText(/Safety Working Load \(SWL\)/);

    await user.selectOptions(grade, data.grade);
    await user.clear(diameterOfChain);
    await user.type(diameterOfChain, data.diameter);

    expect(swl).toHaveDisplayValue(data.swl);
  });
});
