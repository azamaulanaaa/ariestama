import { render, screen } from "@testing-library/react";

import SWLChainSling from "@/pages/calculator/safety/papa/swl_chain_sling";

describe("SWL Chain Sling Calculator Page", () => {
  it("render SWL Chain Sling Calculator", () => {
    render(<SWLChainSling />);

    screen.getByTestId("SWLChainSlingCalculator");
  });
});
