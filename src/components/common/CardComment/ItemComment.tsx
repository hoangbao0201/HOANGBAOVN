import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

import clsx from "clsx";
import draftToHtml from "draftjs-to-html";
import { Editor, EditorState } from "draft-js";

import AvatarRank from "../AvatarRank";
import ButtonAction from "./ButtonAction";
import { GetCommentsProps } from "@/lib/services/comment.service";
import { CommentsBlogDetailProps } from "@/redux/commentsBlogDetail";
import FormEditorComment from "@/components/modules/Blog/ContentComment/FormEditorComment";

interface ItemCommentProps {
    user: GetCommentsProps['sender'] | undefined;
    comment: CommentsBlogDetailProps;
    isReply?: boolean;
    childIndex?: number;
    lastChild?: boolean;
    handleSendComment: any
}

const ItemComment = ({
    user,
    comment,
    isReply,
    lastChild,
    handleSendComment
}: ItemCommentProps) => {
    const editorRef = useRef<Editor | null>(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);
    const [isFormEditor, setIsFormEditor] = useState<null | number>(null);

    const handleSend = async () => {
        try {
            setIsLoadingSendComment(true);
            await handleSendComment({
                receiverId: comment.sender.userId,
                parentId: comment?.parentId ? comment?.parentId : comment?.commentId,
                commentText: editorState,
            });

            setIsLoadingSendComment(false);
        } catch (error) {
            setIsLoadingSendComment(false);
        }
    }

    return (
        <div className="relative">
            {lastChild && (<div style={{ height: "calc(100% - 25px)" }} className="border-l-[2.5px] border-gray-200 w-2 absolute translate-y-[5px] left-[20px] top-0 bottom-0"></div>)}
            <div
                className={clsx("flex pb-2 item-comment relative", {
                    "pl-12": isReply
                })}
            >
                {isReply && (
                    <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[88px] absolute left-[20px] -top-[68px] rounded-bl-xl"></div>
                )}

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
                            className="md:w-10 md:h-10 w-9 h-9 block object-cover rounded-full flex-shrink-0"
                        />
                    </Link>
                </AvatarRank>
                <div className="w-full flex-1 ml-2">
                    <div className="border rounded-2xl pt-1 pb-3 px-3 mb-1 bg-gray-100 min-h-[50px]">
                        <div className="flex items-center justify-between">
                            <Link href={`/user/${comment?.sender.username}`}>
                                <span className="font-semibold">
                                    {comment?.sender.name}
                                </span>
                                {/* <span className="text-sm"> - userid: {comment.sender?.userId}</span>
                                <span className="text-sm"> - commentId: {comment?.commentId}</span>
                                <span className="text-sm"> - parentid: {comment?.parentId}</span>
                                <span className="text-sm"> - receiverid: {comment?.receiver?.userId}</span> */}
                            </Link>

                            <ButtonAction
                                senderId={comment.sender.userId}
                                commentId={comment.commentId}
                            />
                        </div>
                        <div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: draftToHtml(
                                        JSON.parse(comment?.commentText || "")
                                    ),
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="px-2 flex">
                        <span
                            onClick={() =>
                                setIsFormEditor(comment?.sender.userId)
                            }
                            className="text-sm font-medium hover:underline cursor-pointer"
                        >
                            Phản hồi
                        </span>
                    </div>
                </div>
            </div>
            <div className={`${isReply && "pl-12"}`}>
                {isFormEditor && (
                    <div className={`pl-12 relative`}>
                        <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-6 h-[88px] absolute left-[20px] -top-[68px] rounded-bl-xl"></div>
                        <FormEditorComment
                            isReply={true}
                            isLoad={isLoadingSendComment}
                            sender={user}
                            receiver={comment.sender}
                            editorRef={editorRef}
                            handleSend={handleSend}
                            isEditorComment={false}
                            setDataFormComment={setEditorState}
                            dataFormComment={editorState}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemComment;
