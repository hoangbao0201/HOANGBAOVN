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
    RootStatePageBlogDetail,
    addCommentsPageBlogDetailRDHandle,
    addReplyCommentPageBlogDetailRDHandle,
    setCommentIdPageBlogDetailRDHandle,
} from "@/redux/pageBlogDetailSlide";
import SkeletonItemComment from "../../skeletons/SkeletonItemComment";
import Link from "next/link";

interface ContentCommentProps {
    blog: GetBlogDetailProps;
}
const ContentComment = ({ blog }: ContentCommentProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    // const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);
    const { commentsPageBlogDetail, isLoadingCommentsPageBlogDetail } = useSelector(
        (state: RootStatePageBlogDetail) => state.pageBlogDetail
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
        // || commentText.getCurrentContent().getPlainText().length <= 3
        if (
            !session ||
            status !== "authenticated" ||
            commentText.getCurrentContent().getPlainText().length <= 0
        ) {
            throw new Error("Không đủ thông tin");
        }

        try {
            const cvCommentText = JSON.stringify(
                convertToRaw(commentText.getCurrentContent())
            ) as string;

            // Add comment before posting to the Server
            if (receiverId && parentId) {
                dispatch(
                    addReplyCommentPageBlogDetailRDHandle({
                        commentId: parentId,
                        replyComments: [
                            {
                                blogId: blog?.blogId,
                                commentId: -1,
                                commentText: cvCommentText,
                                parentId: parentId,
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
                                receiver: {
                                    userId: receiverId,
                                    name: "",
                                    username: "",
                                },
                            },
                        ],
                    })
                );
            } else {
                dispatch(
                    addCommentsPageBlogDetailRDHandle([
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
                if (receiverId && parentId) {
                    dispatch(
                        setCommentIdPageBlogDetailRDHandle({
                            type: "replycomment",
                            commentId: commentRes?.comment.commentId,
                            parentId: parentId,
                        })
                    );
                } else {
                    dispatch(
                        setCommentIdPageBlogDetailRDHandle({
                            type: "comment",
                            commentId: commentRes?.comment.commentId,
                        })
                    );
                }
            }
        } catch (error) {}
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
        try {
            editorRef.current?.focus();
            setEditorState(EditorState.createEmpty());

            await handleSendComment({
                receiverId,
                parentId,
                commentText,
            });
        } catch (error) {
            // editorRef.current?.focus();
            // setEditorState(EditorState.createEmpty());
            // console.log(error);
        }
    };

    return (
        <div className="md:px-5 px-3 py-5 bg-white dark:bg-slate-800/70 mt-5 md:rounded-md shadow-sm">
            <h5 id="comment" className="text-lg font-semibold mb-2 scroll-mt-[70px]">
                Bình luận bài viết
            </h5>
            <div className={`pb-3`}>
                {status === "unauthenticated" && (
                    <>
                        Hãy{" "}
                        <Link aria-label={`đăng nhập`} className="font-semibold hover:underline" href={`/auth/login`}>
                            đăng nhập
                        </Link>{" "}
                        hoặc{" "}
                        <Link aria-label={`đăng ký`} className="font-semibold hover:underline" href={`/auth/login`}>
                            đăng ký
                        </Link>{" "}
                        để bắt đầu bình luận
                    </>
                )}
            </div>

            <div className="pb-4 block">
                <FormEditorComment
                    isReply={false}
                    // isLoad={isLoadingSendComment}
                    // isLoad={commentsPageBlogDetail ? commentsPageBlogDetail[0].commentId === -1 : false}
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
                {isLoadingCommentsPageBlogDetail ? (
                    <SkeletonItemComment count={3} />
                ) : (
                    commentsPageBlogDetail &&
                    commentsPageBlogDetail.length > 0 &&
                    commentsPageBlogDetail.map((comment, index) => {
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
