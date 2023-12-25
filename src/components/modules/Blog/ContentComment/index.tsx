import { useParams } from "next/navigation";
import { Fragment, useRef, useState } from "react";


import "draft-js/dist/Draft.css";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { Editor, EditorState, convertToRaw } from "draft-js";

import FormEditorComment from "./FormEditorComment";
import CardComment from "@/components/common/CardComment";
import commentService from "@/lib/services/comment.service";
import { GetBlogDetailProps } from "@/lib/services/blog.service";
import {
    RootStateCommentsBlogDetail,
    addCommentsBlogDetailRDHandle,
} from "@/redux/commentsBlogDetail";

interface ContentCommentProps {
    blog: GetBlogDetailProps;
}
const ContentComment = ({ blog }: ContentCommentProps) => {
    const { slugBlog } = useParams<{ slugBlog: string }>();

    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);
    const { commentsBlogDetail, isLoadingBlogDetail } = useSelector(
        (state: RootStateCommentsBlogDetail) => state.commentsBlogDetail
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editorRef = useRef<Editor | null>(null);

    const handleSendComment = async ({ receiverId, parentId, commentText }: { receiverId?: number, parentId?: number, commentText: string }) => {
        if (!session || status !== "authenticated") {
            return;
        }
        setIsLoadingSendComment(true);

        try {
            const commentRes = await commentService.addComment({
                data: {
                    blogId: blog.blogId,
                    receiverId,
                    parentId,
                    commentText: commentText ? commentText : JSON.stringify(
                        convertToRaw(editorState.getCurrentContent())
                    ) as string,
                },
                token: session.backendTokens.accessToken,
            });

            if (commentRes.success) {
                dispatch(
                    addCommentsBlogDetailRDHandle([
                        {
                            ...commentRes.comment,
                            sender: {
                                userId: session.user.userId,
                                name: session.user.name,
                                username: session.user.username,
                                rank: session.user.rank,
                                role: {
                                    roleId: session.user.role.roleId,
                                    roleName: session.user.role.roleName,
                                },
                                avatarUrl: session.user.avatarUrl,
                            },
                            _count: {
                                replyComments: 0,
                            },
                        },
                    ])
                );
            }
            setEditorState(() => EditorState.createEmpty());
            setIsLoadingSendComment(false);
            editorRef.current?.focus();
        } catch (error) {
            setEditorState(EditorState.createEmpty());
            setIsLoadingSendComment(false);
        }
    };

    return (
        <div className="md:px-5 px-3 py-5 bg-white mt-5 md:rounded-md shadow-sm">
            <h5 className="text-lg font-semibold mb-4">Bình luận bài viết</h5>

            <div className="pb-4 block">
                <FormEditorComment
                    isLoad={isLoadingSendComment}
                    user={session?.user}
                    editorRef={editorRef}
                    handleSend={handleSendComment}
                    isEditorComment={false}
                    setDataFormComment={setEditorState}
                    dataFormComment={editorState}
                />
            </div>

            {status === "authenticated" &&
                commentsBlogDetail &&
                commentsBlogDetail.length > 0 &&
                commentsBlogDetail.map((comment, index) => {
                    return (
                        <Fragment key={comment.commentId || index}>
                            <CardComment
                                user={session.user}
                                comment={comment}
                                handleSendComment={handleSendComment}
                            />
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default ContentComment;
