import Link from "next/link";
import { useSession } from "next-auth/react";

import DropdownButton from "../DropdownButton";
import IconEcllipsis from "@/components/modules/icons/IconEllipsis";
import Modal from "../Modal";
import { useRef, useState } from "react";
import { useClickOutSide } from "@/hook/useClickOutSide";
import blogService from "@/lib/services/blog.service";
import { useDispatch, useSelector } from "react-redux";
import { setButonLoadingRDHandle } from "@/redux/buttonActionSlide";
import { deletePostPageHomeRDHandle } from "@/redux/pageHomeSlide";

type DropdownButtonHandle = React.ElementRef<typeof DropdownButton>;

interface ButtonActionProps {
    blogId: number;
    authorId: number;
}
const ButtonAction = ({ blogId, authorId }: ButtonActionProps) => {
    const dispatch = useDispatch();
    const { nameButtonAction } = useSelector((state: any) => state.buttonAction);
    const { data: session, status } = useSession();

    const [isOptions, setIsOptions] = useState(false);
    const [isFormDeleteBlog, setIsFormDeleteBlog] = useState(false);

    const handleDeletePost = async () => {
        dispatch(setButonLoadingRDHandle("button_delete_post"))
        if (!session || status !== "authenticated") {
            return;
        }
        try {
            const blogRes = await blogService.delete({
                blogId: blogId,
                token: session.backendTokens.accessToken,
            });

            if(blogRes?.success) {
                dispatch(deletePostPageHomeRDHandle(blogId));
            }

            dispatch(setButonLoadingRDHandle(""))
            setIsFormDeleteBlog(false);
        } catch (error) {
            dispatch(setButonLoadingRDHandle(""))
            setIsFormDeleteBlog(false);
        }
    };

    return (
        <>
            <DropdownButton
                isOptions={isOptions}
                setIsOptions={setIsOptions}
                className="top-full right-0 shadow-lg border rounded-md bg-white dark:bg-slate-800"
                content={
                    <div className="py-2 px-2 min-w-[300px]">
                        {status === "loading" ? (
                            <div className="text-center">Loading</div>
                        ) : (
                            <>
                                <div className="px-2 py-2 rounded-md hover:bg-gray-200 hover:dark:bg-white/30 cursor-pointer">
                                    Báo cáo bài viết
                                </div>
                                {authorId === session?.user.userId && (
                                    <>
                                        <Link
                                            href={`/creator/post/${blogId}/edit`}
                                        >
                                            <div className="px-2 py-2 rounded-md hover:bg-gray-200 hover:dark:bg-white/30 cursor-pointer">
                                                Chỉnh sửa bài viết
                                            </div>
                                        </Link>
                                        <div
                                            onClick={() => {
                                                setIsFormDeleteBlog(true);
                                                setIsOptions(false);
                                            }}
                                            className="px-2 py-2 rounded-md hover:bg-gray-200 hover:dark:bg-white/30 cursor-pointer"
                                        >
                                            Xóa bài viết
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                }
            >
                <div className="cursor-pointer p-1 rounded-full hover:bg-white/30 block">
                    <IconEcllipsis className="dark:fill-white"/>
                </div>
            </DropdownButton>
            <Modal
                isOpen={isFormDeleteBlog}
                size="medium"
                setIsOpen={setIsFormDeleteBlog}
                title="Chuyển vào thùng rác?"
            >
                <div className="">
                    Các mục trong thùng rác sẽ tự động bị xóa sau 30 ngày. Bạn
                    có thể xóa các mục này khỏi thùng rác sớm hơn bằng cách đi
                    đến nhật ký hoạt động trong phần cài đặt.
                </div>

                <div className="text-right mt-4">
                    <button
                        onClick={() => setIsFormDeleteBlog(false)}
                        className="py-2 px-3 rounded-md border text-black bg-white hover:bg-gray-200 min-w-20"
                    >
                        Hủy
                    </button>
                    <button onClick={handleDeletePost} className="py-2 px-3 rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 min-w-20 ml-2">
                        Xóa {nameButtonAction === "button_delete_post" && (<span style={{ borderColor: "white" }} className="w-3 h-3 loading-button"></span>)}
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ButtonAction;
