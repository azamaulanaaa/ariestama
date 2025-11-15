import { Story, StoryDefault } from "@ladle/react";
import { Chain } from "./mod.tsx";

export default {
  title: "Component / Calculator / Chain",
} as StoryDefault;

export const SwlBlock: Story = () => <Chain.SWLBlock locale="id-ID" />;
export const SWLSling: Story = () => <Chain.SWLSling locale="id-ID" />;
