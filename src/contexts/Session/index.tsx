import { createContext, ReactNode, useContext } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/services/database/supabase";

export type Session = {
  database: SupabaseClient<Database>;
};

const SessionContext = createContext<Session>({} as Session);

export interface SessionProviderProps {
  children: ReactNode;
  database: SupabaseClient<Database>;
}

export const SessionContextProvider = (props: SessionProviderProps) => {
  return (
    <SessionContext.Provider
      value={{
        database: props.database,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
