import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import useLayout from '@/components/Layout';
import ProtectedContent from '@/components/ProtectedContent';
import { useSessionContext } from '@/components/SessionContext';
import UnitsTable, { UnitsItemData } from '@/components/UnitsTable';
import Config from '@/config';

function Units() {
    const session = useSessionContext();
    useLayout().dashboard();

    const [items, setItems] = useState<UnitsItemData[]>([]);

    useEffect(() => {
        if (session.user?.permission.unit_read == true)
            session.database.unit.list().then((items) => {
                if (items.data) {
                    setItems(items.data);
                }
            });
    }, [session]);

    return (
        <ProtectedContent
            hasAccess={session.user?.permission.unit_read == true}
            isReady={session.user != undefined}
            redirectUrl={Config.Url.Dashboard}
        >
            <Card>
                <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <Typography variant="h3" as="h1" color="blue-gray">
                            Units
                        </Typography>
                        <Link
                            href="/dashboard/units/insert"
                            passHref
                            legacyBehavior
                        >
                            <Button size="md" variant="gradient">
                                Insert
                            </Button>
                        </Link>
                    </div>
                    <UnitsTable items={items} />
                </CardBody>
            </Card>
        </ProtectedContent>
    );
}

export default Units;
