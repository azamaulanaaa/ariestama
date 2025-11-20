import { Story, StoryDefault } from "@ladle/react";
import { GirderDeflection, GirderDeflectionProps } from "./deflection.tsx";

export default {
  title: "Component / Calculator / Girder",
} as StoryDefault;

export const DemoDeflection: Story<GirderDeflectionProps> = (props) => (
  <GirderDeflection {...props} />
);
DemoDeflection.storyName = "Deflection";
DemoDeflection.args = {
  className: "max-w-100",
  locale: "id-ID",
};
