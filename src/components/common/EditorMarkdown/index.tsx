import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useDispatch, useSelector } from "react-redux";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import convertTime from "@/utils/convertTime";
import TextActionSave from "./Toolbar/TextActionSave";
import imageService from "@/lib/services/image.service";
import MDXContentEdit from "../MDXSource/MDXContentEdit";
import { RootStatePageEditBlog, addImageBlogEditRDHandle } from "@/redux/pageEditBlogSlide";


interface EditorMarkdownProps {
    blogId?: number
    // lastEdited?: Date;
    // content: string | undefined;
    onchangeContent: (data: { [key: string]: any }) => void;
}
const EditorMarkdown = ({
    // lastEdited,
    blogId,
    // content,
    onchangeContent,
}: EditorMarkdownProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const { blogEdit, isSave } = useSelector((state: RootStatePageEditBlog) => state.pageEditBlog);

    // Hanlde Upload Image Blog
    const handleUploadImageBlog = async (file: File) => {
        if (!session || status !== "authenticated") {
            return { url: '', text: '' };
        }

        try {
            const formData = new FormData();
            formData.append("image", file);
            const imageRes = await imageService.createImageBlog({
                query: `?blogId=${blogId}`,
                dataImage: formData,
                token: session.backendTokens.accessToken,
            });

            if (imageRes?.success) {
                dispatch(addImageBlogEditRDHandle({
                    blogImageId: imageRes.blogImageId,
                    urlImage: imageRes.urlImage
                }));
                return imageRes.urlImage;
            }
            return "";
        } catch (error) {
            return "";
        }
    };
    useEffect(() => {
        // Editor.use(TextActionSave, textActionConfig);
        Editor.use(TextActionSave, {
            start: blogEdit?.updatedAt ? `Lần sửa cuối ${convertTime(blogEdit?.updatedAt)}` : "",
        });
    }, [blogEdit?.updatedAt]);

    return (
        <>
            <Editor
                value={blogEdit?.content || ""}
                className="max-h-full h-full"
                onChange={({ text, html }) =>
                    onchangeContent({ content: text })
                }
                onImageUpload={handleUploadImageBlog}
                renderHTML={async (text: string) => {
                    return <MDXContentEdit content={text}/>
                }}

            />
        </>
    );
};

export default EditorMarkdown;
