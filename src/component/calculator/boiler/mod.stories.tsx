import { Story, StoryDefault } from "@ladle/react";
import { Boiler } from "./mod.tsx";

export default {
  title: "Component / Calculator / Boiler",
} as StoryDefault;

export const FireTubeTubeThickness: Story = () => (
  <Boiler.FireTubeTubeThickness locale="id-ID" />
);
export const FireTubeShellThickness: Story = () => (
  <Boiler.FireTubeShellThickness locale="id-ID" />
);
export const WaterTubeDrumThickness: Story = () => (
  <Boiler.WaterTubeDrumThickness locale="id-ID" />
);
export const TubeHoleThickness: Story = () => (
  <Boiler.TubeHoleThickness locale="id-ID" />
);
