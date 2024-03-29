import { Fragment, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { NextSeo } from "next-seo";
import { ParsedUrlQuery } from "querystring";
import { useDispatch, useSelector } from "react-redux";

import siteMetadata from "@/lib/siteMetadata";
import { NextPageWithLayout } from "@/pages/_app";
import CardBlog from "@/components/common/CardBlog";
import MainLayout from "@/components/Layouts/MainLayout";
import blogService, { GetBlogsProps } from "@/lib/services/blog.service";
import SideLeftTagDetail from "@/components/modules/Tag/SideLeftTagDetail";
import SideRightTagDetail from "@/components/modules/Tag/SideRightTagDetail";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import {
    RootStatePageTagDetail,
    setPostsPageTagDetailRDHandle,
} from "@/redux/pageTagDetail";

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}

interface TagDetailPageProps {
    slugTag: string;
    blogs: GetBlogsProps[];
}
const TagDetailPage: NextPageWithLayout<TagDetailPageProps> = ({
    slugTag,
    blogs,
}) => {
    const dispatch = useDispatch();
    const { isLoadPostsPageTagDetail, postsPageTagDetail } = useSelector(
        (state: RootStatePageTagDetail) => state.pageTagDetail
    );

    useEffect(() => {
        if (blogs) {
            dispatch(setPostsPageTagDetailRDHandle(blogs));
        }
    }, [blogs]);

    return (
        <>
            <NextSeo
                title={`Chủ đề ${slugTag ? slugTag?.toUpperCase() : ""} - ${
                    siteMetadata?.title
                }`}
                description={``}
            />
            <div className="max-w-7xl w-full min-h-screen mx-auto mb-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-2 pt-3 h-full hidden xl:block">
                        <SideLeftTagDetail />
                    </div>
                    <div className="xl:col-span-7 lg:col-span-8 col-span-full pt-3">
                        {!isLoadPostsPageTagDetail ? (
                            <>
                                {postsPageTagDetail.length > 0 ? (
                                    postsPageTagDetail.map((blog, index) => {
                                        return (
                                            <Fragment key={blog.blogId}>
                                                <CardBlog blog={blog} />
                                            </Fragment>
                                        );
                                    })
                                ) : (
                                    <div></div>
                                )}
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
        </>
    );
};

export default TagDetailPage;

TagDetailPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slugTag } = context.params as Params;
    const { blogs } = await blogService.getAllBlogs({
        query: `?tags=${slugTag}`,
    });

    return {
        props: {
            slugTag: slugTag || "",
            blogs: blogs || [],
        },
        revalidate: 60 * 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};
