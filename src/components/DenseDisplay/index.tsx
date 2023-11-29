import { ReactNode } from "react";

export type DenseDisplayProps<K = Record<any, ReactNode>> = {
  keys: K;
  values: K;
};

const DenseDisplay = (props: DenseDisplayProps) => {
  return (
    <table className="table">
      <tbody>
        {Object.keys(props.keys).map((key) => (
          <tr key={key}>
            <th data-testid={"key_" + key}>{props.keys[key]}</th>
            <td data-testid={"value_" + key}>{props.values[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DenseDisplay;
