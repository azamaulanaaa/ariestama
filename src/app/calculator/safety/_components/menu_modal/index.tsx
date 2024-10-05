import { z } from "zod";

export const MenuModalPropsSchema = z.object({}).optional();

const MenuModal = (props: z.input<typeof MenuModalPropsSchema>) => {};

export default MenuModal;
