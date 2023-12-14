import { HTMLAttributes, ReactNode } from "react";

type BaseTableProps = Omit<
  HTMLAttributes<HTMLTableElement>,
  "children" | "onClick"
>;

export type TableData<K extends string> = {
  [key in K]: ReactNode;
};

export type TableHeader<K extends string> = Partial<TableData<K>>;

export type TableProps<K extends string> = BaseTableProps & {
  headers: TableHeader<K>;
  items: TableData<K>[];
};

const Table = <K extends string>(props: TableProps<K>) => {
  const { headers, items, ...baseProps } = props;

  return (
    <div className="overflow-x-scroll">
      <table className="table" {...baseProps}>
        <TableHeader data={headers} />
        <TableBody data={items} dataKey={Object.keys(headers) as K[]} />
      </table>
    </div>
  );
};

type TableHeaderProps<K extends string> = {
  data: TableHeader<K>;
};

const TableHeader = <K extends string>(props: TableHeaderProps<K>) => {
  return (
    <thead>
      <tr>
        {Object.entries(props.data).map(([key, value]: [string, any]) => (
          <th key={key}>{value}</th>
        ))}
      </tr>
    </thead>
  );
};

interface TableBodyProps<K extends string> {
  data: TableData<K>[];
  dataKey: K[];
}

const TableBody = <K extends string>(props: TableBodyProps<K>) => {
  return (
    <tbody>
      {props.data.map((data, index) => (
        <tr key={index} className="hover">
          {props.dataKey.map((key) => {
            return <td key={key}>{data[key]}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default Table;
