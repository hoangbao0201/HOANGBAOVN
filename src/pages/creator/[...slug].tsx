// import { useEffect } from "react";
// import { useRouter } from "next/router";

// import { NextPageWithLayout } from "@/pages/_app";
// import MainLayout from "@/components/Layouts/MainLayout";

// interface TestPageProps {}
// const TestPage: NextPageWithLayout<TestPageProps> = () => {
//     const router = useRouter();

//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             router.push(`/creator/test/${1 + 1}`, undefined, { shallow: true });
//         }, 5000);

//         return () => clearTimeout(timeoutId);
//     }, []);
    
//     return (
//         <div>
//             <input className="py-2 px-3 rounded-md border" />
//         </div>
//     );
// };

// export default TestPage;

// TestPage.getLayout = (page) => {
//     return <MainLayout>{page}</MainLayout>;
// };

import { GetServerSideProps } from "next";

import { ParsedUrlQuery } from "querystring";
import { NextPageWithLayout } from "@/pages/_app";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";
import MainLayout from "@/components/Layouts/MainLayout";
import FormEditBlog from "@/components/modules/Create/FormEditBlog";
import blogService, { GetBlogEditProps } from "@/lib/services/blog.service";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setBlogEditRDHandle, setIsSaveBlogEditRDHandle } from "@/redux/blogEditSlide";

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}

interface EditBlogPageProps {
    // blog?: GetBlogEditProps
    // slug: string
}
const EditBlogPage: NextPageWithLayout<EditBlogPageProps> = ({  }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { slug } = router.query as { slug: string | string[] };
    const { data: session, status } = useSession();
    const handleGetDataBlog = async (blogId: string) => {
        if(status !== "authenticated") {
            return;
        }
        try {
            const { success, blog } = await blogService.getBlogEdit(blogId, session?.backendTokens.accessToken);

            if(success) {
                dispatch(setBlogEditRDHandle(blog));
            }
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        if(router.query) {
            if(Array.isArray(slug)) {
                if(slug[0] === "post" && slug[2] === "edit") {
                    handleGetDataBlog(slug[1]);
                    console.log(slug[1])
                }
                else {
                    dispatch(setBlogEditRDHandle(null));
                    dispatch(setIsSaveBlogEditRDHandle(false));
                }
            }
        }
    }, [router, status])

    return (
        <>
            {slug && (<FormEditBlog isEdit={slug[0] === "post" && slug[2] === "edit"}/>)}
        </>
    );
};

export default EditBlogPage;

EditBlogPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

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

