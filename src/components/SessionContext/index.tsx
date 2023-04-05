import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Session, SupabaseClient, AuthError } from '@supabase/supabase-js';

export interface SessionContext {
    isLoading: boolean;
    session: Session | null;
    error: AuthError | null;
    supabaseClient: SupabaseClient;
}

const SessionContext = createContext<SessionContext>({
    isLoading: true,
    session: null,
    error: null,
    supabaseClient: {} as any,
});

export interface SessionProviderProps {
    children: ReactNode;
    supabaseClient: SupabaseClient;
}

export const SessionContextProvider = (props: SessionProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<AuthError | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const result = await props.supabaseClient.auth.getSession();
            setSession(result.data.session);
            setError(result.error);
            setIsLoading(false);
        };

        getSession();

        // NOTE: this state change is untested
        const {
            data: { subscription },
        } = props.supabaseClient.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = {
        isLoading,
        session,
        error,
        supabaseClient: props.supabaseClient,
    };

    return (
        <SessionContext.Provider value={value}>
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