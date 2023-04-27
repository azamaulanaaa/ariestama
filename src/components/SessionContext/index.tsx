import { createContext, ReactNode, useContext } from 'react';
import Database from '@/libs/Database';
import useUserPermission, { UserPermission } from './useUserPermission';

export type Session = {
    database: Database;
    userPermission: UserPermission | null;
};

const SessionContext = createContext<Session>({} as Session);

export interface SessionProviderProps {
    children: ReactNode;
    database: Database;
}

export const SessionContextProvider = (props: SessionProviderProps) => {
    const userPermission = useUserPermission(props.database);
    return (
        <SessionContext.Provider
            value={{
                database: props.database,
                userPermission: userPermission,
            }}
        >
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
