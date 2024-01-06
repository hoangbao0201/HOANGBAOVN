import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ListImageEditBlog from "./ListImageBlog";
import EditBlogConfirm from "./EditBlogConfirm";
import { useDebounce } from "@/hook/useDebounce";
import EditorMarkdown from "@/components/common/EditorMarkdown";
import blogService, { GetBlogEditProps } from "@/lib/services/blog.service";
import { setIsSaveBlogEditRDHandle, setBlogEditRDHandle } from "@/redux/blogEditSlide";
import { useRouter } from "next/router";


interface FormEditBlogProps {
    // blog?: GetBlogEditProps
    isEdit: boolean
}
const FormEditBlog = ({ isEdit = false } : FormEditBlogProps) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { blogEdit, isSave } = useSelector((state: any) => state.blogEdit);
    const [isLoad, setIsLoad] = useState(false);

    const contentBlogEditDebounce = useDebounce(JSON.stringify(blogEdit), 2000);

    // SESSION
    const { data: session, status } = useSession();

    // Onchange Data Blog
    const eventOnchangeDataBlog = (data: { [key: string]: any }) => {
        // dispatch(setIsSaveBlogEditRDHandle(false)); 
        setIsLoad(true);
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
        if(!isEdit && blogEdit) {
            if(blogEdit?.title?.length > 10 || blogEdit?.content?.length > 10) {
                handleCreateBlog();
            }
        }
        else if(isLoad) {
            dispatch(setIsSaveBlogEditRDHandle(false));
            handleSaveEditBlog()
            console.log("lưu bài viết")
        }
        else {
            console.log("load lần đầu")
        }
    }, [contentBlogEditDebounce]);

    return (
        <main className="">
            <div
                className="py-5 px-4 bg-white"
            >
                <div className="flex">
                    <input
                        name="title"
                        value={blogEdit?.title || ''}
                        onChange={(e) => eventOnchangeDataBlog({ [e.target.name]: e.target.value })}
                        placeholder="Tiêu đề bài viết"
                        className="border-b outline-none mb-4 pb-2 font-semibold text-xl w-full"
                    />
                    <EditBlogConfirm />
                </div>

                <ListImageEditBlog />

                {isEdit && !isSave && "Loading"}
                
                <div>
                    {session ? (
                        <EditorMarkdown
                            blogId={blogEdit?.blogId}
                            content={blogEdit?.content}
                            lastEdited={blogEdit?.updatedAt}
                            onchangeContent={eventOnchangeDataBlog}
                        />
                    ) : (
                        <div className="w-full min-h-screen border-none"></div>
                    )}
                </div>
            </div>

        </main>
    );
};

export default FormEditBlog;
