import { GetBlogDetailProps } from "@/lib/services/blog.service";
import { createSlice } from "@reduxjs/toolkit";

export type RootStatePageTagDetail = {
    pageTagDetail: PageTagDetailProps
}
interface PageTagDetailProps {
    isLoadPostsPageTagDetail: boolean
    postsPageTagDetail: GetBlogDetailProps[];
}
const initialState: PageTagDetailProps = {
    isLoadPostsPageTagDetail: true,
    postsPageTagDetail: [],
};

export const counterSlice = createSlice({
    name: "pageTagDetail",
    initialState,
    reducers: {
        setPostsPageTagDetailRDHandle: (state, action) => {
            state.postsPageTagDetail = action.payload;
            state.isLoadPostsPageTagDetail = false;
        },
        setLoadPostsPageTagDetail: (state, action) => {
            state.isLoadPostsPageTagDetail = action.payload;
        },
        deletePostPageTagDetailRDHandle: (state, action) => {
            const indexToRemove = state.postsPageTagDetail.findIndex(
                (post) => post.blogId === action.payload
            );

            if (indexToRemove !== -1) {
                state.postsPageTagDetail.splice(indexToRemove, 1);
            }
            state.isLoadPostsPageTagDetail = false;
        },
    },
});

export const { setPostsPageTagDetailRDHandle, deletePostPageTagDetailRDHandle, setLoadPostsPageTagDetail } = counterSlice.actions;

export default counterSlice.reducer;
