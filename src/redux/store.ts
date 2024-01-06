import { configureStore } from "@reduxjs/toolkit";
import blogEditSlide from "./blogEditSlide";
import buttonActionSlide from "./buttonActionSlide";
import pageHomeSlide from "./pageHomeSlide";
import commentsBlogDetailSlide from "./commentsBlogDetailSlide";

const store = configureStore({
    reducer: {
        blogEdit: blogEditSlide,
        buttonAction: buttonActionSlide,
        pageHome: pageHomeSlide,
        commentsBlogDetail: commentsBlogDetailSlide
    },
});

export default store;
