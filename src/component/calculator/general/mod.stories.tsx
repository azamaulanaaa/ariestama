import { Story, StoryDefault } from "@ladle/react";
import { Volume, VolumeProps } from "./volume.tsx";

export default {
  title: "Component / Calculator / General",
} as StoryDefault;

export const DemoVolume: Story<VolumeProps> = (props) => <Volume {...props} />;
DemoVolume.storyName = "Volume";
DemoVolume.args = {
  className: "max-w-100",
  locale: "id-ID",
};
