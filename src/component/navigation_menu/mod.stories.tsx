import { Story, StoryDefault } from "@ladle/react";
import { MemoryRouter } from "react-router";

import { NaviationMenu, NavigationMenuProps } from "./mod.tsx";

export default {
  title: "Component",
} as StoryDefault;

export const Demo: Story<NavigationMenuProps> = (props) => {
  return (
    <MemoryRouter>
      <NaviationMenu {...props} />
    </MemoryRouter>
  );
};
Demo.storyName = "Naviation Menu";
Demo.args = {
  className: "w-100",
  items: [
    { href: "/antoni_yoshua", value: "Antoni Yoshua" },
    { href: "/khabib_junior", value: "Khabib Junior" },
  ],
};
