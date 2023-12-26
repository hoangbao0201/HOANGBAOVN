import { NextPageWithLayout } from "./_app";
import MainLayout from "@/components/Layouts/MainLayout";

interface ErrorPageProps { statusCode: number }
const ErrorPage: NextPageWithLayout = ({ statusCode }: any) => {

    return (
        <div className="min-h-fit max-w-7xl px-4 py-5 my-4 mx-auto rounded-md bg-white shadow-sm flex items-center justify-center">
            Error Page {statusCode}
        </div>
    )
}

export default ErrorPage;

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

ErrorPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};