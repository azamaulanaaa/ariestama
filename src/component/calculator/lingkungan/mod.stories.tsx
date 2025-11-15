import { Story, StoryDefault } from "@ladle/react";
import { Lingkungan } from "./mod.tsx";

export default {
  title: "Component / Calculator / Lingkungan",
} as StoryDefault;

export const AnchorResultante: Story = () => (
  <Lingkungan.AnchorResultante locale="id-ID" />
);
