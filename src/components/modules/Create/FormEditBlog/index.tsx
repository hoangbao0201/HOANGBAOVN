import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ListImageEditBlog from "./ListImageBlog";
import EditBlogConfirm from "./EditBlogConfirm";
import { useDebounce } from "@/hook/useDebounce";
import EditorMarkdown from "@/components/common/EditorMarkdown";
import blogService, { GetBlogEditProps } from "@/lib/services/blog.service";
import { setIsSaveBlogEditRDHandle, setBlogEditRDHandle } from "@/redux/pageEditBlogSlide";
import { useRouter } from "next/router";
import ListTag from "./ListTag";
import Link from "next/link";
import Image from "next/image";


interface FormEditBlogProps {
    // blog?: GetBlogEditProps
    isEdit: boolean
}
const FormEditBlog = ({ isEdit = false } : FormEditBlogProps) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { blogEdit, isSave } = useSelector((state: any) => state.blogEdit);
    // const [isLoad, setIsLoad] = useState(false);

    const contentBlogEditDebounce = useDebounce(JSON.stringify(blogEdit), 2000);

    // SESSION
    const { data: session, status } = useSession();

    // Onchange Data Blog
    const eventOnchangeDataBlog = (data: { [key: string]: any }) => {
        // dispatch(setIsSaveBlogEditRDHandle(false)); 
        // setIsLoad(true);
        dispatch(setIsSaveBlogEditRDHandle(false));
        dispatch(setBlogEditRDHandle({
            ...blogEdit,
            ...data
        }));
    };

    // Handle Save Blog
    const handleSaveEditBlog = async () => {
        if(!session || status !== "authenticated") {
            return;
        }
        // console.log(blogEdit)
        try {
            const saveEditBlogRes = await blogService.updateBlog({
                data: blogEdit,
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
        if(!session || status !== "authenticated") {
            return;
        }

        try {
            const { success, blog } = await blogService.createBlog({
                data: {
                    ...blogEdit,
                    // blogTags: convertTags
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
        console.log(blogEdit)
        if(!isEdit && blogEdit) {
            if(blogEdit?.title?.length > 10 && blogEdit?.content?.length > 10) {    
                handleCreateBlog();
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
                    <div className="flex items-center mb-3">
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

                        <div className="flex items-center gap-2">
                            <ListImageEditBlog />
                            <EditBlogConfirm />
                        </div>
                        
                    </div>
                    <input
                        name="title"
                        value={blogEdit?.title || ''}
                        onChange={(e) => eventOnchangeDataBlog({ [e.target.name]: e.target.value })}
                        placeholder="Tiêu đề bài viết"
                        className="border-b outline-none mb-4 pt-2 pb-2 font-semibold text-xl w-full"
                    />
                </div>
                
                <div
                    // pt-44 pb-20 px-4
                    className="md:h-[calc(100vh-180px)] h-[calc(100vh-145px)] px-4 pb-4"
                >
                    {session ? (
                        <EditorMarkdown
                            blogId={blogEdit?.blogId}
                            content={blogEdit?.content}
                            lastEdited={blogEdit?.updatedAt}
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
