import { Story, StoryDefault } from "@ladle/react";
import { UnitCount, UnitCountProps } from "./unit_count.tsx";

export default {
  title: "Component / Calculator / Alat Pemadam Api Ringan",
} as StoryDefault;

export const Demo: Story<UnitCountProps> = (props) => <UnitCount {...props} />;
Demo.storyName = "Unit Count";
Demo.args = {
  className: "max-w-100",
  locale: "id-ID",
};
