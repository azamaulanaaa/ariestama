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
    <div className="overflow-scroll">
      <table className="table-auto border-collapse w-full text-left rounded">
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
    <thead className="bg-gray-300 text-gray-700">
      <tr className="border-b">
        {Object.entries(props.data).map(([key, value]: [string, any]) => (
          <th
            key={key}
            className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
          >
            <h4 className="font-normal leading-none opacity-70">{value}</h4>
          </th>
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
        <tr
          key={index}
          className="even:bg-blue-gray-50/50 hover:bg-blue-gray-50"
          onClick={genHandleClick(data)}
        >
          {props.dataKey.map((key) => {
            let value = data[key];
            if (typeof value == "string" || typeof value == "number")
              value = <p className="font-normal">{value}</p>;

            return (
              <td key={key} className="p-4">
                {value}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default Table;
