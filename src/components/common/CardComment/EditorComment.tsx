import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";


import { EditorState, Modifier } from "draft-js";
import Editor from "@draft-js-plugins/editor";

import AvatarRank from "../AvatarRank";
// import createMentionPlugin, { MentionSuggestions } from "@draft-js-plugins/mention";

// const mentionPlugin = createMentionPlugin({
//     mentionTrigger: ["@"],
//     mentionComponent: (mentionProps) => (
//         <span>{mentionProps.mention.get("name")}</span>
//     ),
// });

const EditorComment = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const editorRef = useRef<Editor | null>(null);
    const focusEditor = () => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const handleAddMention = () => {
        
    }    

    return (
        <div>
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
                        className="border rounded-md cursor-text py-3 px-3 mb-2 bg-gray-100"
                        onClick={focusEditor}
                    >
                        <Editor
                            ref={editorRef}
                            // plugins={[mentionPlugin]}
                            editorState={editorState}
                            onChange={setEditorState}
                        />
                        {/* <MentionSuggestions onAddMention={handleAddMention} suggestions={[]} /> */}
                    </div>
                    <div className="flex space-x-2">
                        <input className="w-full border px-3 py-2 rounded-md outline-none" />
                        <button onClick={handleAddMention} className="border text-white bg-indigo-600 rounded-md ml-auto py-1 px-3 min-w-[80px]">
                            Thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorComment;
