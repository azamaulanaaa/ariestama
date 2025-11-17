import { Story, StoryDefault } from "@ladle/react";
import { BejanaTekan } from "./mod.tsx";

export default {
  title: "Component / Calculator / Bejana Tekan",
} as StoryDefault;

export const PipeThickness: Story = () => (
  <BejanaTekan.PipeThickness locale="id-ID" />
);
