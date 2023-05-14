import { ReactNode } from 'react';

import { useAlertsSystem, AlertsSystemProvider } from './alerts_system';
import Header from './header';
import Sidebar from './sidebar';

interface DashboardProps {
    children: ReactNode;
}

const Dashboard = (props: DashboardProps) => {
    return (
        <div className="h-screen">
            <div className="container mx-auto">
                <Header />
                <AlertsSystemProvider>
                    <div className="flex flex-row gap-4">
                        <Sidebar />
                        <div className="pt-4 flex-auto">{props.children}</div>
                    </div>
                </AlertsSystemProvider>
            </div>
        </div>
    );
};

export default Dashboard;
export const config = () => ({
    useAlertsSystem: useAlertsSystem(),
});
