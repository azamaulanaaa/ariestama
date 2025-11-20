import { Story, StoryDefault } from "@ladle/react";
import { ForkliftSWLFork, ForkliftSWLForkProps } from "./swl_fork.tsx";

export default {
  title: "Component / Calculator / Forklift",
} as StoryDefault;

export const DemoSWLFork: Story<ForkliftSWLForkProps> = (props) => (
  <ForkliftSWLFork {...props} />
);
DemoSWLFork.storyName = "SWL Fork";
DemoSWLFork.args = {
  className: "max-w-100",
  locale: "id-ID",
};
