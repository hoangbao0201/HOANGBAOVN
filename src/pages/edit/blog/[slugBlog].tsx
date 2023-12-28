import { GetServerSideProps } from "next";

import { ParsedUrlQuery } from "querystring";
import { NextPageWithLayout } from "@/pages/_app";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";
import MainLayout from "@/components/Layouts/MainLayout";
import FormEditBlog from "@/components/modules/Create/FormEditBlog";
import blogService, { GetBlogEditProps } from "@/lib/services/blog.service";

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}

interface EditBlogPageProps {
    blog: GetBlogEditProps
}
const EditBlogPage: NextPageWithLayout<EditBlogPageProps> = ({ blog }) => {
    return (
        <>
            {blog && (<FormEditBlog blog={blog} />)}
        </>
    );
};

export default EditBlogPage;

EditBlogPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const { slugBlog } = context.params as Params;
    const { success, blog } = await blogService.getBlogEdit(slugBlog, session?.backendTokens.accessToken);
    if (!blog) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            blog: blog
        },
    };
};
