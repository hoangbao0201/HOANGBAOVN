import { configureStore } from "@reduxjs/toolkit";
import blogEditSlide from "./pageEditBlogSlide";
import pageHomeSlide from "./pageHomeSlide";
import pageTagDetail from "./pageTagDetail";
import buttonActionSlide from "./buttonActionSlide";
import pageEditBlogSlide from "./pageEditBlogSlide";
import commentsBlogDetailSlide from "./commentsBlogDetailSlide";

const store = configureStore({
    reducer: {
        blogEdit: blogEditSlide,
        buttonAction: buttonActionSlide,
        pageHome: pageHomeSlide,
        pageEditBlog: pageEditBlogSlide,
        pageTagDetail: pageTagDetail,
        commentsBlogDetail: commentsBlogDetailSlide
    },
});

export default store;
