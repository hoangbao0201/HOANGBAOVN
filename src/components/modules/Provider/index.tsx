import React from "react";

import store from "@/redux/store";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

import { Provider } from "react-redux";
import SocketProvider from "./SocketProvider";
import { Router } from "next/router";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });


export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SocketProvider>
                <Provider store={store}>{children}</Provider>
            </SocketProvider>
        </>
    );
}
