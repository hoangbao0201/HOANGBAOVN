import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useDispatch } from "react-redux";

import { NextPageWithLayout } from "@/pages/_app";
import blogService from "@/lib/services/blog.service";
import EditBlogLayout from "@/components/Layouts/EditBlogLayout";
import FormEditBlog from "@/components/modules/Create/FormEditBlog";
import {
    setBlogEditRDHandle,
    setIsSaveBlogEditRDHandle,
} from "@/redux/pageEditBlogSlide";

interface EditBlogPageProps {}
const EditBlogPage: NextPageWithLayout<EditBlogPageProps> = ({}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { slug } = router.query as { slug: string | string[] };
    const { data: session, status } = useSession();

    const handleGetDataBlog = async (blogId: string) => {
        if (status !== "authenticated") {
            return;
        }
        try {
            const { success, blog } = await blogService.getBlogEdit(
                blogId,
                session?.backendTokens.accessToken
            );

            if (success) {
                dispatch(setBlogEditRDHandle(blog));
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (router.query) {
            // dispatch(setBlogEditRDHandle(null));
            // dispatch(setIsSaveBlogEditRDHandle(true));
            if (Array.isArray(slug)) {
                if (slug[0] === "post" && slug[2] === "edit") {
                    handleGetDataBlog(slug[1]);
                }
            }
        }
    }, [router, status]);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            if (Array.isArray(slug)) {
                if (slug[0] === "post" && slug[2] === "edit") {
                    dispatch(setBlogEditRDHandle(null));
                    dispatch(setIsSaveBlogEditRDHandle(true));
                }
            }
        };

        // Đăng ký sự kiện routeChangeStart
        router.events.on("routeChangeStart", handleRouteChangeStart);

        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
        };
    }, []);

    return (
        <>
            {slug && (
                <FormEditBlog
                    blogId={+slug[1] || undefined}
                    isEdit={ (slug[0] === "post" && slug[2] === "edit") }
                />
            )}
        </>
    );
};

export default EditBlogPage;

EditBlogPage.getLayout = (page) => {
    return <EditBlogLayout>{page}</EditBlogLayout>;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     // const session = await getServerSession(
//     //     context.req,
//     //     context.res,
//     //     authOptions
//     // );

//     // if (!session) {
//     //     return {
//     //         redirect: {
//     //             destination: "/",
//     //             permanent: false,
//     //         },
//     //     };
//     // }
//     // const { slug } = context.params as Params;
//     // const { success, blog } = await blogService.getBlogEdit(slugBlog, session?.backendTokens.accessToken);
//     // if (!blog) {
//     //     return {
//     //         redirect: {
//     //             destination: "/",
//     //             permanent: false,
//     //         },
//     //     };
//     // }

//     return {
//         props: {
//             // blog: blog || null,
//             // slug: slug
//         },
//     };
// };
