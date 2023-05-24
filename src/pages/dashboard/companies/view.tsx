import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ProtectedContent from '@/components/ProtectedContent';
import { useSessionContext } from '@/components/SessionContext';
import useLayout from '@/components/Layout';
import CompanyView from '@/components/CompanyView';
import type { Company } from '@/libs/Database';
import Config from '@/config';

const Dashboard = () => {
    const session = useSessionContext();
    useLayout().dashboard();
    const router = useRouter();

    const [companyData, setCompanyData] = useState<Company>({} as any);

    useEffect(() => {
        if (session.user?.permission.company_read == true && router.isReady) {
            const { id: query_id } = router.query;

            let id = query_id as string;
            if (query_id == undefined) return;
            if (Array.isArray(query_id[0])) id = query_id[0];

            session.database.company.getsById(id).then((items) => {
                if (items.data) {
                    setCompanyData(items.data[0]);
                }
            });
        }
    }, [session]);

    return (
        <ProtectedContent
            hasAccess={session.user != null}
            isReady={
                session.user != undefined &&
                companyData != ({} as any) &&
                router.isReady
            }
            redirectUrl={Config.Url.SignIn}
        >
            <CompanyView {...companyData} />
        </ProtectedContent>
    );
};

export default Dashboard;
