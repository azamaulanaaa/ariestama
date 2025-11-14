import { Story, StoryDefault } from "@ladle/react";
import { APAR } from "./mod.tsx";

export default {
  title: "Calculator / APAR",
} as StoryDefault;

export const MinUnit: Story = () => <APAR.MinUnit locale="id-ID" />;
