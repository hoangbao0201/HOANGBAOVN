import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { ParsedUrlQuery } from "querystring";

import { NextPageWithLayout } from "@/pages/_app";
import CardBlog from "@/components/common/CardBlog";
import MainLayout from "@/components/Layouts/MainLayout";
import blogService, { GetBlogsProps } from "@/lib/services/blog.service";
import SideLeftTagDetail from "@/components/modules/Tag/SideLeftTagDetail";
import SideRightTagDetail from "@/components/modules/Tag/SideRightTagDetail";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}

interface TagDetailPageProps {
    blogs: GetBlogsProps[]
}
const TagDetailPage: NextPageWithLayout<TagDetailPageProps> = ({ blogs }) => {

    return (
        <div className="max-w-7xl w-full min-h-screen mx-auto mb-4">
            <div className="grid grid-cols-12">
                <div className="col-span-2 pt-3 h-full hidden xl:block">
                    <SideLeftTagDetail />
                </div>
                <div className="xl:col-span-7 lg:col-span-8 col-span-full pt-3">
                    {blogs && blogs.length > 0 ? (
                        <>
                            {
                                blogs.map((blog, index) => {
                                    return (
                                        <Fragment key={blog.blogId}>
                                            <CardBlog blog={blog} />
                                        </Fragment>
                                    );
                                })
                            }
                        </>
                    ) : (
                        <SkeletonCardBlog count={3} />
                    )}
                </div>
                <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3 h-full">
                    <SideRightTagDetail />
                </div>
            </div>
        </div>
    );
};

export default TagDetailPage;

TagDetailPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slugTag } = context.params as Params;
    const { blogs } = await blogService.getAllBlogs({ query: `?tag=${slugTag}` });

    return {
        props: {
            blogs: blogs || []
        },
        revalidate: 24*60*60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};
