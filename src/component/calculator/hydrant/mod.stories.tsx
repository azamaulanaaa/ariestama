import { Story, StoryDefault } from "@ladle/react";
import { Reservoir, ReservoirProps } from "./reservoir.tsx";

export default {
  title: "Component / Calculator / Hydrant",
} as StoryDefault;

export const DemoReservoir: Story<ReservoirProps> = (props) => (
  <Reservoir {...props} />
);
DemoReservoir.storyName = "Reservoir";
DemoReservoir.args = {
  locale: "id-ID",
};
