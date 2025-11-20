import { Story, StoryDefault } from "@ladle/react";
import { SWLBlock, SWLBlockProps } from "./swl_block.tsx";
import { SWLSling, SWLSlingProps } from "./swl_sling.tsx";

export default {
  title: "Component / Calculator / Chain",
} as StoryDefault;

export const DemoSwlBlock: Story<SWLBlockProps> = (props) => (
  <SWLBlock {...props} />
);
DemoSwlBlock.storyName = "SWL Block";
DemoSwlBlock.args = {
  locale: "id-ID",
};

export const DemoSwlSling: Story<SWLSlingProps> = (props) => (
  <SWLSling {...props} />
);
DemoSwlSling.storyName = "SWL Sling";
DemoSwlSling.args = {
  locale: "id-ID",
};
