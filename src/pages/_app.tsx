import type { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import "@/assets/global.css";
import Database from "@/services/database";
import { SessionContextProvider } from "@/contexts/Session";
import { AlertsContextProvider, useAlertsContext } from "@/contexts/Alerts";
import Toasts from "@/features/notification/Toasts/toasts";

function MyApp({ Component, pageProps }: AppProps) {
  const supabaseClient = createPagesBrowserClient();
  const database = new Database(supabaseClient);

  return (
    <SessionContextProvider database={database}>
      <AlertsContextProvider>
        <Component {...pageProps} />
        <Toasted />
      </AlertsContextProvider>
    </SessionContextProvider>
  );
}

function Toasted() {
  const alert = useAlertsContext();

  const toastsData = alert.state.map((data) => ({
    autoCloseDuration: 5000,
    onClose: () => {
      alert.dispatch({ kind: "remove", id: data.id });
    },
    ...data,
  }));

  return <Toasts data={toastsData} />;
}

export default MyApp;
