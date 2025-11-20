import { Story, StoryDefault } from "@ladle/react";
import { SWLFork, SWLForkProps } from "./swl_fork.tsx";

export default {
  title: "Component / Calculator / Forklift",
} as StoryDefault;

export const DemoSWLFork: Story<SWLForkProps> = (props) => (
  <SWLFork {...props} />
);
DemoSWLFork.storyName = "SWL Fork";
DemoSWLFork.args = {
  className: "max-w-100",
  locale: "id-ID",
};
