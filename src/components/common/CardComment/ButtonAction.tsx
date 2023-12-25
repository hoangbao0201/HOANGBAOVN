import { useSession } from "next-auth/react";

import { useDispatch } from "react-redux";

import DropdownButton from "../DropdownButton";
import commentService from "@/lib/services/comment.service";
import IconEcllipsis from "@/components/modules/icons/IconEllipsis";
import { deleteCommentsBlogDetailRDHandle } from "@/redux/commentsBlogDetail";

interface ButtonActionProps {
    commentId: number
    senderId: number
}
const ButtonAction = ({ commentId, senderId } : ButtonActionProps) => {

    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    const handleEditComment = async () => {
        try {
            
        } catch (error) {
            
        }
    }
    const handleDeleteComment = async () => {
        if(!session || status !== "authenticated") {
            return;
        }
        try {
            const commentRes = await commentService.deleteComment({ commentId: commentId, token: session?.backendTokens.accessToken });

            if(commentRes.success) {
                dispatch(deleteCommentsBlogDetailRDHandle({ commentId: commentId }));
            }
        } catch (error) {
            
        }
    }

    return (
        <DropdownButton
            className="top-full right-0 shadow-lg border rounded-md bg-white"
            content={
                <div className="py-2 px-2 min-w-[300px] select-none">
                    {
                        status === "loading" ? (
                            <div className="text-center">Loading</div>
                        ) : (
                            <>
                                {
                                    senderId === session?.user.userId && (
                                        <>
                                            <div onClick={handleEditComment} className="px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
                                                Chỉnh sửa bài luận
                                            </div>
                                            <div onClick={handleDeleteComment} className="px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
                                                Xóa bình luận
                                            </div>
                                        </>
                                    )
                                }
                                
                                <div className="px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
                                    Báo cáo bình luận
                                </div>
                            </>
                        )
                    }
                </div>
            }
        >
            <div className="cursor-pointer p-1 rounded-full hover:bg-gray-200 block">
                <IconEcllipsis />
            </div>
        </DropdownButton>
    )
}

export default ButtonAction;