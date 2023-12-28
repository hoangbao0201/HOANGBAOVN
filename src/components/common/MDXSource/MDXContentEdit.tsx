import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface MDXContentEditProps {
    content: string
}
const MDXContentEdit = ({ content }: MDXContentEditProps) => {
    return (
        <Markdown
            remarkPlugins={[
                remarkMath,
            ]}
            rehypePlugins={[
            ]}
            className={"prose prose-lg max-w-none dark:prose-dark"}
        >
            {content}
        </Markdown>
    )
}

export default MDXContentEdit;