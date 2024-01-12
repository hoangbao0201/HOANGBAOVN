import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useDispatch } from "react-redux";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import convertTime from "@/utils/convertTime";
import TextActionSave from "./Toolbar/TextActionSave";
import imageService from "@/lib/services/image.service";
import MDXContentEdit from "../MDXSource/MDXContentEdit";
import { addImageBlogEditRDHandle } from "@/redux/pageEditBlogSlide";


interface EditorMarkdownProps {
    blogId: number
    lastEdited: Date;
    content: string | undefined;
    onchangeContent: (data: { [key: string]: any }) => void;
}
const EditorMarkdown = ({
    lastEdited,
    blogId,
    content,
    onchangeContent,
}: EditorMarkdownProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    // Hanlde Upload Image Blog
    const handleUploadImageBlog = async (file: File) => {
        if (!session || status !== "authenticated") {
            return;
        }

        console.log("blogId: ", blogId);

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
        } catch (error) {}
    };
    useEffect(() => {
        // Editor.use(TextActionSave, textActionConfig);
        Editor.use(TextActionSave, {
            start: `Lần sửa cuối ${convertTime(lastEdited)}`,
        });
    }, [lastEdited]);

    return (
        <>
            <Editor
                value={content || ""}
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
