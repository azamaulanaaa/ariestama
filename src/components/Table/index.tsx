import { ReactNode } from 'react';
import { Typography } from '@material-tailwind/react';

export interface TableHeader {
    [key: string]: string;
}

export interface TableData {
    [key: string]: ReactNode;
}

export interface TableProps {
    headers: TableHeader;
    items: TableData[];
}

const Table = (props: TableProps) => {
    return (
        <table className="table-auto border-collapse w-full">
            <TableHeader data={props.headers} />
            <TableBody
                data={props.items}
                dataKey={Object.keys(props.headers)}
            />
        </table>
    );
};

interface TableHeaderProps {
    data: TableHeader;
}

const TableHeader = (props: TableHeaderProps) => {
    return (
        <thead className="bg-gray-200 text-gray-700">
            <tr className="border-b">
                {Object.entries(props.data).map(([key, value]) => (
                    <th
                        key={key}
                        className="p-4 first:pl-6 last:pr-6 text-left"
                    >
                        <Typography variant="h6" as="span">
                            {value}
                        </Typography>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

interface TableBodyProps {
    data: TableData[];
    dataKey: string[];
}

const TableBody = (props: TableBodyProps) => {
    return (
        <tbody>
            {props.data.map((data, index) => (
                <tr key={index} className="border-y hover:bg-gray-50">
                    {props.dataKey.map((key) => (
                        <td key={key} className="p-4 first:pl-6 last:pr-6">
                            {data[key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default Table;
