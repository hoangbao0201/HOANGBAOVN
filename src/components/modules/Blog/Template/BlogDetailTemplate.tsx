import SidebarRightBlogDetail from "../SideRightBlogDetail";
import { GetBlogDetailProps } from "@/lib/services/blog.service";
import { GetCommentsProps } from "@/lib/services/comment.service";
import { MDXSource } from "@/components/common/MDXSource/MDXSource";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarLeftBlogDetail from "@/components/modules/Blog/SideLeftBlogDetail";

interface BlogDetailTemplateProps {
    blog: GetBlogDetailProps;
    comments: GetCommentsProps;
}
const BlogDetailTemplate = async ({
    blog,
    comments,
}: BlogDetailTemplateProps) => {
    const { content, toc } = await MDXSource({ source: blog.content });

    return (
        <main className="max-w-7xl w-full min-h-screen mx-auto mb-4">
            <div className="grid grid-cols-12">
                <div className="col-span-1 xl:block hidden pt-3">
                    <SidebarLeftBlogDetail />
                </div>

                <div className="lg:col-span-8 col-span-full pt-3">
                    {blog ? (
                        <ContentBlogDetail
                            blog={blog}
                            comments={comments}
                            content={content}
                        />
                    ) : (
                        <SkeletonCardBlog count={3} />
                    )}
                </div>

                <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3 md:block hidden">
                    <SidebarRightBlogDetail toc={toc}/>
                </div>
            </div>
        </main>
    );
};

export default BlogDetailTemplate;
