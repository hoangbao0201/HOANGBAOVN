import { ReactNode } from "react"
import Footer from "../partials/footer"
import Header from "../partials/header"

interface MainLayoutProps {
    children: ReactNode
    isHeaderDynamic?: boolean
}
const MainLayout = ({ children, isHeaderDynamic = true }: MainLayoutProps) => {

    return (
        <>
            <Header isDynamic={isHeaderDynamic}/>
            <main className={``}>
                {children}
            </main>
            <Footer />
        </> 
    )
}

export default MainLayout;