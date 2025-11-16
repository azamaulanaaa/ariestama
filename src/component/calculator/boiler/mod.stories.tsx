import { Story, StoryDefault } from "@ladle/react";
import { Boiler } from "./mod.tsx";

export default {
  title: "Component / Calculator / Boiler",
} as StoryDefault;

export const PipeThickness: Story = () => (
  <Boiler.PipeThickness locale="id-ID" />
);
export const ShellFireTubeThickness: Story = () => (
  <Boiler.ShellFireTubeThickness locale="id-ID" />
);
export const DrumWaterTubeThickness: Story = () => (
  <Boiler.DrumWaterTubeThickness locale="id-ID" />
);
export const TubeHoleThickness: Story = () => (
  <Boiler.TubeHoleThickness locale="id-ID" />
);
export const SafetyValveDiameter: Story = () => (
  <Boiler.SafetyValveDiameter locale="id-ID" />
);
