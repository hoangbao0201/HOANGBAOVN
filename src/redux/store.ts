import { configureStore } from "@reduxjs/toolkit";
import blogEditSlide from "./pageEditBlogSlide";
import pageHomeSlide from "./pageHomeSlide";
import pageTagDetail from "./pageTagDetail";
import buttonActionSlide from "./buttonActionSlide";
import pageEditBlogSlide from "./pageEditBlogSlide";
import pageBlogDetailSlide from "./pageBlogDetailSlide";

const store = configureStore({
    reducer: {
        blogEdit: blogEditSlide,
        buttonAction: buttonActionSlide,
        pageHome: pageHomeSlide,
        pageEditBlog: pageEditBlogSlide,
        pageTagDetail: pageTagDetail,
        pageBlogDetail: pageBlogDetailSlide
    },
});

export default store;
