import Table from "@/components/Table";
import ViewButton from "./view_button";

export interface UnitsItemData {
  id: string;
  series: string;
  serial_number: string;
  brand: string;
  yom: number;
  made_in: string;
  view_url: string;
}

export interface UnitsTableProps {
  items: UnitsItemData[];
}

const UnitsTable = (props: UnitsTableProps) => {
  const headers = {
    serial_number: "Serial Number",
    series: "Series",
    brand: "Brand",
    yom: "Year of Manufacture",
    made_in: "Made In",
    view_url: "",
  };

  const items = props.items.map((item) => ({
    ...item,
    view_url: <ViewButton href={item.view_url} />,
  }));

  return <Table headers={headers} items={items} />;
};

export default UnitsTable;
