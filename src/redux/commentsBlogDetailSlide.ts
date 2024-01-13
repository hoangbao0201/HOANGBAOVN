import { createSlice } from "@reduxjs/toolkit";
import { GetCommentsProps } from "@/lib/services/comment.service";

export type RootStateCommentsBlogDetail = {
    commentsBlogDetail: CommentsBlogDetailSlideProps;
};
export interface CommentsBlogDetailProps extends GetCommentsProps {
    replyComments?: GetCommentsProps[];
}

export interface CommentsBlogDetailSlideProps {
    commentsBlogDetail: CommentsBlogDetailProps[];
    isLoadingBlogDetail: boolean;
}
const initialState: CommentsBlogDetailSlideProps = {
    commentsBlogDetail: [],
    isLoadingBlogDetail: true,
};
export const counterSlice = createSlice({
    name: "commentsBlogDetail",
    initialState,
    reducers: {
        addCommentsBlogDetailRDHandle: (state, action) => {
            state.commentsBlogDetail.unshift(...action.payload);
            state.isLoadingBlogDetail = false;
        },
        setCommentsBlogDetailRDHandle: (state, action) => {
            state.commentsBlogDetail = action.payload;
            state.isLoadingBlogDetail = false;
        },
        setCommentIdBlogDetailRDHandle: (
            state,
            action: {
                payload: {
                    type: "comment" | "replycomment";
                    commentId: number;
                    parentId?: number;
                };
            }
        ) => {
            if (action.payload.type === "comment") {
                state.commentsBlogDetail[0].commentId =
                    action.payload.commentId;
            } else {
                const foundIndex = state.commentsBlogDetail.findIndex(
                    (comment) => comment.commentId === action.payload.parentId
                );
                if (foundIndex !== -1) {
                    const foundComment = state.commentsBlogDetail[foundIndex];

                    if (foundComment) {
                        foundComment.replyComments =
                            foundComment?.replyComments || [];
                        foundComment.replyComments[-1].commentId =
                            action.payload.commentId;
                    }
                }
            }
            state.isLoadingBlogDetail = false;
        },
        addReplyCommentsBlogDetailRDHandle: (state, action) => {
            const foundIndex = state.commentsBlogDetail.findIndex(
                (comment) => comment.commentId === action.payload.commentId
            );

            if (foundIndex !== -1) {
                const foundComment = state.commentsBlogDetail[foundIndex];

                if (foundComment) {
                    foundComment.replyComments =
                        foundComment?.replyComments || [];
                    foundComment.replyComments.push(
                        ...action.payload.replyComments
                    );
                }
            }
        },
        deleteCommentsBlogDetailRDHandle: (state, action) => {
            const indexToRemove = state.commentsBlogDetail.findIndex(
                (comment) => comment.commentId === action.payload.commentId
            );

            if (indexToRemove !== -1) {
                state.commentsBlogDetail.splice(indexToRemove, 1);
            }
        },
        setIsLoadingCommentsBlogDetailRDHandle: (state, action) => {
            state.isLoadingBlogDetail = action.payload;
        },
        sendCommentBlogDetailRDHandle: (state, action) => {
            const { blogId, receiverId, parentId, commentText } =
                action.payload;
            if (receiverId && parentId) {
            }
            state.isLoadingBlogDetail = action.payload;
        },
    },
});

export const {
    setCommentsBlogDetailRDHandle,
    addCommentsBlogDetailRDHandle,
    setCommentIdBlogDetailRDHandle,
    addReplyCommentsBlogDetailRDHandle,
    setIsLoadingCommentsBlogDetailRDHandle,
    deleteCommentsBlogDetailRDHandle,
    sendCommentBlogDetailRDHandle,
} = counterSlice.actions;

export default counterSlice.reducer;
