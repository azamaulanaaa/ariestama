import { Story, StoryDefault } from "@ladle/react";
import {
  HydrantReservoirCapacity,
  HydrantReservoirCapacityProps,
} from "./reservoir_capacity.tsx";

export default {
  title: "Component / Calculator / Hydrant",
} as StoryDefault;

export const DemoReservoirCapacity: Story<HydrantReservoirCapacityProps> = (
  props,
) => <HydrantReservoirCapacity {...props} />;
DemoReservoirCapacity.storyName = "Reservoir Capacity";
DemoReservoirCapacity.args = {
  className: "max-w-100",
  locale: "id-ID",
};
