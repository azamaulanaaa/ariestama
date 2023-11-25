import type { AppProps } from "next/app";

import "@/assets/global.css";
import { SessionContextProvider } from "@/contexts/Session";
import { AlertsContextProvider, useAlertsContext } from "@/contexts/Alerts";
import Toasts from "@/features/notification/Toasts/toasts";
import { newDatabase } from "@/services/database";

function MyApp({ Component, pageProps }: AppProps) {
  const database = newDatabase();

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
