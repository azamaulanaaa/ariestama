import { Story, StoryDefault } from "@ladle/react";
import { TangkiTimbun } from "./mod.tsx";

export default {
  title: "Component / Calculator / Tangki Timbun",
} as StoryDefault;

export const Thickness: Story = () => <TangkiTimbun.Thickness locale="id-ID" />;
