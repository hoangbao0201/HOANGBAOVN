import MainLayout from "@/components/Layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import SideLeftHome from "@/components/modules/Home/SideLeftHome";
import { Fragment } from "react";
import CardBlog from "@/components/common/CardBlog";
import SideRightHome from "@/components/modules/Home/SideRightHome";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import blogService, { GetBlogsProps } from "@/lib/services/blog.service";
import { GetStaticProps } from "next";

interface HomePageProps {
    blogs: GetBlogsProps[];
}
const HomePage: NextPageWithLayout<HomePageProps> = ({ blogs }) => {
    return (
        <div>
            <main className="max-w-7xl w-full min-h-screen mx-auto">
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
            </main>
        </div>
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
