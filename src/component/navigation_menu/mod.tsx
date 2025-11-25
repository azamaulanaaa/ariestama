import { z } from "zod";
import { Link } from "react-router";

import { cn } from "@/util/classname.ts";

export type NavigationMenuItem = {
  href: string;
  value: string;
};

export const NavigationMenuItemSchema = z.object({
  href: z.string(),
  value: z.string(),
}) as z.ZodType<NavigationMenuItem>;

export type NavigationMenuProps = {
  className?: string;
  items: Array<NavigationMenuItem>;
};

export const NavigationMenuPropsSchema = z.object({
  className: z.string().optional(),
  items: z.array(NavigationMenuItemSchema),
}) as z.ZodType<NavigationMenuProps>;

export function NaviationMenu(props: NavigationMenuProps) {
  const zProps = NavigationMenuPropsSchema.parse(props);

  return (
    <ul className={cn("menu", zProps.className)}>
      {zProps.items.map((value, index) => {
        return (
          <li key={index}>
            <Link to={value.href}>
              {value.value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
