import { Story, StoryDefault } from "@ladle/react";
import { Girder } from "./mod.tsx";

export default {
  title: "Component / Calculator / Girder",
} as StoryDefault;

export const Deflection: Story = () => <Girder.Deflection locale="id-ID" />;
