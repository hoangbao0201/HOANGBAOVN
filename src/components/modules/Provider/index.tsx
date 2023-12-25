import React from "react";
import { SessionProvider } from "next-auth/react";

import store from "@/redux/store";

import { Provider } from "react-redux";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import SocketProvider from "./SocketProvider";


export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ProgressBar
                options={{ showSpinner: false }}
            />
            <SocketProvider>
                <SessionProvider>
                    <Provider store={store}>{children}</Provider>
                </SessionProvider >
            </SocketProvider>
        </>
    );
}
