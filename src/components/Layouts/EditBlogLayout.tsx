import { ReactNode } from "react";
import { NextPageWithLayout } from "@/pages/_app";

interface EditBlogLayoutProps {
    children: ReactNode
}
const EditBlogLayout: NextPageWithLayout<EditBlogLayoutProps> = ({ children }) => {

    return (
        <main className="min-h-screen">
            {children}
        </main>
    )
}

export default EditBlogLayout;