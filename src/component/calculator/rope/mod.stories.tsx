import { Story, StoryDefault } from "@ladle/react";
import { SwlWireRope, SwlWireRopeProps } from "./swl_wire_rope.tsx";

export default {
  title: "Component / Calculator / Rope",
} as StoryDefault;

export const DemoSWLWireRope: Story<SwlWireRopeProps> = (props) => (
  <SwlWireRope {...props} />
);
DemoSWLWireRope.storyName = "SWL Wire Rope";
DemoSWLWireRope.args = {
  locale: "id-ID",
};
