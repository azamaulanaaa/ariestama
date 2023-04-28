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
        serial_number: 'Nomor Seri',
        brand: 'Merek',
        oem: 'OEM',
        yom: 'Tahun Dibuat',
        made_in: 'Negara Pembuat',
    };

    return (
        <Table headers={headers} items={props.items} onClick={props.onClick} />
    );
};

export default UnitsTable;
