import { Card, CardBody } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import LayoutDashboard from '@/components/layout/dashboard';
import ProtectedContent from '@/components/ProtectedContent';
import { useSessionContext } from '@/components/SessionContext';
import UnitsTable, { UnitsItemData } from '@/components/UnitsTable';
import Config from '@/config';

function Units() {
    const session = useSessionContext();

    const [items, setItems] = useState<UnitsItemData[]>([]);

    useEffect(() => {
        if (session.userPermission?.read_unit == true)
            session.database.unit.list().then((items) => {
                if (items.data) {
                    setItems(items.data);
                }
            });
    }, [session]);

    return (
        <ProtectedContent
            hasAccess={session.userPermission?.read_unit == true}
            isReady={session.userPermission != null}
            redirectUrl={Config.Url.Dashboard}
        >
            <LayoutDashboard>
                <Card>
                    <CardBody>
                        <UnitsTable items={items} />
                    </CardBody>
                </Card>
            </LayoutDashboard>
        </ProtectedContent>
    );
}

export default Units;
