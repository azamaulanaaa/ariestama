import { Button, Card, CardBody } from '@material-tailwind/react';
import { useEffect, useState, MouseEvent } from 'react';

import useLayout from '@/components/Layout';
import ProtectedContent from '@/components/ProtectedContent';
import { useSessionContext } from '@/components/SessionContext';
import UnitsTable, { UnitsItemData } from '@/components/UnitsTable';
import Config from '@/config';

function Units() {
    const session = useSessionContext();
    const { useAlertsSystem } = useLayout().dashboard();
    const alertSystem = useAlertsSystem();

    const [items, setItems] = useState<UnitsItemData[]>([]);

    useEffect(() => {
        if (session.userPermission?.read_unit == true)
            session.database.unit.list().then((items) => {
                if (items.data) {
                    setItems(items.data);
                }
            });
    }, [session]);

    const handleInsertClick = (_: MouseEvent<HTMLButtonElement>) => {
        alertSystem({
            kind: 'add',
            id: new Date().toString(),
            type: 'success',
            message: 'Hello fellaws,',
        });
    };

    return (
        <ProtectedContent
            hasAccess={session.userPermission?.read_unit == true}
            isReady={session.userPermission != null}
            redirectUrl={Config.Url.Dashboard}
        >
            <Card>
                <CardBody>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between flex-row gap-4">
                            <div></div>
                            <div>
                                <Button onClick={handleInsertClick}>
                                    Insert
                                </Button>
                            </div>
                        </div>
                        <UnitsTable items={items} />
                    </div>
                </CardBody>
            </Card>
        </ProtectedContent>
    );
}

export default Units;
