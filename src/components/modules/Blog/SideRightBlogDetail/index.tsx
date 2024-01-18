import { Toc } from "@/types";
import TOCInline from "@/components/common/MDXSource/TOCInline";
import { useEffect, useState } from "react";
import blogService, { GetBlogsProps, TagProps } from "@/lib/services/blog.service";
import Link from "next/link";

interface SidebarRightBlogDetailProps {
    blogId: number
    toc: Toc
    tags: { tags: TagProps }[]
}
const SidebarRightBlogDetail = ({ blogId, toc, tags = [] } : SidebarRightBlogDetailProps) => {

    const [blogsSuggest, setBlogsSuggest] = useState<{ title: string, slug: string, blogId: string }[]>([]);

    const handleGetBlogSuggest = async () => {
        if(!tags || !blogId) return;
        try {
            const blogsRes = await blogService.getAllBlogs({ query: `?take=3&otherId=${blogId}` });

            if(blogsRes?.success) {
                setBlogsSuggest(blogsRes.blogs)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(tags) {
            handleGetBlogSuggest();
        }
    }, [tags])

    return (
        <aside className="sticky top-[72px] md:pr-3 flex flex-col gap-3">
            {toc?.length > 0 && (
                <div className="bg-white dark:bg-slate-800/70 px-3 py-4 rounded-md shadow-sm md:block hidden">
                    <TOCInline toc={toc}/>
                </div>
            )}

            <div className="bg-white dark:bg-slate-800/70 px-3 py-4 rounded-md shadow-sm">
                <div className="px-2 mb-2 font-semibold">Bài viết liên quan</div>
                {
                    blogsSuggest ? (
                        blogsSuggest.map(blog => {
                            return (
                                <Link key={blog?.blogId} href={`/blog/${blog?.slug}-${blog?.blogId}`}>
                                    <div className="py-2 px-3 hover:bg-gray-200 hover:text-indigo-600 dark:hover:bg-gray-700 rounded-md dark:hover:text-white hover:underline">
                                        <p className="line-clamp-1">{blog?.title}</p>
                                    </div>
                                </Link>
                            )
                        })
                    ) : (
                        <div></div>
                    )
                }
                
            </div>
        </aside>
    )
}

export default SidebarRightBlogDetail;