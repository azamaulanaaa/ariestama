import { Story, StoryDefault } from "@ladle/react";
import { SearchBox, SearchBoxProps } from "./mod.tsx";

export default {
  title: "Component",
} as StoryDefault;

export const Demo: Story<SearchBoxProps> = (props) => {
  return <SearchBox {...props} />;
};
Demo.storyName = "Search Box";
Demo.args = {
  className: "w-100",
  placeHolder: "Search for person",
  items: [
    { title: "Antoni Yoshua", keywords: ["wrestler"] },
    { title: "Khabib Junior", keywords: ["footballer"] },
  ],
  onTitleClick: (title) => {
    alert(title);
  },
};
