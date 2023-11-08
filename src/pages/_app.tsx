import type { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@/components/SessionContext";

import "../global.css";
import Database from "@/libs/Database";
import { AlertsSystemProvider } from "@/components/AlertsSystem";

function MyApp({ Component, pageProps }: AppProps) {
  const supabaseClient = createPagesBrowserClient();
  const database = new Database(supabaseClient);

  return (
    <SessionContextProvider database={database}>
      <AlertsSystemProvider>
        <Component {...pageProps} />
      </AlertsSystemProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
