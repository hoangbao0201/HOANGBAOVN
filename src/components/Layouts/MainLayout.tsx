import { ReactNode } from "react"
import Footer from "../partials/footer"
import Header from "../partials/header"

interface MainLayoutProps {
    children: ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {

    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </> 
    )
}

export default MainLayout;