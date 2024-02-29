import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "next-themes";
import ProviderLayout from "@/components/modules/Provider";
import Script from "next/script";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <>
            <ThemeProvider enableSystem={true} attribute="class">
                <SessionProvider session={session}>
                    <ProviderLayout>{getLayout(<Component {...pageProps} />)}</ProviderLayout>
                </SessionProvider>
            </ThemeProvider>
            {/* <Script src="https://www.vipads.live/vn/c-1617-25.js"/>
            <Script src="https://www.vipads.live/vn/EFF4FF30-11AB-1616-34-2A67A3A2C929.blpha"></Script>
            <Script src="https://www.vipads.live/vn/F561911C-8062-1620-33-FD1887418F0D.blpha"></Script> */}
        </>
    );
}
