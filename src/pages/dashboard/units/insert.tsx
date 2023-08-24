import { Card, CardBody, Typography } from '@material-tailwind/react';

import useLayout from '@/components/Layout';
import ProtectedPage from '@/components/ProtectedPage';
import { useSessionContext } from '@/components/SessionContext';
import Config from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InsertUnitForm, { InsertUnitData } from '@/components/InsertUnitForm';

const InsertCompany = () => {
    const session = useSessionContext();
    const { useAlertsSystem } = useLayout().dashboard();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (data: InsertUnitData) => {
        setLoading(true);
        if (!session.user) {
            useAlertsSystem({
                kind: 'add',
                id: new Date().toString(),
                type: 'error',
                message: 'Unauthorize user.',
            });
            setLoading(false);
            return;
        }

        const result = await session.database.unit.insert({
            user_id: session.user.id,
            extra: {},
            ...data,
        });
        if (result.error == null) {
            useAlertsSystem({
                kind: 'add',
                id: new Date().toString(),
                type: 'success',
                message: 'Insert a unit successful.',
            });
            router.push(Config.Url.Dashboard + '/units');
        } else {
            useAlertsSystem({
                kind: 'add',
                id: new Date().toString(),
                type: 'error',
                message: result.error.text,
            });
            setLoading(false);
        }
    };

    return (
        <ProtectedPage
            hasAccess={session.user?.permission.unit_insert == true}
            isReady={session.user !== undefined && !loading}
            redirectUrl={Config.Url.Dashboard}
        >
            <Card>
                <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <Typography variant="h3" as="h1" color="blue-gray">
                            Insert Unit
                        </Typography>
                    </div>
                    <InsertUnitForm onSubmit={handleSubmit} />
                </CardBody>
            </Card>
        </ProtectedPage>
    );
};

export default InsertCompany;
