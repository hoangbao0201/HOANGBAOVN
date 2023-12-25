import { Fragment } from "react";

const SkeletonCardBlog = ({ count = 4 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                return (
                    <Fragment key={i}>
                        <div className="md:px-3 flex mb-4">
                            <div className="w-full bg-white md:rounded-md animate-pulse">
                                <div className="flex px-4 pt-4">
                                    <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <div className="ml-2">
                                        <div className="flex items-center mb-1">
                                            <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-ful w-10/12 mb-1"></div>
                                            <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 ml-2 mb-1"></div>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-48 mb-4"></div>
                                    </div>
                                </div>
                                <div className="px-4 my-3">
                                    <div className="h-8 bg-gray-200 rounded-sm dark:bg-gray-700 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 mb-4"></div>
                                </div>

                                <div className="border-t px-4 pt-3 pb-3 flex items-center justify-between">
                                    <div className="h-8 w-2/6 bg-gray-200 rounded-sm dark:bg-gray-700"></div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
};

export default SkeletonCardBlog;
