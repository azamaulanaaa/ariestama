import { Database, Session, AuthError } from "@/services/database";
import { useEffect, useState } from "react";

const useUserSession = (database: Database) => {
  const [session, setSession] = useState<
    | {
        data: {
          session: Session;
        };
        error: null;
      }
    | {
        data: {
          session: null;
        };
        error: AuthError;
      }
    | {
        data: {
          session: null;
        };
        error: null;
      }
    | null
  >(null);

  useEffect(() => {
    database.auth.getSession().then((result) => {
      setSession(result);
    });
  }, [database]);

  return session;
};

export default useUserSession;
