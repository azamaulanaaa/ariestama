import { ReactNode } from "react";
import { z } from "zod";

import { cn } from "@/util/classname.ts";

export type CalculatorRootProps = {
  children: ReactNode;
  className?: string;
};

export const CalculatorRootPropsSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.string().optional(),
}) as z.ZodType<CalculatorRootProps>;

export function CalculatorRoot(props: CalculatorRootProps) {
  const zProps = CalculatorRootPropsSchema.parse(props);

  return (
    <div className={cn("card bg-base-100 shadow-sm", zProps.className)}>
      <div className="card-body">
        <div className="absolute inset-0 z-0 opacity-10 rounded-2xl bg-[url('/img/logo.png')] bg-top">
        </div>
        {zProps.children}
      </div>
    </div>
  );
}

export type CalculatorTitleProps = {
  children: ReactNode;
};

export const CalculatorTitlePropsSchema = z.object({
  children: z.custom<ReactNode>(),
}) as z.ZodType<CalculatorTitleProps>;

export function CalculatorTitle(props: CalculatorTitleProps) {
  const zProps = CalculatorTitlePropsSchema.parse(props);

  return <div className="card-title">{zProps.children}</div>;
}

export type CalculatorBodyProps = {
  children: ReactNode;
};

export const CalculatorBodyPropsSchema = z.object({
  children: z.custom<ReactNode>(),
}) as z.ZodType<CalculatorBodyProps>;

export function CalculatorBody(props: CalculatorBodyProps) {
  const zProps = CalculatorBodyPropsSchema.parse(props);

  return <div className="relative z-1 prose max-w-none">{zProps.children}</div>;
}
