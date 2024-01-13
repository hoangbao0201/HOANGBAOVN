import { Toc } from "@/types";
import matter from "gray-matter";
import { h } from "hastscript";
import { serialize } from "next-mdx-remote/serialize";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkTocHeadings from "./remarkTocHeadings";

import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex"
import rehypePrismPlus from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface MDXSourceProps {
    source: string;
}
export const MDXSource = async ({ source }: MDXSourceProps) => {
    const { content, data } = matter(source);

    const toc: Toc = [];

    const mdxSource = await serialize(
        { value: content },
        {
            mdxOptions: {
                remarkPlugins: [
                    remarkGfm,
                    remarkMath,
                    [remarkTocHeadings, { exportRef: toc }],
                ],
                rehypePlugins: [
                    rehypeSlug,
                    // @ts-ignore
                    [rehypeKatex, { output: "htmlAndMathml" }],
                    // @ts-ignore
                    [rehypePrismPlus, { ignoreMissing: true }],
                    [
                        rehypeAutolinkHeadings,
                        {
                            properties: { className: "heading-link" },
                            test(element: any) {
                                return (
                                    ["h2", "h3", "h4", "h5", "h6"].includes(
                                        element.tagName
                                    ) &&
                                    element.properties?.id !==
                                        "table-of-contents" &&
                                    element.properties?.className !==
                                        "blockquote-heading"
                                );
                            },
                            content() {
                                return [
                                    h(
                                        "svg",
                                        {
                                            xmlns: "http:www.w3.org/2000/svg",
                                            fill: "#000",
                                            viewBox: "0 0 20 20",
                                            className: "w-8 h-8",
                                        },
                                        [
                                            h("path", {
                                                fillRule: "evenodd",
                                                d: "M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                            }),
                                        ]
                                    ),
                                ];
                            },
                        },
                    ],
                ],
            },
            scope: { ...data },
        }
    );

    return {
        content: mdxSource,
        toc: toc,
        frontMatter: data,
    };
};
