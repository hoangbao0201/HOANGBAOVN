import { Fragment, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ItemComment from "./ItemComment";
import IconArrowTurnUp from "@/components/modules/icons/IconArrowTurnUp";
import commentService, { GetCommentsProps } from "@/lib/services/comment.service";
import {
    CommentsBlogDetailProps,
    RootStateCommentsBlogDetail,
    addReplyCommentsBlogDetailRDHandle,
} from "@/redux/commentsBlogDetail";

interface CardCommentProps {
    user: GetCommentsProps['sender'] | undefined
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
                query: `?blogId=${comment?.blogId}&parentId=${comment?.commentId}&take=10&skip=${(comment?.replyComments?.length || 0)}`,
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
        <div className="relative item-comment mb-3">
            <ItemComment
                user={user}
                comment={comment}
                handleSendComment={handleSendComment}
                isReply={false}
                lastChild={comment._count.replyComments>0 || (comment?.replyComments && comment?.replyComments?.length > 0)}
            />

            <div className="relative">
                {comment?.replyComments &&
                    comment?.replyComments.map((replyComment, index) => {
                        return (
                            <Fragment key={replyComment.commentId}>
                                <ItemComment
                                    user={user}
                                    comment={replyComment}
                                    lastChild={comment?.replyComments?.length !== index+1}
                                    handleSendComment={handleSendComment}
                                    isReply={true}
                                />
                            </Fragment>
                        );
                    })}
            </div>

            {(comment?.replyComments
                ? (comment._count.replyComments > comment?.replyComments.length) : (comment?._count.replyComments > 0)) && (
                    <div className="pl-12 text-sm relative">
                        <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[78px] absolute left-[20px] -top-[68px] rounded-bl-xl"></div>
                        <div
                            className="cursor-pointer whitespace-nowrap flex items-center select-none hover:underline"
                            onClick={handleGetReplyComments}
                        >
                            <i className="rotate-90 mx-2">
                                <IconArrowTurnUp size={17} />
                            </i>
                            <span className="mr-2">Xem tất cả {comment?._count.replyComments - (comment?.replyComments?.length || 0)} phản hồi</span>
                            {isLoadingReplyComment && (<span className="w-3 h-3 loading-button"></span>)}
                            
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CardComment;
