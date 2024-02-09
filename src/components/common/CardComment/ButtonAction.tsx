import { useSession } from "next-auth/react";

import { useDispatch, useSelector } from "react-redux";

import DropdownButton from "../DropdownButton";
import commentService from "@/lib/services/comment.service";
import IconEcllipsis from "@/components/modules/icons/IconEllipsis";
import { deleteCommentPageBlogDetailRDHandle } from "@/redux/pageBlogDetailSlide";
import { useState } from "react";
import Modal from "../Modal";
import { setButonLoadingRDHandle } from "@/redux/buttonActionSlide";

interface ButtonActionProps {
    parentId?: number;
    commentId: number;
    senderId: number;
}
const ButtonAction = ({ parentId, commentId, senderId }: ButtonActionProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const { nameButtonAction } = useSelector(
        (state: any) => state.buttonAction
    );
    const [isOptions, setIsOptions] = useState(false);
    const [isFormDeleteBlog, setIsFormDeleteBlog] = useState(false);

    const handleEditComment = async () => {
        try {
        } catch (error) {}
    };
    const handleDeleteComment = async () => {
        if (!session || status !== "authenticated") {
            return;
        }
        dispatch(setButonLoadingRDHandle("button_delete_comment"));

        try {
            const commentRes = await commentService.deleteComment({
                commentId: commentId,
                token: session?.backendTokens.accessToken,
            });

            if (commentRes.success) {
                dispatch(
                    deleteCommentPageBlogDetailRDHandle({
                        type: parentId ? "replycomment" : "comment",
                        commentId: commentId,
                        parentId: parentId,
                    })
                );
            }

            dispatch(setButonLoadingRDHandle(""));
            setIsFormDeleteBlog(false);
        } catch (error) {}
    };

    return (
        <>
            <DropdownButton
                isOptions={isOptions}
                setIsOptions={setIsOptions}
                className="top-full right-0 translate-x-1/2 shadow-lg border rounded-md bg-white dark:bg-gray-800"
                content={
                    <div className="py-2 px-2 min-w-[300px] select-none">
                        {status === "loading" ? (
                            <div className="text-center">Loading</div>
                        ) : (
                            <>
                                {senderId === session?.user.userId && (
                                    <>
                                        <div
                                            onClick={handleEditComment}
                                            className="px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/30 cursor-pointer"
                                        >
                                            Chỉnh sửa bài luận
                                        </div>
                                        <div
                                            onClick={() => {
                                                setIsFormDeleteBlog(true);
                                                setIsOptions(false);
                                            }}
                                            className="px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/30 cursor-pointer"
                                        >
                                            Xóa bình luận
                                        </div>
                                    </>
                                )}

                                <div className="px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/30 cursor-pointer">
                                    Báo cáo bình luận
                                </div>
                            </>
                        )}
                    </div>
                }
            >
                <div className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/30 block">
                    <IconEcllipsis className="fill-gray-700" />
                </div>
            </DropdownButton>
            <Modal
                isOpen={isFormDeleteBlog}
                size="medium"
                setIsOpen={setIsFormDeleteBlog}
                title="Xóa bình luận?"
            >
                <div className="">
                    Bạn không thể khôi phục bình luận này xóa đi.
                </div>

                <div className="text-right mt-4">
                    <button
                        title="Nút hủy phương thức"
                        onClick={() => setIsFormDeleteBlog(false)}
                        className="py-2 px-3 rounded-md border text-black bg-white hover:bg-gray-200 min-w-20"
                    >
                        Hủy
                    </button>
                    <button
                        title="Nút xóa bình luận"
                        onClick={handleDeleteComment}
                        className="py-2 px-3 rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 min-w-20 ml-2"
                    >
                        Xóa{" "}
                        {nameButtonAction === "button_delete_comment" && (
                            <span
                                style={{ borderColor: "white" }}
                                className="w-3 h-3 loading-button"
                            ></span>
                        )}
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ButtonAction;
