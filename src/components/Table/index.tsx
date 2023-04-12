import { ReactNode } from 'react';

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
        <table>
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
        <thead>
            <tr>
                {Object.entries(props.data).map(([key, value]) => (
                    <th key={key}>{value}</th>
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
                <tr key={index}>
                    {props.dataKey.map((key) => (
                        <td key={key}>{data[key]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default Table;
