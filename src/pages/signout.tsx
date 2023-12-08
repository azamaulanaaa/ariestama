import { useEffect, useState } from "react";

import Config from "@/config";
import DefaultLayout from "@/layout/Default";
import { useSessionContext } from "@/contexts/Session";
import { useAlertsContext } from "@/contexts/Alerts";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import Loading from "@/features/authentication/Loading";

const SignOutPage = () => {
  const session = useSessionContext();
  const alerts = useAlertsContext();

  const [hasAccess, setHasAccess] = useState<boolean>(true);

  useEffect(() => {
    session.database.auth.signOut().then(({ error }) => {
      if (error) {
        alerts.dispatch({
          kind: "add",
          id: Date.now().toString(),
          type: "error",
          message: error.message,
        });
      } else {
        setHasAccess(false);
      }
    });
  }, []);

  return (
    <ProtectedPage redirectUrl={Config.Url.SignIn} hasAccess={hasAccess}>
      <DefaultLayout>
        <Loading isLoading={true}>
          <div className="h-screen grid place-items-center"></div>
        </Loading>
      </DefaultLayout>
    </ProtectedPage>
  );
};

export default SignOutPage;
