import Link from 'next/link';
import { ReactNode } from 'react';

interface ItemProps {
    children?: ReactNode;
    href?: string;
}

const Item = (props: ItemProps) => {
    return (
        <li>
            <Link href={props.href} className="block p-2 hover:border">
                {props.children}
            </Link>
        </li>
    );
};

interface SidebarProps {
    className: string;
}

const Sidebar = (props: SidebarProps) => {
    return (
        <div {...props}>
            <ul className="flex flex-col">
                <Item href="/dashboard">Dashboard</Item>
                <Item href="/dashboard/company">Company</Item>
                <Item href="/dashboard/unit">Unit</Item>
                <Item href="/dashboard/inspections">Inspections</Item>
            </ul>
        </div>
    );
};

export default Sidebar;
