import { Story, StoryDefault } from "@ladle/react";
import {
  LingkunganAnchorResultante,
  LingkunganAnchorResultanteProps,
} from "./anchor_resultante.tsx";

export default {
  title: "Component / Calculator / Lingkungan",
} as StoryDefault;

export const DemoAnchorResultante: Story<LingkunganAnchorResultanteProps> = (
  props,
) => <LingkunganAnchorResultante {...props} />;
DemoAnchorResultante.storyName = "Anchor Resultante";
DemoAnchorResultante.args = {
  className: "max-w-100",
  locale: "id-ID",
};
