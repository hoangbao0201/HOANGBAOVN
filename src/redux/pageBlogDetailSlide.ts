import { createSlice } from "@reduxjs/toolkit";
import { GetCommentsProps } from "@/lib/services/comment.service";

export type RootStatePageBlogDetail = {
    pageBlogDetail: PageBlogDetailSlideProps;
};
export interface CommentsPageBlogDetailProps extends GetCommentsProps {
    replyComments?: GetCommentsProps[];
}

export interface PageBlogDetailSlideProps {
    commentsPageBlogDetail: CommentsPageBlogDetailProps[];
    isLoadingCommentsPageBlogDetail: boolean;
}
const initialState: PageBlogDetailSlideProps = {
    commentsPageBlogDetail: [],
    isLoadingCommentsPageBlogDetail: true,
};
export const counterSlice = createSlice({
    name: "pageBlogDetail",
    initialState,
    reducers: {
        addCommentsPageBlogDetailRDHandle: (state, action) => {
            state.commentsPageBlogDetail.unshift(...action.payload);
            state.isLoadingCommentsPageBlogDetail = false;
        },
        setCommentsPageBlogDetailRDHandle: (state, action) => {
            state.commentsPageBlogDetail = action.payload;
            state.isLoadingCommentsPageBlogDetail = false;
        },
        setCommentIdPageBlogDetailRDHandle: (
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
                state.commentsPageBlogDetail[0].commentId =
                    action.payload.commentId;
            } else {
                const foundIndex = state.commentsPageBlogDetail.findIndex(
                    (comment) => comment.commentId === action.payload.parentId
                );
                if (foundIndex !== -1) {
                    const foundComment = state.commentsPageBlogDetail[foundIndex];

                    if (foundComment) {
                        foundComment.replyComments =
                            foundComment?.replyComments || [];
                        foundComment.replyComments[foundComment.replyComments.length - 1].commentId =
                            action.payload.commentId;
                    }
                }
            }
            state.isLoadingCommentsPageBlogDetail = false;
        },
        addReplyCommentPageBlogDetailRDHandle: (state, action) => {
            const foundIndex = state.commentsPageBlogDetail.findIndex(
                (comment) => comment.commentId === action.payload.commentId
            );
            
            if (foundIndex !== -1) {
                const foundComment = state.commentsPageBlogDetail[foundIndex];

                if (foundComment) {
                    foundComment.replyComments =
                        foundComment?.replyComments || [];

                    // Add Comment
                    foundComment.replyComments.push(
                        ...action.payload.replyComments
                    );

                    // Increase Count Reply Comment
                    if(action.payload.replyComments[0].commentId === -1) {
                        foundComment._count.replyComments++;
                    }
                }
            }
        },
        deleteCommentPageBlogDetailRDHandle: (state, action: {
            payload: {
                type: "comment" | "replycomment";
                commentId: number;
                parentId?: number;
            };
        }) => {
            if (action.payload.type === "comment") {
                const indexToRemove = state.commentsPageBlogDetail.findIndex(
                    (comment) => comment.commentId === action.payload.commentId
                );
                if (indexToRemove !== -1) {
                    state.commentsPageBlogDetail.splice(indexToRemove, 1);
                }
            }
            else if(action.payload.parentId) {
                const indexToParentRemove = state.commentsPageBlogDetail.findIndex(
                    (comment) => comment.commentId === action.payload.parentId
                );
                if (indexToParentRemove !== -1) {
                    const foundComment = state.commentsPageBlogDetail[indexToParentRemove];

                    if(foundComment && foundComment.replyComments) {
                        const indexToReplyCommentRemove = foundComment?.replyComments.findIndex(
                            (comment) => comment.commentId === action.payload.commentId
                        );

                        if(indexToReplyCommentRemove !== -1) {
                            foundComment._count.replyComments--;
                            state.commentsPageBlogDetail[indexToParentRemove]?.replyComments?.splice(indexToReplyCommentRemove, 1);
                        }
                    }
                }
            }
        },
        setIsLoadingCommentsPageBlogDetailRDHandle: (state, action) => {
            state.isLoadingCommentsPageBlogDetail = action.payload;
        },
        sendCommentPageBlogDetailRDHandle: (state, action) => {
            const { blogId, receiverId, parentId, commentText } =
                action.payload;
            if (receiverId && parentId) {
            }
            state.isLoadingCommentsPageBlogDetail = action.payload;
        },
    },
});

export const {
    setCommentsPageBlogDetailRDHandle,
    addCommentsPageBlogDetailRDHandle,
    setCommentIdPageBlogDetailRDHandle,
    addReplyCommentPageBlogDetailRDHandle,
    setIsLoadingCommentsPageBlogDetailRDHandle,
    deleteCommentPageBlogDetailRDHandle,
    sendCommentPageBlogDetailRDHandle,
} = counterSlice.actions;

export default counterSlice.reducer;


// [
//     { id: 1, cout: 7 },
//     { id: 2, cout: 3 }
//     { id: 3, cout: 5 }
//     { id: 4, cout: 6 }
// ]