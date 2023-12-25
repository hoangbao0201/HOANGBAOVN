import { Fragment, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ItemComment from "./ItemComment";
import commentService from "@/lib/services/comment.service";
import IconArrowTurnUp from "@/components/modules/icons/IconArrowTurnUp";
import {
    CommentsBlogDetailProps,
    RootStateCommentsBlogDetail,
    addReplyCommentsBlogDetailRDHandle,
} from "@/redux/commentsBlogDetail";
import ItemReplyComment from "./ItemReplyComment";

interface CardCommentProps {
    user: any
    comment: CommentsBlogDetailProps;
    handleSendComment: any
}
const CardComment = ({ user, comment, handleSendComment }: CardCommentProps) => {
    
    const dispatch = useDispatch();
    const { commentsBlogDetail, isLoadingBlogDetail } = useSelector(
        (state: RootStateCommentsBlogDetail) => state.commentsBlogDetail
    );
    const [isLoadingReplyComment, setIsLoadingReplyComment] = useState(false);

    const handleGetReplyComments = async () => {
        setIsLoadingReplyComment(true);
        try {
            const replyCommentsRes = await commentService.getReplyComments({
                query: `?blogId=${comment?.blogId}&parentId=${comment?.commentId}`,
            });
            if (replyCommentsRes?.success) {
                dispatch(
                    addReplyCommentsBlogDetailRDHandle({
                        commentId: comment.commentId,
                        replyComments: replyCommentsRes?.comments,
                    })
                );
            }
            setIsLoadingReplyComment(false);
        } catch (error) {
            setIsLoadingReplyComment(false);
        }
    };

    return (
        <div className="mb-3">
            <ItemComment
                user={user}
                comment={comment}
                isReply={comment._count.replyComments > 0}
            />

            <div className="list-item-comments">
                {comment?.replyComments &&
                    comment?.replyComments.map((replyComment, index) => {
                        return (
                            <Fragment key={replyComment.commentId}>
                                <ItemReplyComment
                                    childIndex={1}
                                    lastChild={
                                        comment?.replyComments.length ===
                                        index + 1
                                    }
                                    isLineSide={commentsBlogDetail.length > 0}
                                    comment={replyComment}
                                />
                            </Fragment>
                        );
                    })}
            </div>

            {comment?.replyComments
                ? comment._count.replyComments > comment?.replyComments.length
                : comment._count.replyComments > 0 && (
                    <div className="pl-12 text-sm relative">
                        <div className="border-l-[2px] border-b-[2px] border-gray-200 w-6 h-4 absolute left-[20px] bottom-0 rounded-bl-md -top-[6px]"></div>
                        <div
                            className="cursor-pointer whitespace-nowrap flex items-center select-none hover:underline"
                            onClick={handleGetReplyComments}
                        >
                            <i className="rotate-90 mx-2">
                                <IconArrowTurnUp size={17} />
                            </i>
                            <span className="mr-2">Xem tất cả {comment?._count.replyComments} phản hồi</span>
                            {isLoadingReplyComment && (<span className="w-3 h-3 loading-button"></span>)}
                            
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CardComment;
