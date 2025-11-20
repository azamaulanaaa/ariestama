import { Story, StoryDefault } from "@ladle/react";
import {
  ReservoirCapacity,
  ReservoirCapacityProps,
} from "./reservoir_capacity.tsx";

export default {
  title: "Component / Calculator / Hydrant",
} as StoryDefault;

export const DemoNozzleWaterFlow: Story<ReservoirCapacityProps> = (props) => (
  <ReservoirCapacity {...props} />
);
DemoNozzleWaterFlow.storyName = "Reservoir Capacity";
DemoNozzleWaterFlow.args = {
  className: "max-w-100",
  locale: "id-ID",
};
