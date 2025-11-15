import { Story, StoryDefault } from "@ladle/react";
import { APAR } from "./mod.tsx";

export default {
  title: "Component / Calculator / APAR",
} as StoryDefault;

export const MinUnit: Story = () => <APAR.MinUnit locale="id-ID" />;
