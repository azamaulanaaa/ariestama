import { ReactNode } from "react";

export type DenseDisplayData<K extends string> = {
  [key in K]: ReactNode;
};

export type DenseDisplayVariant = "row" | "column";

export type DenseDisplayProps<K extends string> = {
  variant?: DenseDisplayVariant;
  data: DenseDisplayData<K>;
};

const DenseDisplay = (props: DenseDisplayProps<string>) => {
  switch (props.variant) {
    case "column":
      return (
        <table className="w-full">
          <tbody className="flex flex-wrap">
            {Object.entries(props.data).map(([key, value]) => (
              <tr className="flex grow-0 shrink flex-col lg:basis-1/3 md:basis-1/2 sm:basis-full border-b-[1px]">
                <th
                  data-testid="key"
                  className="w-full text-left font-normal text-gray-500"
                >
                  {key}
                </th>
                <td
                  data-testid="value"
                  className="flex grow shrink text-left font-normal"
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "row":
    default:
      return (
        <table className="w-full">
          <tbody className="flex flex-wrap">
            {Object.entries(props.data).map(([key, value]) => (
              <tr
                className="flex grow-0 lg:basis-1/2 sm:basis-full border-b-[1px]"
                key={key}
              >
                <th
                  data-testid="key"
                  className="lg:w-[200px] md:w-[200px] sm:w-[100px] text-left font-normal text-gray-500"
                >
                  {key}
                </th>
                <td
                  data-testid="value"
                  className="flex grow shrink text-left font-normal"
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
};

export default DenseDisplay;
