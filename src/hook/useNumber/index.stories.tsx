import { Story } from "@ladle/react";
import { z } from "zod";

import { cn } from "@/util/classname.tsx";
import useNumber from "./index.tsx";

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

export const en_us: Story = () => <InputNumber locale="en-US" />;
export const id_id: Story = () => <InputNumber locale="id-ID" />;
