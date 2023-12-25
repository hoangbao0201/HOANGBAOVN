import { createSlice } from "@reduxjs/toolkit";
import { TagProps } from "@/lib/services/blog.service";


export interface EditBlogSlideProps {
    blogEdit: {
        blogId: number;
        slug: string;
        title: string;
        summary: string;
        content: string;
        thumbnailUrl: string;
        createdAt: Date;
        updatedAt: Date;
        blogTags: { tags: TagProps }[];
        blogImages: { blogImageId: number, urlImage: string }[]
    } | null,

    isSave: boolean
}
const initialState: EditBlogSlideProps = {
    blogEdit: null,
    isSave: true
};

export const counterSlice = createSlice({
    name: "blogEdit",
    initialState,
    reducers: {
        setBlogEditRDHandle: (state, action) => {
            state.blogEdit = action.payload;
        },
        setIsSaveBlogEditRDHandle: (state, action) => {
            state.isSave = action.payload;
        },
        addImageContentBlogEditRDHandle: (state, action) => {
            if(state.blogEdit) {
                state.blogEdit.content += action.payload;
            }
            state.isSave = false;
        },
        addImageBlogEditRDHandle: (state, action) => {
            if(state.blogEdit) {
                state.blogEdit.blogImages.push(action.payload)
            }
            state.isSave = false;
        },
    },
});

export const { setBlogEditRDHandle, setIsSaveBlogEditRDHandle, addImageContentBlogEditRDHandle, addImageBlogEditRDHandle } =
    counterSlice.actions;

export default counterSlice.reducer;
