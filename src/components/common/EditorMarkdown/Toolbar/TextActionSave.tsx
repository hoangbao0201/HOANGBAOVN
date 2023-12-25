import { PluginProps } from "react-markdown-editor-lite";

const TextActionSave = (props: PluginProps) => {

    return (
        <span
            className="button button-type-counter"
            title={`${props.config.start}`}
        >
            {props.config.start}
        </span>
    );
};

TextActionSave.align = "left";
TextActionSave.pluginName = "counter";

export default TextActionSave;
