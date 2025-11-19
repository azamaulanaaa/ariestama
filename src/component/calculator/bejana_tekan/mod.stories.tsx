import { Story, StoryDefault } from "@ladle/react";
import { PipeThickness, PipeThicknessProps } from "./pipe_thickness.tsx";

export default {
  title: "Component / Calculator / Bejana Tekan",
} as StoryDefault;

export const DemoPipeThickness: Story<PipeThicknessProps> = (props) => (
  <PipeThickness {...props} />
);
DemoPipeThickness.storyName = "Pipe Thickness";
DemoPipeThickness.args = {
  className: "max-w-100",
  locale: "id-ID",
};
