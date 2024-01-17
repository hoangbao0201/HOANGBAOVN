import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useDispatch, useSelector } from "react-redux";

import ListImageEditBlog from "./ListImageBlog";
import EditBlogConfirm from "./EditBlogConfirm";
import { useDebounce } from "@/hook/useDebounce";
import EditorMarkdown from "@/components/common/EditorMarkdown";
import blogService, { GetBlogEditProps } from "@/lib/services/blog.service";
import { setIsSaveBlogEditRDHandle, setBlogEditRDHandle, RootStatePageEditBlog } from "@/redux/pageEditBlogSlide";


// const EditorMarkdown = dynamic(() => import("@/components/common/EditorMarkdown"), { ssr: false })

interface FormEditBlogProps {
    // blog?: GetBlogEditProps
    isEdit: boolean
    blogId?: number
}
const FormEditBlog = ({ blogId, isEdit = false } : FormEditBlogProps) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { blogEdit, isSave } = useSelector((state: RootStatePageEditBlog) => state.pageEditBlog);

    const contentBlogEditDebounce = useDebounce(JSON.stringify(blogEdit), 2000);

    // SESSION
    const { data: session, status } = useSession();

    // Onchange Data Blog
    const eventOnchangeDataBlog = (data: { [key: string]: any }) => {
        dispatch(setIsSaveBlogEditRDHandle(false));
        dispatch(setBlogEditRDHandle({
            ...blogEdit,
            ...data
        }));
    };

    // Handle Save Blog
    const handleSaveEditBlog = async () => {
        const { blogId, slug, title, summary, content, thumbnailUrl, published, blogTags } = blogEdit;

        if(!session || status !== "authenticated" || !blogId) {
            return;
        }

        try {
            const saveEditBlogRes = await blogService.updateBlog({
                data: {
                    blogId: blogId,
                    slug: slug,
                    title: title,
                    summary: summary,
                    content: content,
                    published: published,
                    blogTags: blogTags,
                    thumbnailUrl: thumbnailUrl
                },
                token: session?.backendTokens.accessToken
            });

            if(saveEditBlogRes && saveEditBlogRes.success) {
                dispatch(setIsSaveBlogEditRDHandle(true));
            }
        } catch (error) {
            
        }

        dispatch(setIsSaveBlogEditRDHandle(true)); 
    }

    // Handle Create Blog
    const handleCreateBlog = async () => {
        if(!session || status !== "authenticated" || !blogEdit) {
            return;
        }
        
        try {
            const { blogId, slug, title, summary, content, published, blogTags } = blogEdit;

            const { success, blog } = await blogService.createBlog({
                data: {
                    title: title,
                    summary: summary,
                    content: content,
                    published: published,
                    blogTags: blogTags
                },
                token: session.backendTokens.accessToken
            });

            if(success) {
                dispatch(setIsSaveBlogEditRDHandle(true));
                router.push(`/creator/post/${blog?.blogId}/edit`, undefined, { shallow: true });
            }
        } catch (error) {}
    }
    
    useEffect(() => {
        if(!isEdit && !blogEdit?.blogId) {
            if(blogEdit?.title?.length > 10 && blogEdit?.content?.length > 10) {    
                handleCreateBlog();
                console.log("Create Blog")
            }
        }
        else if(!isSave) {
            handleSaveEditBlog()
            console.log("lưu bài viết")
        }
        else {
            console.log("load lần đầu")
        }
    }, [contentBlogEditDebounce]);

    return (
        <div className="w-screen h-screen md:p-4 fixed inset-0">
            <div className="relative bg-white md:rounded-md shadow-sm">
                <div className="w-full relative top-0 left-0 right-0 px-4 py-4">
                    <div className="flex items-center mb-3 h-10">
                        <Link href={`/`}>
                            <Image
                                width={100}
                                height={100}
                                loading="lazy"
                                decoding="async"
                                src={`/static/images/logo.png`}
                                alt="Logo HOANGBAO"
                                className="w-[80px] h-[30px]"
                            />
                        </Link>
                        <span className="mx-3 inline h-5 w-px bg-gray-300/60"></span>
                        <div className="mr-auto whitespace-nowrap">
                            {
                                isEdit && (
                                    !isSave ? (
                                        <span className="bg-indigo-600 text-white rounded-md py-1 px-2 text-sm">Đang lưu...</span>
                                    ) : (
                                        <span className="bg-indigo-600 text-white rounded-md py-1 px-2 text-sm">Đã lưu</span>
                                    )
                                )
                            }
                        </div>

                        {
                            isEdit && (
                                <div className="flex items-center gap-2">
                                    <ListImageEditBlog />
                                    <EditBlogConfirm />
                                </div>
                            )
                        }
                        
                    </div>
                    <input
                        name="title"
                        value={blogEdit?.title || ''}
                        onChange={(e) => eventOnchangeDataBlog({ [e.target.name]: e.target.value })}
                        placeholder="Tiêu đề bài viết"
                        className="border-b outline-none mb-4 pt-2 pb-2 font-semibold text-xl w-full"
                    />
                </div>
                
                <div className="md:h-[calc(100vh-175px)] h-[calc(100vh-145px)] px-4 pb-4">
                    {session ? (
                        <EditorMarkdown
                            blogId={blogId}
                            // content={blogEdit?.content}
                            // lastEdited={blogEdit?.updatedAt}
                            onchangeContent={eventOnchangeDataBlog}
                        />
                    ) : (
                        <div className="w-full border-none"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormEditBlog;
