import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@/components/SessionContext';

import '../global.css';
import Database from '@/libs/Database';
import { LayoutProvider } from '@/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    const supabaseClient = createBrowserSupabaseClient();
    const database = new Database(supabaseClient);

    return (
        <SessionContextProvider database={database}>
            <LayoutProvider>
                <Component {...pageProps} />
            </LayoutProvider>
        </SessionContextProvider>
    );
}

export default MyApp;
