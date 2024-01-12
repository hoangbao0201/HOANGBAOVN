import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import clsx from "clsx";
import draftToHtml from "draftjs-to-html";

import AvatarRank from "../AvatarRank";
import ButtonAction from "./ButtonAction";
import { GetCommentsProps } from "@/lib/services/comment.service";
import { CommentsBlogDetailProps } from "@/redux/commentsBlogDetailSlide";

interface ItemCommentProps {
    user: GetCommentsProps['sender'] | undefined;
    comment: CommentsBlogDetailProps;
    isReply?: boolean;
    childIndex?: number;
    lastChild?: boolean;
    setReceiver: Dispatch<SetStateAction<{
        receiverId: number | null
    }>>
}

const ItemComment = ({
    user,
    comment,
    isReply,
    setReceiver,
    lastChild,
}: ItemCommentProps) => {


    return (
        <div className="relative group">
            <div
                className={clsx("flex pb-2 item-comment relative", {
                    "pl-12": isReply
                })}
            >
                {isReply && (
                    <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[80px] absolute left-[20px] -top-[60px] rounded-bl-xl"></div>
                )}

                <div className="flex-shrink-0">
                    <AvatarRank rank={1}>
                        <Link href={`/`}>
                            <Image
                                width={60}
                                height={60}
                                alt={`Ảnh người dùng ${comment?.sender.name}`}
                                src={
                                    comment?.sender.avatarUrl ||
                                    "/static/images/default/avatar_user_sm.jpg"
                                }
                                className={`${isReply ? "md:w-8 md:h-8 w-8 h-8" : "md:w-10 md:h-10 w-9 h-9"} block object-cover rounded-full`}
                            />
                        </Link>
                    </AvatarRank> 
                </div>
                <div className="ml-2 flex-1">
                    <div className="flex items-center w-full">

                        <div className="border rounded-[20px] py-[8px] px-[12px] mb-1 bg-gray-100 dark:bg-slate-700 min-h-[50px]">
                            <div className="flex items-center justify-between">
                                <Link href={`/user/${comment?.sender.username}`}>
                                    <span className="font-semibold text-[15px]">
                                        {comment?.sender.name}
                                    </span>
                                    {/* <span className="text-sm"> - userid: {comment.sender?.userId}</span>
                                    <span className="text-sm"> - commentId: {comment?.commentId}</span>
                                    <span className="text-sm"> - parentid: {comment?.parentId}</span>
                                    <span className="text-sm"> - receiverid: {comment?.receiver?.userId}</span> */}
                                </Link>
                            </div>
                            <div className="overflow-hidden">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: draftToHtml(
                                            JSON.parse(comment?.commentText || "")
                                        ),
                                    }}
                                ></div>
                            </div>
                        </div>

                        <span className="pl-1 group-hover:opacity-100 opacity-0 transition-all">
                            <ButtonAction
                                senderId={comment.sender.userId}
                                commentId={comment.commentId}
                            />
                        </span>
                    </div>

                    <div className="px-2 flex">
                        <span
                            onClick={() => setReceiver({
                                receiverId: comment?.sender.userId,
                            })}
                            className="text-sm font-medium hover:underline cursor-pointer"
                        >
                            Phản hồi
                        </span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ItemComment;
