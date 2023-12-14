import { render, screen } from "@testing-library/react";
import ViewButton from "./view_button";

describe("ViewButton Companies Table", () => {
  it("render href properly", () => {
    const testdata = {
      href: "a;sldfkj",
    };

    render(<ViewButton href={testdata.href} />);

    const button = screen.getByRole("link");

    expect(button).toHaveAttribute("href", testdata.href);
  });
});
