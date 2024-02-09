import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { EditorState } from "draft-js";

import { UserType } from "@/lib/types";
import AvatarRank from "@/components/common/AvatarRank";
import EditorComment from "@/components/modules/Blog/ContentComment/EditorComment";
import { GetCommentsProps } from "@/lib/services/comment.service";

interface FormEditorCommentProps {
    sender: GetCommentsProps['sender'] | undefined
    receiver: GetCommentsProps['receiver']
    isLoad: boolean
    isReply: boolean
    editorRef: any;
    handleSend: ({receiverId, parentId, commentText}: {
        receiverId?: number;
        parentId?: number;
        commentText: EditorState;
    }) => void;
    isEditorComment: boolean;
    dataFormComment: any;
    setDataFormComment: any;
}
const FormEditorComment = ({
    editorRef,
    sender,
    receiver,
    isLoad,
    isReply,
    handleSend,
    isEditorComment,
    dataFormComment,
    setDataFormComment,
}: FormEditorCommentProps) => {
    const [isFormEditor, setIsFormEditor] = useState(isEditorComment);
    return (
        <div className="flex py-2">
            <div className="flex-shrink-0">
                <AvatarRank rank={1}>
                    <Link aria-label={`${sender?.name}`} href={`/`}>
                        <Image
                            width={60}
                            height={60}
                            alt="ảnh người dùng"
                            src={"/static/images/default/avatar_user_sm.jpg"}
                            className={`${isReply ? "md:w-8 md:h-8 w-8 h-8" : "md:w-10 md:h-10 w-9 h-9"} block object-cover rounded-full`}
                        />
                    </Link>
                </AvatarRank>
            </div>
            <div className="w-full flex-1 flex-shrink-0 ml-2">
                {/* {isReply && (
                    <div className="bg-gray-200 border px-3 py-1 rounded-t-md">
                        <span className="font-semibold">Người nhận: {receiver?.name}</span>
                        <span className=""> - id: {receiver?.userId}</span>
                    </div>
                )} */}
                <div
                    className="border rounded-md py-3 px-3 mb-2 bg-gray-100 dark:bg-slate-700 min-h-[50px] transition-all"
                    onClick={() => setIsFormEditor(true)}
                >
                    {isFormEditor ? (
                        <EditorComment
                            editor={editorRef}
                            placeholder="Viết bình luận..."
                            editorState={dataFormComment}
                            setEditorState={setDataFormComment}
                        />
                    ) : (
                        <span className="text-gray-500">Viết bình luận...</span>
                    )}
                </div>
                <div className="flex space-x-2">
                    <input
                        className="w-full border px-3 py-2 text-gray-500 rounded-md outline-none"
                        disabled={true}
                        value={sender?.name || " "}
                    />
                    <button
                        title="Nút gởi tin nhắn"
                        onClick={() => handleSend({ commentText: dataFormComment })}
                        className={`${isLoad && "pointer-events-none"} border text-white bg-indigo-600 rounded-md ml-auto py-1 px-3 min-w-[80px]`}
                    >
                        Gửi
                        {/* {isLoad && (
                            <span
                                style={{ borderTop: "2px solid white" }}
                                className="w-3 h-3 ml-2 loading-button"
                            ></span>
                        )} */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormEditorComment;
