import { GetBlogDetailProps } from "@/lib/services/blog.service";
import { createSlice } from "@reduxjs/toolkit";

export type RootStatePageHome = {
    pageHome: PageHomeProps
}
interface PageHomeProps {
    isLoadPostsPageHome: boolean
    postsPageHome: GetBlogDetailProps[];
}
const initialState: PageHomeProps = {
    isLoadPostsPageHome: true,
    postsPageHome: [],
};

export const counterSlice = createSlice({
    name: "pageHome",
    initialState,
    reducers: {
        setPostsPageHomeRDHandle: (state, action) => {
            state.postsPageHome = action.payload;
            state.isLoadPostsPageHome = false;
        },
        deletePostPageHomeRDHandle: (state, action) => {
            const indexToRemove = state.postsPageHome.findIndex(
                (post) => post.blogId === action.payload
            );

            if (indexToRemove !== -1) {
                state.postsPageHome.splice(indexToRemove, 1);
            }
            state.isLoadPostsPageHome = false;
        },
    },
});

export const { setPostsPageHomeRDHandle, deletePostPageHomeRDHandle } = counterSlice.actions;

export default counterSlice.reducer;
