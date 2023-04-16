import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@/components/SessionContext';

import '../global.css';
import Database from '@/libs/Database';

function MyApp({ Component, pageProps }: AppProps) {
    const supabaseClient = createBrowserSupabaseClient();
    const database = new Database(supabaseClient);

    return (
        <SessionContextProvider database={database}>
            <Component {...pageProps} />
        </SessionContextProvider>
    );
}

export default MyApp;
