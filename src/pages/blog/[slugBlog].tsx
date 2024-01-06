import {
    GetStaticPaths,
    GetStaticProps,
} from "next";

import { NextSeo } from "next-seo"
import { format } from 'date-fns';

import { Toc } from "@/types";
import { ParsedUrlQuery } from "querystring";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/Layouts/MainLayout";
import { MDXSource } from "@/components/common/MDXSource";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";
import blogService, { GetBlogDetailProps } from "@/lib/services/blog.service";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarRightBlogDetail from "@/components/modules/Blog/SideRightBlogDetail";
import siteMetadata from "@/lib/siteMetadata";
import dynamic from "next/dynamic";

const SidebarLeftBlogDetail = dynamic(() => import("@/components/modules/Blog/SideLeftBlogDetail"), {
    ssr: false
});

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}
interface BlogDetailPageProps {
    toc: Toc;
    blog: GetBlogDetailProps;
}

const BlogDetailPage: NextPageWithLayout<BlogDetailPageProps> = ({
    blog,
    toc,
}) => {

    const seoImages = (() => {
        const listImagesBlog =
            blog?.blogImages.length > 0
                ? [{
                    width: 800,
                    height: 600,
                    alt: '',
                    url: blog?.blogImages[0].urlImage
                }]
                : [{
                    width: 800,
                    height: 600,
                    alt: '',
                    url: siteMetadata?.imageBlog
                }];
                
        if (blog?.blogImages) {
            return listImagesBlog;
        }
        return [];
    })();

    const seoTags = (() => {
        const listTagsBlog =
            blog?.blogTags.length > 0
                ? blog.blogTags.map((tag) => tag.tags.slug)
                : [];
                
        return [...listTagsBlog, `${siteMetadata?.title}`];
    })();

    return (
        <>

            <NextSeo
                title={`${blog?.title || ""} - ${siteMetadata?.title}`}
                description={blog?.summary}
                openGraph={{
                    url: `${siteMetadata?.siteUrl}/blog/${blog?.slug}-${blog?.blogId}`,
                    title: blog?.title,
                    description: blog?.summary,
                    images: seoImages,
                    type: 'article',
                    article: {
                        publishedTime: blog?.createdAt ? format(blog.createdAt, 'yyyy-MM-dd HH:mm:ss') : '',
                        modifiedTime: blog?.updatedAt ? format(blog.updatedAt, 'yyyy-MM-dd HH:mm:ss') : '',
                        expirationTime: undefined,
                        section: undefined,
                        authors: [
                            `${siteMetadata?.siteUrl}/user/${blog?.author.username}`,
                        ],
                        tags: seoTags,
                    },
                }}
            />
            <div className="max-w-7xl w-full min-h-screen mx-auto mb-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-1 xl:block hidden pt-3">
                        <SidebarLeftBlogDetail />
                    </div>

                    <div className="lg:col-span-8 col-span-full pt-3">
                        {blog ? (
                            <ContentBlogDetail
                                blog={blog}
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
    const { blog }: { blog: GetBlogDetailProps } = await blogService.getBlogDetail({
        query: slugBlog,
    });

    const { content, toc } = await MDXSource({ source: blog?.content });

    return {
        props: {
            blog: {
                ...blog,
                content
            } || null,
            toc: toc || [],
        },
        revalidate: 3*60*60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};
