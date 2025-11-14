import { Story, StoryDefault } from "@ladle/react";
import { Rope } from "./mod.tsx";

export default {
  title: "Calculator / Rope",
} as StoryDefault;

export const SWLWireRope: Story = () => <Rope.SwlWireRope locale="id-ID" />;
