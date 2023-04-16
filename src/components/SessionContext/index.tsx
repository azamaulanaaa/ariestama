import { createContext, ReactNode, useContext } from 'react';
import Database from '@/libs/Database';

const SessionContext = createContext<Database>({} as Database);

export interface SessionProviderProps {
    children: ReactNode;
    database: Database;
}

export const SessionContextProvider = (props: SessionProviderProps) => {
    return (
        <SessionContext.Provider value={props.database}>
            {props.children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
};
