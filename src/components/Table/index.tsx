import { MouseEvent, ReactNode } from "react";

export type TableData<K extends string> = {
  [key in K]: ReactNode;
};

export type TableHeader<K extends string> = Partial<TableData<K>>;

export interface TableProps<K extends string> {
  headers: TableHeader<K>;
  items: TableData<K>[];
  onClick?: (data: TableData<K>) => void;
}

const Table = <K extends string>(props: TableProps<K>) => {
  return (
    <div className="overflow-x-scroll">
      <table className="table">
        <TableHeader data={props.headers} />
        <TableBody
          data={props.items}
          dataKey={Object.keys(props.headers) as K[]}
          onClick={props.onClick}
        />
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
  onClick?: (data: TableData<K>) => void;
}

const TableBody = <K extends string>(props: TableBodyProps<K>) => {
  const genHandleClick = (data: TableData<K>) => {
    return (_: MouseEvent<HTMLTableRowElement>) => {
      if (!props.onClick) return;
      props.onClick(data);
    };
  };

  return (
    <tbody className="cursor-pointer">
      {props.data.map((data, index) => (
        <tr key={index} onClick={genHandleClick(data)} className="hover">
          {props.dataKey.map((key) => {
            return <td key={key}>{data[key]}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default Table;
