import { Story, StoryDefault } from "@ladle/react";
import {
  BoilerDrumWaterTubeThickness,
  BoilerDrumWaterTubeThicknessProps,
} from "./drum_water_tube_thickness.tsx";
import {
  BoilerPipeThickness,
  BoilerPipeThicknessProps,
} from "./pipe_thickness.tsx";
import {
  BoilerSafetyValveDiameter,
  BoilerSafetyValveDiameterProps,
} from "./safety_valve_diameter.tsx";
import {
  BoilerShellFireTubeThickness,
  BoilerShellFireTubeThicknessProps,
} from "./shell_fire_tube_thickness.tsx";
import {
  BoilerTubeHoleThickness,
  BoilerTubeHoleThicknessProps,
} from "./tube_hole_thickness.tsx";

export default {
  title: "Component / Calculator / Boiler",
} as StoryDefault;

export const DemoDrumWaterTubeThickness: Story<
  BoilerDrumWaterTubeThicknessProps
> = (
  props,
) => <BoilerDrumWaterTubeThickness {...props} />;
DemoDrumWaterTubeThickness.storyName = "Drum Water Tube Thickness";
DemoDrumWaterTubeThickness.args = {
  className: "max-w-100",
  locale: "id-ID",
};

export const DemoPipeThickness: Story<BoilerPipeThicknessProps> = (props) => (
  <BoilerPipeThickness {...props} />
);
DemoPipeThickness.storyName = "PipeThickness";
DemoPipeThickness.args = {
  className: "max-w-100",
  locale: "id-ID",
};

export const DemoSafetyValveDiameter: Story<BoilerSafetyValveDiameterProps> = (
  props,
) => <BoilerSafetyValveDiameter {...props} />;
DemoSafetyValveDiameter.storyName = "Safety Valve Diameter";
DemoSafetyValveDiameter.args = {
  className: "max-w-100",
  locale: "id-ID",
};

export const DemoShellFireTubeThickness: Story<
  BoilerShellFireTubeThicknessProps
> = (
  props,
) => <BoilerShellFireTubeThickness {...props} />;
DemoShellFireTubeThickness.storyName = "Shell Fire Tube Thickness";
DemoShellFireTubeThickness.args = {
  className: "max-w-100",
  locale: "id-ID",
};

export const DemoTubeHoleThickness: Story<BoilerTubeHoleThicknessProps> = (
  props,
) => <BoilerTubeHoleThickness {...props} />;
DemoTubeHoleThickness.storyName = "Tube Hole Thickness";
DemoTubeHoleThickness.args = {
  className: "max-w-100",
  locale: "id-ID",
};
