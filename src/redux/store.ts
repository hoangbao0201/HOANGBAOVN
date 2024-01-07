import { configureStore } from "@reduxjs/toolkit";
import blogEditSlide from "./blogEditSlide";
import pageHomeSlide from "./pageHomeSlide";
import pageTagDetail from "./pageTagDetail";
import buttonActionSlide from "./buttonActionSlide";
import commentsBlogDetailSlide from "./commentsBlogDetailSlide";

const store = configureStore({
    reducer: {
        blogEdit: blogEditSlide,
        buttonAction: buttonActionSlide,
        pageHome: pageHomeSlide,
        pageTagDetail: pageTagDetail,
        commentsBlogDetail: commentsBlogDetailSlide
    },
});

export default store;
