import { Story, StoryDefault } from "@ladle/react";
import { z } from "zod";

import { cn } from "@/util/classname.ts";
import { useNumber } from "./useNumber.tsx";

export default {
  title: "Hook / useNumber",
} as StoryDefault;

const InputNumberPropsSchema = z.object({
  locale: z.string().default("en-US"),
});
type InputNumberProps = z.input<typeof InputNumberPropsSchema>;

const InputNumber = (props: InputNumberProps) => {
  const zProps = InputNumberPropsSchema.parse(props);
  const [ref, _, error] = useNumber(zProps.locale);

  return (
    <input
      ref={ref}
      type="text"
      className={cn("input input-bordered text-right", {
        "input-error": error !== null,
      })}
      placeholder="0"
    />
  );
};

export const Basic: Story<{ locale: string }> = (props) => (
  <InputNumber locale={props.locale} />
);
Basic.args = {
  locale: "id-ID",
};
Basic.argTypes = {
  locale: {
    options: ["en-US", "id-ID"],
    control: {
      type: "select",
    },
  },
};
