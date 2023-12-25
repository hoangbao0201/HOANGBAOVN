import Markdown from "react-markdown";

import Pre from "./Tags/Pre";
import { Toc } from "@/types";
import remarkTocHeadings from "./remarkTocHeadings";

// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface MDXContentEditProps {
    content: string
}
const MDXContentEdit = ({ content }: MDXContentEditProps) => {
    let toc : Toc = [];
    return (
        <Markdown
            rehypePlugins={[
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
                [rehypePrismPlus, { ignoreMissing: true }],
            ]}
            remarkPlugins={[
                [remarkTocHeadings, { exportRef: toc }],
                remarkGfm,
                remarkMath,
            ]}
            components={{
                pre: Pre,
            }}
            className={`prose max-w-none dark:prose-dark`}
        >
            {content}
        </Markdown>
    )
}

export default MDXContentEdit;