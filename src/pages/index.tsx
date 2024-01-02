import { Fragment } from "react";
import { GetStaticProps } from "next";

import { NextSeo } from "next-seo";

import { NextPageWithLayout } from "./_app";
import siteMetadata from "@/lib/siteMetadata";
import CardBlog from "@/components/common/CardBlog";
import MainLayout from "@/components/Layouts/MainLayout";
import SideLeftHome from "@/components/modules/Home/SideLeftHome";
import SideRightHome from "@/components/modules/Home/SideRightHome";
import blogService, { GetBlogsProps } from "@/lib/services/blog.service";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";

// const InterestingArticle = dynamic(() => import('@/components/common/InterestingArticle'), {
//     ssr: false
// });

interface HomePageProps {
    blogs: GetBlogsProps[];
}
const HomePage: NextPageWithLayout<HomePageProps> = ({ blogs }) => {
    return (
        <>
            <NextSeo
                title={`${siteMetadata?.title}`}
                description={`${siteMetadata?.description}`}
                canonical={`${siteMetadata?.siteUrl}`}
                openGraph={{
                    url: `${siteMetadata?.siteUrl}`,
                    title: `${siteMetadata?.title}`,
                    description: `${siteMetadata?.description}`,
                    images: [
                        {
                            url: `${siteMetadata?.urlMain}/${siteMetadata?.siteThumbnail}`,
                            width: 800,
                            height: 600,
                            alt: "Og Image Alt",
                            type: "image/jpeg",
                        },
                    ],
                    siteName: "SiteName",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <div>
                <div className="max-w-7xl w-full min-h-screen mx-auto">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2 pt-3 h-full hidden xl:block">
                            <SideLeftHome />
                        </div>
                        <div className="xl:col-span-7 lg:col-span-8 col-span-full pt-3">
                            {blogs && blogs.length > 0 ? (
                                <>
                                    {blogs.length > 0 &&
                                        blogs.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <CardBlog blog={item} />
                                                </Fragment>
                                            );
                                        })}
                                </>
                            ) : (
                                <SkeletonCardBlog count={3} />
                            )}
                        </div>
                        <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3 h-full">
                            <SideRightHome />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;

HomePage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { blogs } = await await blogService.getAllBlogs({});

    return { props: { blogs: blogs || [] }, revalidate: 60 * 60 };
};
