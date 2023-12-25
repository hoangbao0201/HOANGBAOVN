import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AvatarRank from "@/components/common/AvatarRank";
import EditorComment from "@/components/modules/Blog/ContentComment/EditorComment";

interface FormEditorCommentProps {
    user: any;
    isLoad: boolean
    editorRef: any;
    handleSend: any;
    isEditorComment: boolean;
    dataFormComment: any;
    setDataFormComment: any;
}
const FormEditorComment = ({
    editorRef,
    user,
    isLoad,
    handleSend,
    isEditorComment,
    dataFormComment,
    setDataFormComment,
}: FormEditorCommentProps) => {
    const [isFormEditor, setIsFormEditor] = useState(isEditorComment);
    return (
        <div className="flex mb-5">
            <AvatarRank rank={1}>
                <Link href={`/`}>
                    <Image
                        width={60}
                        height={60}
                        alt="ảnh người dùng"
                        src={"/static/images/default/avatar_user_sm.jpg"}
                        className="md:w-10 md:h-10 w-9 h-9 block object-cover rounded-full flex-shrink-0"
                    />
                </Link>
            </AvatarRank>
            <div className="w-full flex-1 ml-2">
                <div
                    className="border rounded-md py-3 px-3 mb-2 bg-gray-100 min-h-[50px] transition-all"
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
                        value={user?.name || " "}
                    />
                    <button
                        onClick={handleSend}
                        className="border text-white bg-indigo-600 rounded-md ml-auto py-1 px-3 min-w-[80px]"
                    >
                        Gửi
                        {isLoad && (
                            <span
                                style={{ borderTop: "2px solid white" }}
                                className="w-3 h-3 ml-2 loading-button"
                            ></span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormEditorComment;
