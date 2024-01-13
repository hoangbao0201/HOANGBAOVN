import { ReactNode } from "react";
import dynamic from "next/dynamic";

import Footer from "../partials/footer";
import Header from "../partials/header";

const ButtonOnTop = dynamic(() => import("../common/ButtonOnTop"), { ssr: false })

interface MainLayoutProps {
    children: ReactNode;
    isHeaderDynamic?: boolean;
}
const MainLayout = ({ children, isHeaderDynamic = true }: MainLayoutProps) => {
    return (
        <>
            <Header isDynamic={isHeaderDynamic} />
            <main className={``}>{children}</main>
            <Footer />
            <ButtonOnTop />
        </>
    );
};

export default MainLayout;
