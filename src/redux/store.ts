import { configureStore } from "@reduxjs/toolkit";
import blogEditSlide from "./blogEditSlide";
import commentsBlogDetail from "./commentsBlogDetail";

const store = configureStore({
    reducer: {
        blogEdit: blogEditSlide,
        commentsBlogDetail: commentsBlogDetail
    },
});

export default store;
