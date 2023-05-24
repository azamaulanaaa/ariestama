import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useLayout from '@/components/Layout';
import ProtectedContent from '@/components/ProtectedContent';
import { useSessionContext } from '@/components/SessionContext';
import CompaniesTable, { CompaniesItemData } from '@/components/CompaniesTable';
import type { Company } from '@/libs/Database';
import Config from '@/config';

function Companies() {
    const session = useSessionContext();
    useLayout().dashboard();

    const router = useRouter();

    const [items, setItems] = useState<CompaniesItemData[]>([]);

    useEffect(() => {
        if (session.user?.permission.company_read == true)
            session.database.company.gets().then((items) => {
                if (items.data) {
                    setItems(items.data);
                }
            });
    }, [session]);

    const handleClick = (data: Company) => {
        if (!router.isReady) return;
        router.push({
            pathname: '/dashboard/companies/view',
            query: { id: data.id },
        });
    };

    return (
        <ProtectedContent
            hasAccess={session.user?.permission.company_read == true}
            isReady={session.user != undefined && router.isReady}
            redirectUrl={Config.Url.Dashboard}
        >
            <Card>
                <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <Typography variant="h3" as="h1" color="blue-gray">
                            Companies
                        </Typography>
                        <Link
                            href="/dashboard/companies/insert"
                            passHref
                            legacyBehavior
                        >
                            <Button size="md" variant="gradient">
                                Insert
                            </Button>
                        </Link>
                    </div>
                    <CompaniesTable items={items} onClick={handleClick} />
                </CardBody>
            </Card>
        </ProtectedContent>
    );
}

export default Companies;
