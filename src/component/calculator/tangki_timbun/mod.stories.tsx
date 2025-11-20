import { Story, StoryDefault } from "@ladle/react";
import { Thickness, ThicknessProps } from "./thickness.tsx";

export default {
  title: "Component / Calculator / Tangki Timbun",
} as StoryDefault;

export const DemoThickness: Story<ThicknessProps> = (props) => (
  <Thickness {...props} />
);
DemoThickness.storyName = "Thickness";
DemoThickness.args = {
  locale: "id-ID",
};
