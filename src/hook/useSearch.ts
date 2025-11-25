import { z } from "zod";
import Fuse from "fuse.js";
import { useMemo } from "react";

export type SearchItem<
  K extends string = string,
> = {
  keywords: Array<K>;
};

const itemSchema = z.object({
  keywords: z.array(z.string()),
}).loose() as z.ZodType<SearchItem>;

const paramsSchema = z.object({
  query: z.string(),
  items: z.array(itemSchema),
});

export function useSearch<I extends SearchItem>(
  query: string,
  items: Array<I>,
) {
  const zProps = paramsSchema.parse({ query, items });

  const fuse = useMemo(
    () => {
      return new Fuse(zProps.items, { keys: ["keywords"] });
    },
    [zProps.items],
  );

  const filteredItem = useMemo(() => {
    if (query.length == 0) {
      return zProps.items;
    }

    const result = fuse.search(query);
    const filteredItem = result.map((value) => value.item);

    return filteredItem;
  }, [query]);

  return filteredItem;
}
