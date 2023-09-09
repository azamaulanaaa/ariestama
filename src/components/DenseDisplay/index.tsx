import { ReactNode } from "react";

export type DenseDisplayVariant = "row" | "column";

export type DenseDisplayProps<K = Record<any, ReactNode>> = {
  variant?: DenseDisplayVariant;
  keys: K;
  values: K;
};

const DenseDisplay = (props: DenseDisplayProps) => {
  switch (props.variant) {
    case "column":
      return (
        <table className="w-full">
          <tbody className="flex flex-wrap">
            {Object.keys(props.keys).map((key) => (
              <tr
                key={key}
                className="flex grow-0 shrink flex-col lg:basis-1/3 md:basis-1/2 sm:basis-full border-b-[1px]"
              >
                <th
                  data-testid={"key_" + key}
                  className="w-full text-left font-normal text-gray-500"
                >
                  {props.keys[key]}
                </th>
                <td
                  data-testid={"value_" + key}
                  className="flex grow shrink text-left font-normal"
                >
                  {props.values[key]}
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
            {Object.keys(props.keys).map((key) => (
              <tr
                key={key}
                className="flex grow-0 lg:basis-1/2 sm:basis-full border-b-[1px]"
              >
                <th
                  data-testid={"key_" + key}
                  className="lg:w-[200px] md:w-[200px] sm:w-[100px] text-left font-normal text-gray-500"
                >
                  {props.keys[key]}
                </th>
                <td
                  data-testid={"value_" + key}
                  className="flex grow shrink text-left font-normal"
                >
                  {props.values[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
};

export default DenseDisplay;
