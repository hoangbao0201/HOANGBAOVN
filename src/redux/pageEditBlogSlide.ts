import { createSlice } from "@reduxjs/toolkit";
import { TagProps } from "@/lib/services/blog.service";

export type RootStatePageEditBlog = {
    pageEditBlog: PageEditBlogSlideProps
}
export interface PageEditBlogSlideProps {
    blogEdit: {
        blogId?: number
        slug: string
        title: string
        summary: string
        content: string
        published: boolean
        thumbnailUrl: string
        createdAt?: Date
        updatedAt?: Date
        blogTags: { tags: TagProps }[]
        blogImages: { blogImageId: number, urlImage: string }[]
    },

    isSave: boolean
}
const initialState: PageEditBlogSlideProps = {
    blogEdit: {
        blogId: undefined,
        slug: "",
        title: "",
        summary: "",
        content: "",
        published: true,
        thumbnailUrl: "",
        blogTags: [],
        blogImages: []
    },
    isSave: true
};

export const counterSlice = createSlice({
    name: "pageEditBlogSlide",
    initialState,
    reducers: {
        setBlogEditRDHandle: (state, action) => {
            if(!action.payload) {
                state.blogEdit = {
                    blogId: undefined,
                    slug: "",
                    title: "",
                    summary: "",
                    content: "",
                    published: true,
                    thumbnailUrl: "",
                    blogTags: [],
                    blogImages: []
                };
            }
            else {
                state.blogEdit = action.payload;
            }
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
            if(state.blogEdit && state.blogEdit.blogImages) {
                state.blogEdit.blogImages.push(action.payload)
            }
            state.isSave = false;
        },
    },
});

export const { setBlogEditRDHandle, setIsSaveBlogEditRDHandle, addImageContentBlogEditRDHandle, addImageBlogEditRDHandle } =
    counterSlice.actions;

export default counterSlice.reducer;
