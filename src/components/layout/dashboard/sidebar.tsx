import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { HiClipboardList } from 'react-icons/hi';
import { HiBuildingOffice, HiHome, HiPower } from 'react-icons/hi2';

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
        <Card className="mt-4 w-full max-w-[18rem]">
            <List>
                <Link href="/dashboard" passHref>
                    <ListItem>
                        <ListItemPrefix>
                            <HiHome />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>
                <Link href="/dashboard/companies" passHref>
                    <ListItem>
                        <ListItemPrefix>
                            <HiBuildingOffice />
                        </ListItemPrefix>
                        Companies
                    </ListItem>
                </Link>
                <Link href="/dashboard/units" passHref>
                    <ListItem>
                        <ListItemPrefix>
                            <HiClipboardList />
                        </ListItemPrefix>
                        Units
                    </ListItem>
                </Link>
                <Link href="/signout" passHref>
                    <ListItem>
                        <ListItemPrefix>
                            <HiPower />
                        </ListItemPrefix>
                        Sign out
                    </ListItem>
                </Link>
            </List>
        </Card>
    );
};

export default Sidebar;
