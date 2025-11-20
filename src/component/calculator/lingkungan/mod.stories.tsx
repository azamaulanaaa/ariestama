import { Story, StoryDefault } from "@ladle/react";
import {
  AnchorResultante,
  AnchorResultanteProps,
} from "./anchor_resultante.tsx";

export default {
  title: "Component / Calculator / Lingkungan",
} as StoryDefault;

export const DemoAnchorResultante: Story<AnchorResultanteProps> = (props) => (
  <AnchorResultante {...props} />
);
DemoAnchorResultante.storyName = "Anchor Resultante";
DemoAnchorResultante.args = {
  locale: "id-ID",
};
