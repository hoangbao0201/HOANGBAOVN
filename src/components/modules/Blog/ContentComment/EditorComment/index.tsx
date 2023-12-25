import { Editor, EditorState } from "draft-js";
import { Dispatch, RefObject, useEffect } from "react";

interface EditorCommentProps {
    editor: RefObject<Editor> | null
    placeholder?: string
    editorState: EditorState
    setEditorState: Dispatch<React.SetStateAction<EditorState>>;
}
const EditorComment = ({ editor, placeholder, editorState, setEditorState }: EditorCommentProps) => {

    const focusEditor = () => {
        if (editor?.current) {
            editor.current.focus();
        }
    };
    useEffect(() => {
        focusEditor();
    }, [])

    return (
        <Editor
            ref={editor}
            editorState={editorState}
            placeholder={placeholder || ""}
            onChange={(editorState) =>
                setEditorState(editorState)
            }
        />
    )
}

export default EditorComment;