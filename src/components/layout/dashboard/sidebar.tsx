import { Card, CardBody, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ItemProps {
    children?: ReactNode;
    href: string;
}

const Item = (props: ItemProps) => {
    return (
        <li>
            <Link
                href={props.href}
                className="block p-2 hover:border hover:bg-gray-200"
            >
                <Typography>{props.children}</Typography>
            </Link>
        </li>
    );
};

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
    return (
        <div className="w-[200px] pt-4">
            <Card className="w-[200px]">
                <CardBody>
                    <ul className="flex flex-col">
                        <Item href="/dashboard">Dashboard</Item>
                        <Item href="/dashboard/units">Units</Item>
                        <Item href="/signout">Sign out</Item>
                    </ul>
                </CardBody>
            </Card>
        </div>
    );
};

export default Sidebar;
