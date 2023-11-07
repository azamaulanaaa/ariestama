import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import Link from 'next/link';
import { HiClipboardList } from 'react-icons/hi';
import { HiBuildingOffice, HiHome, HiPower } from 'react-icons/hi2';

const Sidebar = () => {
    return (
        <Card className="mt-4 w-full max-w-[18rem]">
            <List>
                <Link href="/dashboard" passHref legacyBehavior>
                    <ListItem>
                        <ListItemPrefix>
                            <HiHome />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>
                <Link href="/dashboard/companies" passHref legacyBehavior>
                    <ListItem>
                        <ListItemPrefix>
                            <HiBuildingOffice />
                        </ListItemPrefix>
                        Companies
                    </ListItem>
                </Link>
                <Link href="/dashboard/units" passHref legacyBehavior>
                    <ListItem>
                        <ListItemPrefix>
                            <HiClipboardList />
                        </ListItemPrefix>
                        Units
                    </ListItem>
                </Link>
                <Link href="/signout" passHref legacyBehavior>
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
