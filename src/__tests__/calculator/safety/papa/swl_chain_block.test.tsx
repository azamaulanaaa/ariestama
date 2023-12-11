import { render, screen } from "@testing-library/react";

import SWLChainBlock from "@/pages/calculator/safety/papa/swl_chain_block";

describe("SWL Chain Block Calculator Page", () => {
  it("render SWL Chain Block Calculator", () => {
    render(<SWLChainBlock />);

    screen.getByTestId("SWLChainBlockCalculator");
  });
});
