import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import useNumber from ".";
import classNames from "classnames";

const InputNumberPropsSchema = z.object({
  locale: z.string().default("en-US"),
});

export type InputNumberProps = z.input<typeof InputNumberPropsSchema>;

const Component = (props: InputNumberProps) => {
  const zProps = InputNumberPropsSchema.passthrough().parse(props);
  const [ref, _, error] = useNumber(zProps.locale);

  return (
    <input
      ref={ref}
      type="text"
      className={classNames("input input-bordered text-right", {
        "input-error": error !== null,
      })}
      placeholder="0"
    />
  );
};

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    locale: "en-US",
  },
};
