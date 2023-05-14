import Table, { TableData } from '@/components/Table';

export interface UnitsItemData {
    serial_number: string;
    brand: string;
    oem: string;
    yom: number;
    made_in: string;
}

export interface UnitsTableProps {
    items: UnitsItemData[];
    onClick?: (itemData: TableData<keyof UnitsItemData>) => void;
}

const UnitsTable = (props: UnitsTableProps) => {
    const headers = {
        serial_number: 'Serial Number',
        brand: 'Brand',
        oem: 'Original Equipment Manufacture',
        yom: 'Year of Manufacture',
        made_in: 'Made In',
    };

    return (
        <Table headers={headers} items={props.items} onClick={props.onClick} />
    );
};

export default UnitsTable;
