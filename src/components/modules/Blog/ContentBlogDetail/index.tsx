import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";

import ContentComment from "../ContentComment";
import TagsBlog from "@/components/common/TagsBlog";
import AvatarRank from "@/components/common/AvatarRank";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import formatFullDateTime from "@/utils/formatFullDateTime";
import commentService from "@/lib/services/comment.service";
import MDXContent from "@/components/common/MDXSource/MDXContent";
import blogService, { GetBlogDetailProps } from "@/lib/services/blog.service";
import { setCommentsPageBlogDetailRDHandle, setIsLoadingCommentsPageBlogDetailRDHandle } from "@/redux/pageBlogDetailSlide";


interface Params extends ParsedUrlQuery {
    slugBlog: string;
}
interface ContentBlogDetailProps {
    content: any
    blog: GetBlogDetailProps
}
const ContentBlogDetail = ({ blog, content }: ContentBlogDetailProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    const handleGetComments = async () => {
        const { slugBlog } = router.query as Params;
        if(!slugBlog) {
            return;
        }

        dispatch(setIsLoadingCommentsPageBlogDetailRDHandle(true))
        try {
            const { success, comments } = await commentService.getComments({
                query: `?blogId=${slugBlog.replace(/.*[^0-9]/, "")}`,
            });

            
            if(success) {
                dispatch(setCommentsPageBlogDetailRDHandle(comments));
            }

            throw new Error();
        } catch (error) {
            dispatch(setIsLoadingCommentsPageBlogDetailRDHandle(false))
        }
    }

    useEffect(() => {
        if (status !== "loading") {
            const delay = 10000;
            const timeoutId = setTimeout(() => {
                blogService.increaseView({
                    blogId: blog?.blogId,
                    token: session?.backendTokens.accessToken || undefined,
                });
            }, delay);

            return () => clearTimeout(timeoutId);
        }
    }, [status]);

    useEffect(() => {
        dispatch(setCommentsPageBlogDetailRDHandle(null));
        handleGetComments();
    }, [])

    return (
        <>
            <div className="md:px-3">
                <div className="bg-white dark:bg-slate-800/70 md:rounded-md shadow-sm overflow-hidden">
                    <article className="">
                        <header className="mb-4">
                            <div className="mb-6">
                                <Image
                                    width={800}
                                    height={800}
                                    alt="ảnh bìa"
                                    src={blog?.thumbnailUrl || "/static/images/default/bg_blog_lg.png"}
                                    priority={true}
                                    // className="mx-auto block max-h-80 w-full object-cover"
                                    className="mx-auto block aspect-video w-full object-cover"
                                />
                            </div>
                            <Breadcrumbs
                                listBreadcrumbs={[
                                    { title: "bài viết", slug: '/blog' },
                                    { title: blog?.title, slug: `/blog/${blog?.slug}-${blog?.blogId}` },
                                ]}
                                className="md:px-8 px-4"
                            />

                            <div className="flex justify-between md:px-8 px-4 pt-4 mb-5">
                                <div className="flex">
                                    <Link aria-label={`${blog?.author.name}`} href={`/user/${blog?.author.username}`}>
                                        <AvatarRank rank={1}>
                                            <Image
                                                width={60}
                                                height={60}
                                                alt="ảnh người dùng"
                                                src={
                                                    "/static/images/default/avatar_user_sm.jpg"
                                                }
                                                className="w-12 h-12 block object-cover rounded-full flex-shrink-0"
                                            />
                                        </AvatarRank>
                                    </Link>
                                    <div className="ml-3">
                                        <div className="flex items-center mb-1">
                                            <Link
                                                href={`/user/${blog?.author.username}`}
                                            >
                                                <div className="hover:underline text-lg font-medium">
                                                    {blog?.author.name}
                                                </div>
                                            </Link>
                                            <span className="ml-2 text-sm font-medium border border-gray-400 px-2 py-[2px] rounded-md">
                                                Cấp {blog?.author.rank || 1}
                                            </span>
                                        </div>
                                        <p className="text-sm hover:underline">
                                            {formatFullDateTime(blog?.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    {/* <p>Thời gian: {convertTime(blog?.updatedAt)}</p> */}
                                </div>
                            </div>

                            <h1
                                title={blog?.title}
                                className="md:font-bold md:text-4xl md:px-8 px-4 font-semibold text-2xl line-clamp-2 relative block"
                            >
                                {blog?.title}
                            </h1>
                            <TagsBlog
                                className="md:px-8 px-4 mt-5 mb-6"
                                listTag={blog?.blogTags}
                            />
                        </header>
                        <div className="md:px-8 px-4 mb-5">
                            <MDXContent
                                content={content}
                            />
                        </div>
                    </article>

                </div>

                <div>
                    <ContentComment blog={blog} />
                </div>
            </div>
        </>
    );
};

export default ContentBlogDetail;
