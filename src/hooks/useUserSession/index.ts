import { Database, Session, AuthError } from "@/services/database";
import { Database as DatabaseRaw } from "@/services/database/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useUserSession = (database: Database) => {
  const [isReady, setIsReady] = useState<boolean>(false);

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

  const [permission, setPermission] = useState<{
    data: DatabaseRaw["public"]["Tables"]["user_permission"]["Row"] | null;
    error: PostgrestError | null;
  } | null>(null);

  useEffect(() => {
    database.auth.getSession().then((result) => {
      setSession(result);

      if (result.data.session) {
        database
          .from("user_permission")
          .select()
          .eq("id", result.data.session.user.id)
          .then((result) => {
            if (result.data && result.data.length > 0) {
              setPermission({ data: result.data[0], error: result.error });
            } else {
              setPermission({ data: null, error: result.error });
            }
          });
      }

      setIsReady(true);
    });
  }, [database]);

  return { session, permission, isReady };
};

export default useUserSession;
