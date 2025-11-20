import { Story, StoryDefault } from "@ladle/react";
import { ChainSWLBlock, ChainSWLBlockProps } from "./swl_block.tsx";
import { ChainSWLSling, ChainSWLSlingProps } from "./swl_sling.tsx";

export default {
  title: "Component / Calculator / Chain",
} as StoryDefault;

export const DemoSwlBlock: Story<ChainSWLBlockProps> = (props) => (
  <ChainSWLBlock {...props} />
);
DemoSwlBlock.storyName = "SWL Block";
DemoSwlBlock.args = {
  className: "max-w-100",
  locale: "id-ID",
};

export const DemoSwlSling: Story<ChainSWLSlingProps> = (props) => (
  <ChainSWLSling {...props} />
);
DemoSwlSling.storyName = "SWL Sling";
DemoSwlSling.args = {
  className: "max-w-100",
  locale: "id-ID",
};
