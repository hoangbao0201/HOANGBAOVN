import MainLayout from "@/components/Layouts/MainLayout";
import { NextPageWithLayout } from "../_app";

interface ToolPageProps {}
const ToolPage: NextPageWithLayout<ToolPageProps> = () => {

    return (
        <div className="max-w-7xl w-full min-h-screen mx-auto px-4">
            <div>Tool</div>
        </div>
    )
}

export default ToolPage;

ToolPage.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}