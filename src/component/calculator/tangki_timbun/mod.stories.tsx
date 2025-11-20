import { Story, StoryDefault } from "@ladle/react";
import {
  TangkiTimbunThickness,
  TangkiTimbunThicknessProps,
} from "./thickness.tsx";

export default {
  title: "Component / Calculator / Tangki Timbun",
} as StoryDefault;

export const DemoThickness: Story<TangkiTimbunThicknessProps> = (props) => (
  <TangkiTimbunThickness {...props} />
);
DemoThickness.storyName = "Thickness";
DemoThickness.args = {
  className: "max-w-100",
  locale: "id-ID",
};
