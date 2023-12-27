import {
    GetStaticPaths,
    GetStaticProps,
    Metadata,
    ResolvingMetadata,
} from "next";

import siteMetadata from "@/lib/siteMetadata";
import commentService, {
    GetCommentsProps,
} from "@/lib/services/comment.service";
import { Toc } from "@/types";
import { NextPageWithLayout } from "../_app";
import { ParsedUrlQuery } from "querystring";
import MainLayout from "@/components/Layouts/MainLayout";
import { MDXSource } from "@/components/common/MDXSource/MDXSource";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";
import blogService, { GetBlogDetailProps } from "@/lib/services/blog.service";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarLeftBlogDetail from "@/components/modules/Blog/SideLeftBlogDetail";
import SidebarRightBlogDetail from "@/components/modules/Blog/SideRightBlogDetail";

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}
interface BlogDetailPageProps {
    toc: Toc;
    blog: GetBlogDetailProps;
    comments: GetCommentsProps[];
}

const BlogDetailPage: NextPageWithLayout<BlogDetailPageProps> = ({
    blog,
    toc,
    comments
}) => {

    return (
        <>
            <div className="max-w-7xl w-full min-h-screen mx-auto mb-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-1 xl:block hidden pt-3">
                        <SidebarLeftBlogDetail />
                    </div>

                    <div className="lg:col-span-8 col-span-full pt-3">
                        {blog && comments ? (
                            <ContentBlogDetail
                                blog={blog}
                                comments={comments}
                                content={blog.content}
                            />
                        ) : (
                            <SkeletonCardBlog count={3} />
                        )}
                    </div>

                    <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3 md:block hidden">
                        <SidebarRightBlogDetail toc={toc} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetailPage;

BlogDetailPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slugBlog } = context.params as Params;
    const { blog } = await blogService.getBlogDetail({
        query: slugBlog,
    });
    const { comments } = await commentService.getComments({
        query: `?blogId=${slugBlog.replace(/.*[^0-9]/, "")}`,
    });

    const { content, toc } = await MDXSource({ source: blog.content });

    return {
        props: {
            blog: {
                ...blog,
                content
            },
            toc,
            comments: comments || []
        },
        // revalidate: 3*60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};
