import { useEffect, useState } from "react";

import Config from "@/config";
import DefaultLayout from "@/layout/Default";
import { useSessionContext } from "@/contexts/Session";
import { useAlertsContext } from "@/contexts/Alerts";
import ProtectedPage from "@/features/authentication/ProtectedPage";

const SignOutPage = () => {
  const session = useSessionContext();
  const alerts = useAlertsContext();

  const [ready, setReady] = useState<boolean>(false);

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
        setReady(true);
      }
    });
  }, []);

  return (
    <ProtectedPage
      redirectUrl={Config.Url.SignIn}
      hasAccess={false}
      isReady={ready}
    >
      <DefaultLayout>
        <div className="h-screen"></div>
      </DefaultLayout>
    </ProtectedPage>
  );
};

export default SignOutPage;
