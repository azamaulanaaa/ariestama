import { ReactNode } from 'react';
import Header from './header';
import Sidebar from './sidebar';

interface LayoutDashboardProps {
    children: ReactNode;
}

const LayoutDashboard = (props: LayoutDashboardProps) => {
    return (
        <>
            <Header />
            <div className="flex flex-row">
                <Sidebar className="w-[150px]" />
                <div className="p-2 flex-auto">{props.children}</div>
            </div>
        </>
    );
};

export default LayoutDashboard;
