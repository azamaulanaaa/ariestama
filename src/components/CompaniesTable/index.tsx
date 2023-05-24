import Table, { TableData } from '@/components/Table';

export interface CompaniesItemData {
    id: string;
    name: string;
    branch: string;
    city: string;
    province: string;
}

export interface CompaniesTableProps {
    items: CompaniesItemData[];
    onClick?: (itemData: TableData<keyof CompaniesItemData>) => void;
}

const CompaniesTable = (props: CompaniesTableProps) => {
    const headers = {
        name: 'Name',
        branch: 'Branch',
        city: 'City',
        province: 'Province',
    };

    return (
        <Table headers={headers} items={props.items} onClick={props.onClick} />
    );
};

export default CompaniesTable;
