import { z } from "zod";
import Fuse, { FuseResult } from "fuse.js";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useMemo,
  useState,
} from "react";

import { cn } from "@/util/classname.ts";

export type Data = {
  title: string;
  keywords: Array<string>;
};

export type SearchBoxProps = {
  classNames?: string;
  placeHolder?: string;
  items: Array<Data>;
  onTitleClick: (title: string) => void;
};

export const SearchBoxPropsSchema = z.object({
  classNames: z.string().optional(),
  placeHolder: z.string().optional(),
  items: z.array(z.object({
    title: z.string(),
    keywords: z.array(z.string()),
  })),
  onTitleClick: z.function({ input: [z.string()], output: z.void() }),
}) as z.ZodType<SearchBoxProps>;

export function SearchBox(props: SearchBoxProps) {
  const zProps = SearchBoxPropsSchema.parse(props);

  const [query, setQuery] = useState("");

  const handleOnQueryChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    setQuery(target.value);
  };

  const fuse = useMemo(
    () => {
      return new Fuse(zProps.items, { keys: ["title", "keywords"] });
    },
    [zProps.items],
  );

  const items = useMemo(() => {
    return fuse.search(query);
  }, [query]);

  const handleOnDataClick: (
    title: string,
  ) => MouseEventHandler<HTMLAnchorElement> = (title) => {
    return (event) => {
      event.preventDefault();

      setQuery(title);
      zProps.onTitleClick(title);
    };
  };

  return (
    <div className={cn("dropdown", zProps.classNames)}>
      <input
        type="text"
        name="search_box"
        className="input w-full"
        tabIndex={0}
        placeholder={zProps.placeHolder}
        value={query}
        onChange={handleOnQueryChange}
      />
      <ul
        className="dropdown-content menu w-full bg-base-100 rounded-b-md shadow-sm"
        tabIndex={-1}
      >
        <Items
          items={items}
          handleOnDataClick={handleOnDataClick}
          queryLength={query.length}
        />
      </ul>
    </div>
  );
}
type ItemsProps = {
  items: Array<FuseResult<Data>>;
  handleOnDataClick: (
    title: string,
  ) => MouseEventHandler<HTMLAnchorElement>;
  queryLength: number;
};

function Items(
  props: ItemsProps,
) {
  if (props.queryLength == 0) {
    return <li className="text-gray-400 text-sm">Start typing..</li>;
  }

  if (props.items.length == 0) {
    return <li className="text-gray-400 text-sm">Not results found</li>;
  }

  return (props.items.map((value, index) => {
    return (
      <li key={index}>
        <a href="#" onClick={props.handleOnDataClick(value.item.title)}>
          {value.item.title}
        </a>
      </li>
    );
  }));
}
