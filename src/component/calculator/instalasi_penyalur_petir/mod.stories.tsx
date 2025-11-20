import { Story, StoryDefault } from "@ladle/react";
import {
  IPPRadiusConvensionalProps,
  IPPRadiusConventional,
} from "./radius_konvensional.tsx";

export default {
  title: "Component / Calculator / Instalasi Penyalur Petir",
} as StoryDefault;

export const DemoRadiusConventional: Story<IPPRadiusConvensionalProps> = (
  props,
) => <IPPRadiusConventional {...props} />;
DemoRadiusConventional.storyName = "Radius Conventional";
DemoRadiusConventional.args = {
  className: "max-w-100",
  locale: "id-ID",
};
