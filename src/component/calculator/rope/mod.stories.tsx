import { Story, StoryDefault } from "@ladle/react";
import { RopeSWLWireRope, RopeSWLWireRopeProps } from "./swl_wire_rope.tsx";

export default {
  title: "Component / Calculator / Rope",
} as StoryDefault;

export const DemoSWLWireRope: Story<RopeSWLWireRopeProps> = (props) => (
  <RopeSWLWireRope {...props} />
);
DemoSWLWireRope.storyName = "SWL Wire Rope";
DemoSWLWireRope.args = {
  className: "max-w-100",
  locale: "id-ID",
};
