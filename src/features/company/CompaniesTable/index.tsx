import Table, { TableData } from "@/components/Table";
import ViewButton from "./view_button";

export interface CompaniesItemData {
  id: string;
  name: string;
  branch: string;
  city: string;
  province: string;
  view_url: string;
}

export interface CompaniesTableProps {
  items: CompaniesItemData[];
  onClick?: (itemData: TableData<keyof CompaniesItemData>) => void;
}

const CompaniesTable = (props: CompaniesTableProps) => {
  const headers = {
    name: "Name",
    branch: "Branch",
    city: "City",
    province: "Province",
    view_url: "",
  };

  const items = props.items.map((item) => ({
    ...item,
    view_url: <ViewButton href={item.view_url} />,
  }));

  return <Table data-testid="CompaniesTable" headers={headers} items={items} />;
};

export default CompaniesTable;
