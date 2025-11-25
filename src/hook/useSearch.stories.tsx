import { Story, StoryDefault } from "@ladle/react";
import { ChangeEventHandler, useState } from "react";

import { SearchItem, useSearch } from "./useSearch.ts";

export default {
  title: "Hook / useSearch",
} as StoryDefault;

type BasicProps = {
  items: Array<{ value: string } & SearchItem>;
};

export const Basic: Story<BasicProps> = (props) => {
  const [query, setQuery] = useState("");
  const filteredItem = useSearch(query, props.items);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    setQuery(target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <input className="input" value={query} onChange={handleInputChange} />
      <textarea
        className="textarea"
        value={JSON.stringify(filteredItem)}
        readOnly
      />
    </div>
  );
};

Basic.args = {
  items: [
    { value: "Antoni Yoshua", keywords: ["wrestler"] },
    { value: "Khabib Junior", keywords: ["footballer"] },
  ],
};
