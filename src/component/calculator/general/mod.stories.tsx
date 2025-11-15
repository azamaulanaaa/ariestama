import { Story, StoryDefault } from "@ladle/react";
import { General } from "./mod.tsx";

export default {
  title: "Component / Calculator / General",
} as StoryDefault;

export const Volume: Story = () => <General.Volume locale="id-ID" />;
