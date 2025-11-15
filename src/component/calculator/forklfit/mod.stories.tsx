import { Story, StoryDefault } from "@ladle/react";
import { Forklift } from "./mod.tsx";

export default {
  title: "Component / Calculator / Forklift",
} as StoryDefault;

export const SwlFork: Story = () => <Forklift.SWLFork locale="id-ID" />;
