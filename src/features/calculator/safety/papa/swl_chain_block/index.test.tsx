import { act, cleanup, render, screen, within } from "@testing-library/react";
import SWLChainBlockCalculator from ".";
import UserEvent from "@testing-library/user-event";

describe("SWL Chain Block Calculator Components", () => {
  afterEach(() => {
    cleanup();
  });

  it("render default", async () => {
    await act(async () => {
      render(<SWLChainBlockCalculator />);
    });

    const form = screen.getByTestId("SWLChainBlockCalculator");
    const grade = within(form).getByLabelText(/Grade/);
    const diameterOfChain = within(form).getByLabelText(/Diameter of Chain/);
    const numberOfReaving = within(form).getByLabelText(/Number of Reaving/);
    const swl = within(form).getByLabelText(/Safety Working Load \(SWL\)/);

    expect(grade).toHaveDisplayValue("80");
    expect(diameterOfChain).toHaveDisplayValue("0");
    expect(numberOfReaving).toHaveDisplayValue("1");
    expect(swl).toHaveDisplayValue("0.0");
  });

  it("calculate as calculator gives", async () => {
    const data = {
      diameter: "8",
      numberOfReaving: "3",
      grade: "80",
      swl: "7.6",
    };

    const user = UserEvent.setup();

    await act(async () => {
      render(<SWLChainBlockCalculator />);
    });

    const form = screen.getByTestId("SWLChainBlockCalculator");
    const grade = within(form).getByLabelText(/Grade/);
    const diameterOfChain = within(form).getByLabelText(/Diameter of Chain/);
    const numberOfReaving = within(form).getByLabelText(/Number of Reaving/);
    const swl = within(form).getByLabelText(/Safety Working Load \(SWL\)/);

    await user.selectOptions(grade, data.grade);
    await user.clear(diameterOfChain);
    await user.type(diameterOfChain, data.diameter);
    await user.clear(numberOfReaving);
    await user.type(numberOfReaving, data.numberOfReaving);

    expect(swl).toHaveDisplayValue(data.swl);
  });
});
