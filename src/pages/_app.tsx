import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@/components/SessionContext';

import '../global.css';

function MyApp({ Component, pageProps }: AppProps) {
    const supabaseClient = createBrowserSupabaseClient();

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            <Component {...pageProps} />
        </SessionContextProvider>
    );
}

export default MyApp;
