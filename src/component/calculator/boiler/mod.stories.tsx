import { Story, StoryDefault } from "@ladle/react";
import {
  DrumWaterTubeThickness,
  DrumWaterTubeThicknessProps,
} from "./drum_water_tube_thickness.tsx";
import { PipeThickness, PipeThicknessProps } from "./pipe_thickness.tsx";
import {
  SafetyValveDiameter,
  SafetyValveDiameterProps,
} from "./safety_valve_diameter.tsx";
import {
  ShellFireTubeThickness,
  ShellFireTubeThicknessProps,
} from "./shell_fire_tube_thickness.tsx";
import {
  TubeHoleThickness,
  TubeHoleThicknessProps,
} from "./tube_hole_thickness.tsx";

export default {
  title: "Component / Calculator / Boiler",
} as StoryDefault;

export const DemoDrumWaterTubeThickness: Story<DrumWaterTubeThicknessProps> = (
  props,
) => <DrumWaterTubeThickness {...props} />;
DemoDrumWaterTubeThickness.storyName = "Drum Water Tube Thickness";
DemoDrumWaterTubeThickness.args = {
  locale: "id-ID",
};

export const DemoPipeThickness: Story<PipeThicknessProps> = (props) => (
  <PipeThickness {...props} />
);
DemoPipeThickness.storyName = "PipeThickness";
DemoPipeThickness.args = {
  locale: "id-ID",
};

export const DemoSafetyValveDiameter: Story<SafetyValveDiameterProps> = (
  props,
) => <SafetyValveDiameter {...props} />;
DemoSafetyValveDiameter.storyName = "Safety Valve Diameter";
DemoSafetyValveDiameter.args = {
  locale: "id-ID",
};

export const DemoShellFireTubeThickness: Story<ShellFireTubeThicknessProps> = (
  props,
) => <ShellFireTubeThickness {...props} />;
DemoShellFireTubeThickness.storyName = "Shell Fire Tube Thickness";
DemoShellFireTubeThickness.args = {
  locale: "id-ID",
};

export const DemoTubeHoleThickness: Story<TubeHoleThicknessProps> = (props) => (
  <TubeHoleThickness {...props} />
);
DemoTubeHoleThickness.storyName = "Tube Hole Thickness";
DemoTubeHoleThickness.args = {
  locale: "id-ID",
};
