import { Story, StoryDefault } from "@ladle/react";
import {
  BejanaTekanPipeThickness,
  BejanaTekanPipeThicknessProps,
} from "./pipe_thickness.tsx";

export default {
  title: "Component / Calculator / Bejana Tekan",
} as StoryDefault;

export const DemoPipeThickness: Story<BejanaTekanPipeThicknessProps> = (
  props,
) => <BejanaTekanPipeThickness {...props} />;
DemoPipeThickness.storyName = "Pipe Thickness";
DemoPipeThickness.args = {
  className: "max-w-100",
  locale: "id-ID",
};
