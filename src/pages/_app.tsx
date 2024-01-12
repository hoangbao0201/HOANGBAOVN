import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "next-themes";
import ProviderLayout from "@/components/modules/Provider";


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
        </>
    );
}
