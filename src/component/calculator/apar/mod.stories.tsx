import { Story, StoryDefault } from "@ladle/react";
import { APARUnitCount, APARUnitCountProps } from "./unit_count.tsx";

export default {
  title: "Component / Calculator / Alat Pemadam Api Ringan",
} as StoryDefault;

export const DemoUnitCount: Story<APARUnitCountProps> = (props) => (
  <APARUnitCount {...props} />
);
DemoUnitCount.storyName = "Unit Count";
DemoUnitCount.args = {
  className: "max-w-100",
  locale: "id-ID",
};
