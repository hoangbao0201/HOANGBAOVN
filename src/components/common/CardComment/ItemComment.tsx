import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

import clsx from "clsx";
import draftToHtml from "draftjs-to-html";
import { Editor, EditorState } from "draft-js";

import AvatarRank from "../AvatarRank";
import ButtonAction from "./ButtonAction";
import { CommentsBlogDetailProps } from "@/redux/commentsBlogDetail";
import FormEditorComment from "@/components/modules/Blog/ContentComment/FormEditorComment";

interface ItemCommentProps {
    user: any;
    comment: CommentsBlogDetailProps;
    isReply?: boolean;
    childIndex?: number;
    lastChild?: boolean;
}

const ItemComment = ({
    user,
    comment,
    isReply,
    childIndex,
    lastChild,
}: ItemCommentProps) => {
    const editorRef = useRef<Editor | null>(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);
    const [isFormEditor, setIsFormEditor] = useState<null | number>(null);
    const [isLoadingReplyComment, setIsLoadingReplyComment] = useState(false);

    const handleSendComment = () => {};

    return (
        <>
            <div
                className={clsx("flex pb-2 relative item-comment", {
                    "pl-12": childIndex == 1,
                })}
            >
                {isReply && !lastChild && (
                    <div className="border-l-2 border-gray-200 h-full absolute left-[20px] top-1 bottom-0"></div>
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
            {isFormEditor && (
                <div className="pl-12 relative">
                    <div className="border-l-[2.5px] border-gray-200 h-[75%] absolute left-[21px] -top-[65px] bottom-0"></div>
                    <div className="border-l-[2.5px] border-b-[2.5px] border-gray-200 w-7 h-4 absolute left-[21px] top-2 rounded-bl-lg"></div>
                    <FormEditorComment
                        isLoad={isLoadingSendComment}
                        user={user}
                        editorRef={editorRef}
                        handleSend={handleSendComment}
                        isEditorComment={false}
                        setDataFormComment={setEditorState}
                        dataFormComment={editorState}
                    />
                </div>
            )}
        </>
    );
};

export default ItemComment;
