import { Story, StoryDefault } from "@ladle/react";
import { Deflection, DeflectionProps } from "./deflection.tsx";

export default {
  title: "Component / Calculator / Girder",
} as StoryDefault;

export const DemoDeflection: Story<DeflectionProps> = (props) => (
  <Deflection {...props} />
);
DemoDeflection.storyName = "Deflection";
DemoDeflection.args = {
  className: "max-w-100",
  locale: "id-ID",
};
