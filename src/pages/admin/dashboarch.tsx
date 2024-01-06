import AdminLayout from "@/components/Layouts/AdminLayout";
import { NextPageWithLayout } from "../_app";

interface AdminDashboarchPageProps {}
const AdminDashboarchPage: NextPageWithLayout<AdminDashboarchPageProps> = () => {

    return (
        <div>AdminDashboarchPage</div>
    )
}

export default AdminDashboarchPage;

AdminDashboarchPage.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}