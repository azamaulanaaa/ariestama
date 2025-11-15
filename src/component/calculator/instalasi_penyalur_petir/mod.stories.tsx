import { Story, StoryDefault } from "@ladle/react";
import { InstalasiPenyalurPetir } from "./mod.tsx";

export default {
  title: "Component / Calculator / Instalasi Penyalur Petir",
} as StoryDefault;

export const RadiusConventional: Story = () => (
  <InstalasiPenyalurPetir.RadiusConventional locale="id-ID" />
);
