import { Fragment, useRef, useState } from "react";

import { Editor, EditorState } from "draft-js";
import { useDispatch, useSelector } from "react-redux";

import ItemComment from "./ItemComment";
import IconArrowTurnUp from "@/components/modules/icons/IconArrowTurnUp";
import commentService, {
    GetCommentsProps,
} from "@/lib/services/comment.service";
import {
    CommentsBlogDetailProps,
    RootStateCommentsBlogDetail,
    addReplyCommentsBlogDetailRDHandle,
} from "@/redux/commentsBlogDetailSlide";
import { setButonLoadingRDHandle } from "@/redux/buttonActionSlide";
import FormEditorComment from "@/components/modules/Blog/ContentComment/FormEditorComment";
import Image from "next/image";

interface CardCommentProps {
    user: GetCommentsProps["sender"] | undefined;
    comment: CommentsBlogDetailProps;
    handleSendComment: any;
}
const CardComment = ({
    user,
    comment,
    handleSendComment,
}: CardCommentProps) => {
    const editorRef = useRef<Editor | null>(null);

    const dispatch = useDispatch();
    const { nameButtonAction } = useSelector(
        (state: any) => state.buttonAction
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [dataReceiver, setDataReceiver] = useState<{
        receiverId: number | null;
    }>({
        receiverId: null,
    });

    // Handle Get Reply Comments
    const handleGetReplyComments = async () => {
        dispatch(
            setButonLoadingRDHandle(
                `button_get_replycomment_${comment?.commentId}`
            )
        );
        try {
            const replyCommentsRes = await commentService.getReplyComments({
                query: `?blogId=${comment?.blogId}&parentId=${
                    comment?.commentId
                }&take=10&skip=${comment?.replyComments?.length || 0}`,
            });
            if (replyCommentsRes?.success) {
                dispatch(
                    addReplyCommentsBlogDetailRDHandle({
                        commentId: comment.commentId,
                        replyComments: replyCommentsRes?.comments,
                    })
                );
            }
            dispatch(setButonLoadingRDHandle(""));
        } catch (error) {
            dispatch(setButonLoadingRDHandle(""));
        }
    };

    // Call Handle Get Reply Comments
    const handleCallSendComment = async () => {
        try {
            editorRef.current?.focus();
            setEditorState(EditorState.createEmpty());

            await handleSendComment({
                receiverId: dataReceiver?.receiverId,
                parentId: comment?.commentId,
                commentText: editorState,
            });

            await editorRef.current?.focus();
            setEditorState(() => EditorState.createEmpty());
        } catch (error) {
            editorRef.current?.focus();
            setEditorState(EditorState.createEmpty());
        }
    };

    return (
        <div className="relative item-comment mb-3">
            <ItemComment
                user={user}
                isSended={comment?.commentId === -1}
                isReply={false}
                comment={comment}
                setReceiver={setDataReceiver}
            />
            <div className="relative">
                {comment?.replyComments &&
                    comment?.replyComments.map((replyComment, index) => {
                        return (
                            <Fragment key={replyComment.commentId}>
                                <ItemComment
                                    user={user}
                                    isReply={true}
                                    comment={replyComment}
                                    setReceiver={setDataReceiver}
                                    isShowMore={
                                        comment._count.replyComments -
                                            (comment?.replyComments?.length ||
                                                0) >
                                            0 || !!dataReceiver?.receiverId
                                    }
                                    isLastChild={
                                        comment?.replyComments?.length ===
                                        index + 1
                                    }
                                    isSended={replyComment?.commentId === -1}
                                />
                            </Fragment>
                        );
                    })}
            </div>

            <div>
                {(comment?.replyComments
                    ? comment._count.replyComments >
                      comment?.replyComments.length
                    : comment?._count.replyComments > 0) && (
                    <div className="pl-12 text-sm relative">
                        <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[16px] absolute left-[20px] top-[0px] rounded-bl-xl"></div>
                        <div
                            className={`cursor-pointer whitespace-nowrap flex items-center select-none hover:underline py-[5px] ${
                                nameButtonAction ===
                                    `button_get_replycomment_${comment?.commentId}` &&
                                "pointer-events-none"
                            }`}
                            onClick={handleGetReplyComments}
                        >
                            <i className="rotate-90 mx-2">
                                <IconArrowTurnUp size={17} />
                            </i>
                            <span className="mr-2">
                                Xem tất cả{" "}
                                {comment?._count.replyComments -
                                    (comment?.replyComments?.length || 0)}{" "}
                                phản hồi
                            </span>
                            {nameButtonAction ===
                                `button_get_replycomment_${comment?.commentId}` && (
                                <Image
                                    width={20}
                                    height={20}
                                    alt="loaiding button"
                                    src={`/static/gif/loading-button.gif`}
                                    className="w-4 h-4"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="pl-12 relative">
                {dataReceiver?.receiverId && (
                    <>
                        <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[78px] absolute left-[20px] -top-[50px] rounded-bl-xl"></div>
                        <FormEditorComment
                            isReply={true}
                            isLoad={
                                nameButtonAction ===
                                `button_post_comment_${comment?.commentId}`
                            }
                            sender={user}
                            receiver={comment.sender}
                            editorRef={editorRef}
                            handleSend={handleCallSendComment}
                            isEditorComment={false}
                            setDataFormComment={setEditorState}
                            dataFormComment={editorState}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default CardComment;
