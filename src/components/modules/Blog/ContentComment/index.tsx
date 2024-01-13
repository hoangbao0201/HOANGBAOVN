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
    addReplyCommentsBlogDetailRDHandle,
    setCommentIdBlogDetailRDHandle,
} from "@/redux/commentsBlogDetailSlide";
import SkeletonItemComment from "../../skeletons/SkeletonItemComment";

interface ContentCommentProps {
    blog: GetBlogDetailProps;
}
const ContentComment = ({ blog }: ContentCommentProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    // const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);
    const { commentsBlogDetail, isLoadingBlogDetail } = useSelector(
        (state: RootStateCommentsBlogDetail) => state.commentsBlogDetail
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editorRef = useRef<Editor | null>(null);

    // Handle Send Comment
    const handleSendComment = async ({
        receiverId,
        parentId,
        commentText,
    }: {
        receiverId?: number;
        parentId?: number;
        commentText: EditorState;
    }) => {
        if (!session || status !== "authenticated" || commentText.getCurrentContent().getPlainText().length <= 3) {
            return;
        }

        try {
            const cvCommentText = JSON.stringify(
                convertToRaw(commentText.getCurrentContent())
            ) as string;

            // Add comment before posting to the Server
            if (receiverId && parentId) {
                // dispatch(
                //     addReplyCommentsBlogDetailRDHandle({
                //         commentId: parentId,
                //         replyComments: [commentRes?.comment],
                //     })
                // );
            } else {
                dispatch(
                    addCommentsBlogDetailRDHandle([
                        {
                            // ...commentRes.comment,
                            blogId: blog?.blogId,
                            commentId: -1,
                            commentText: cvCommentText,
                            parentId: null,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
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

            const commentRes = await commentService.addComment({
                data: {
                    blogId: blog.blogId,
                    receiverId,
                    parentId,
                    commentText: cvCommentText,
                },
                token: session.backendTokens.accessToken,
            });

            if (commentRes.success) {
                if(receiverId && parentId) {
                }
                else {
                    dispatch(setCommentIdBlogDetailRDHandle({ type: "comment", commentId: commentRes?.comment.commentId }));
                }
            }
        } catch (error) {
            
        }
    };

    // Call Handle Send Comment
    const handleCallSendComment = async ({
        receiverId,
        parentId,
        commentText,
    }: {
        receiverId?: number;
        parentId?: number;
        commentText: EditorState;
    }) => {
        // setIsLoadingSendComment(true);

        try {
            editorRef.current?.focus();
            setEditorState(EditorState.createEmpty());

            await handleSendComment({
                receiverId,
                parentId,
                commentText,
            });
            
            // setIsLoadingSendComment(false);
        } catch (error) {
            // setIsLoadingSendComment(false);
            editorRef.current?.focus();
            setEditorState(EditorState.createEmpty());
        }
    };

    return (
        <div className="md:px-5 px-3 py-5 bg-white dark:bg-slate-800 mt-5 md:rounded-md shadow-sm">
            <h5 id="comment" className="text-lg font-semibold mb-4">Bình luận bài viết</h5>

            <div className="pb-4 block">
                <FormEditorComment
                    isReply={false}
                    // isLoad={isLoadingSendComment}
                    // isLoad={commentsBlogDetail ? commentsBlogDetail[0].commentId === -1 : false}
                    isLoad={false}
                    sender={session?.user}
                    receiver={session?.user}
                    editorRef={editorRef}
                    handleSend={handleCallSendComment}
                    isEditorComment={false}
                    setDataFormComment={setEditorState}
                    dataFormComment={editorState}
                />
            </div>

            <div className="list-item-comment">
                {isLoadingBlogDetail ? (
                    <SkeletonItemComment count={3} />
                ) : (
                    commentsBlogDetail &&
                    commentsBlogDetail.length > 0 &&
                    commentsBlogDetail.map((comment, index) => {
                        return (
                            <Fragment key={`${comment?.commentId}-${index}`}>
                                <CardComment
                                    user={session?.user}
                                    comment={comment}
                                    handleSendComment={handleSendComment}
                                />
                            </Fragment>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ContentComment;
