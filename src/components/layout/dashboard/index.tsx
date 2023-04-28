import { ReactNode } from 'react';
import Header from './header';
import Sidebar from './sidebar';

interface LayoutDashboardProps {
    children: ReactNode;
}

const LayoutDashboard = (props: LayoutDashboardProps) => {
    return (
        <div className="h-screen">
            <div className="container mx-auto">
                <Header />
                <div className="flex flex-row">
                    <Sidebar />
                    <div className="p-4 flex-auto">{props.children}</div>
                </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;
