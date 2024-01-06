import {
    Dispatch,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
    MentionData,
    defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";

const mentions: MentionData[] = [
    {
        name: "Matthew Russell",
        link: "https://twitter.com/mrussell247",
        avatar: "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
    },
    {
        name: "Julian Krispel-Samsel",
        link: "https://twitter.com/juliandoesstuff",
        avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
    },
    {
        name: "Jyoti Puri",
        link: "https://twitter.com/jyopur",
        avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
    },
    {
        name: "Max Stoiber",
        link: "https://twitter.com/mxstbr",
        avatar: "https://avatars0.githubusercontent.com/u/7525670?s=200&v=4",
    },
    {
        name: "Nik Graf",
        link: "https://twitter.com/nikgraf",
        avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
    },
    {
        name: "Pascal Brandt",
        link: "https://twitter.com/psbrandt",
        avatar: "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
    },
];

interface EditorCommentProps {
    editor: RefObject<Editor> | null;
    placeholder?: string;
    editorState: EditorState;
    setEditorState: Dispatch<React.SetStateAction<EditorState>>;
}
const EditorComment = ({
    editor,
    placeholder,
    editorState,
    setEditorState,
}: EditorCommentProps) => {
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);

    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin();
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

    const onOpenChange = useCallback((_open: boolean) => {
        setOpen(_open);
    }, []);
    const onSearchChange = useCallback(({ value }: { value: string }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);

    const focusEditor = () => {
        if (editor?.current) {
            editor.current.focus();
        }
    };
    useEffect(() => {
        focusEditor();
    }, []);

    return (
        <>
            <Editor
                ref={editor}
                editorKey={"editor"}
                plugins={plugins}
                editorState={editorState}
                placeholder={placeholder || ""}
                onChange={(editorState) => setEditorState(editorState)}
            />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                onAddMention={() => {
                    // get the mention object selected
                }}
            />
        </>
    );
};

export default EditorComment;
