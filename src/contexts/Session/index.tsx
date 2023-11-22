import { createContext, ReactNode, useContext } from "react";
import Database from "@/services/database";
import useUser, { User } from "./useUser";

export type Session = {
  database: Database;
  user: User | null | undefined;
};

const SessionContext = createContext<Session>({} as Session);

export interface SessionProviderProps {
  children: ReactNode;
  database: Database;
}

export const SessionContextProvider = (props: SessionProviderProps) => {
  return (
    <SessionContext.Provider
      value={{
        database: props.database,
        user: useUser(props.database),
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
