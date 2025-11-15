import { Story, StoryDefault } from "@ladle/react";
import { Hydrant } from "./mod.tsx";

export default {
  title: "Component / Calculator / Hydrant",
} as StoryDefault;

export const Reservoir: Story = () => <Hydrant.Reservoir locale="id-ID" />;
