import Image from "next/image";
import dynamic from "next/dynamic";

import { NextSeo } from "next-seo";
import { ParsedUrlQuery } from "querystring";

import { NextPageWithLayout } from "../_app";
import siteMetadata from "@/lib/siteMetadata";
import { GetStaticPaths, GetStaticProps } from "next";
import MainLayout from "@/components/Layouts/MainLayout";
import userService, { GetUserDetailProps } from "@/lib/services/user.service";

const ListBlogUser = dynamic(
    () =>
        import("@/components/modules/User/ListBlogUser", {
            ssr: false,
        } as ImportCallOptions)
);

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}

interface UserDetailPageProps {
    user: GetUserDetailProps
}
const UserDetailPage: NextPageWithLayout<UserDetailPageProps> = ({ user }) => {
    
    return (
        <>
            <NextSeo
                title={`${user?.name} - ${siteMetadata?.title}`}
                description={user?.description || ""}
            />
            <div>
                <div className="min-h-screen">
                    <div className="bg-black dark:bg-white/50 w-full h-32"></div>
    
                    {user && (
                        <div className="max-w-6xl mx-auto top-0 -translate-y-20">
                            <div className="py-5 flex flex-col items-center bg-white dark:bg-slate-800/70 shadow-sm rounded-md">
                                <span className="">
                                    <Image
                                        width={150}
                                        height={150}
                                        alt={`Ảnh của Bảo`}
                                        className="w-32 h-32 block object-cover rounded-full overflow-hidden"
                                        src={`/static/images/default/avatar_user_sm.jpg`}
                                    />
                                </span>
                                <div className="text-center mt-4">
                                    <h1 className="font-semibold text-3xl mb-3">
                                        {user?.name}
                                    </h1>
                                    <div>
                                        {/* {user.description} */}I wish for
                                        everyone to find passion in their life. I
                                        found mine in coding
                                    </div>
                                </div>
                            </div>
    
                            <div className="mt-4">
                                <div className="grid grid-cols-12">
                                    <div className="md:col-span-4 col-span-full mb-4">
                                        <div className="px-4 py-4 bg-white dark:bg-slate-800/70 shadow-sm rounded-md">
                                            <div>
                                                <span>
                                                    {user?._count.blogs} bài viết
                                                </span>
                                            </div>
                                            <div>
                                                <span>0 bình luận</span>
                                            </div>
                                            <div>
                                                <span>
                                                    {user?._count.userSaves} chủ đề
                                                    theo dõi
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-span-8 col-span-full mb-4">
                                        <ListBlogUser slug={user?.username} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserDetailPage;

UserDetailPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slugUser } = context.params as Params;
    const { user } = await userService.getUserDetail({ username: `${slugUser}` });

    return {
        props: {
            user: user || []
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
