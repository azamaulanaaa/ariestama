import { Story, StoryDefault } from "@ladle/react";
import { GeneralVolume, GeneralVolumeProps } from "./volume.tsx";

export default {
  title: "Component / Calculator / General",
} as StoryDefault;

export const DemoVolume: Story<GeneralVolumeProps> = (props) => (
  <GeneralVolume {...props} />
);
DemoVolume.storyName = "Volume";
DemoVolume.args = {
  className: "max-w-100",
  locale: "id-ID",
};
