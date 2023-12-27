// import { bundleMDX } from "mdx-bundler";

// // Remark packages
// import remarkGfm from "remark-gfm";
// import remarkMath from "remark-math";
// import remarkFootnotes from "remark-footnotes";
// import remarkCodeTitles from "./remarkCodeTitles";
// import remarkTocHeadings from "./remarkTocHeadings";

// // Rehype packages
// import rehypeSlug from "rehype-slug";
// import rehypeKatex from "rehype-katex";
// import rehypePrismPlus from "rehype-prism-plus";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";

// interface MDXSourceProps {
//     source: string;
// }
// export const MDXSource = async ({ source }: MDXSourceProps) => {
//     const toc: Toc = [];

//     const { code, frontmatter } = await bundleMDX({
//         source,
//         mdxOptions(options, frontmatter) {
//             options.remarkPlugins = [
//                 ...(options.remarkPlugins ?? []),
//                 [remarkTocHeadings, { exportRef: toc }],
//                 remarkGfm,
//                 [remarkFootnotes, { inlineNotes: true }],
//                 remarkMath,
//                 remarkCodeTitles,
//             ];
//             options.rehypePlugins = [
//                 ...(options.rehypePlugins ?? []),
//                 rehypeSlug,
//                 rehypeAutolinkHeadings,
//                 rehypeKatex,
//                 [rehypePrismPlus, { ignoreMissing: true }],
//             ];
//             return options;
//         },
//         esbuildOptions: (options) => {
//             options.loader = {
//                 ...options.loader,
//                 ".js": "jsx",
//             };
//             return options;
//         },
//     });

//     return {
//         content: code,
//         toc: toc,
//     };
// };

import { Toc } from "@/types";
import matter from "gray-matter";
import { h } from "hastscript";
// import mdxMermaid from "mdx-mermaid";
import { serialize } from "next-mdx-remote/serialize";

// import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import remarkTocHeadings from "./remarkTocHeadings";

import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
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
                    [remarkTocHeadings, { exportRef: toc }],
                    [remarkFootnotes, { inlineNotes: true }],
                    // remarkGfm,
                    remarkMath,
                    // [mdxMermaid, {}],
                ],
                rehypePlugins: [
                    rehypeSlug,
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
                                            fill: "#2196f3",
                                            viewBox: "0 0 20 20",
                                            className: "w-5 h-5",
                                        },
                                        [
                                            h("path", {
                                                fillRule: "evenodd",
                                                clipRule: "evenodd",
                                                d: "M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z",
                                            }),
                                        ]
                                    ),
                                ];
                            },
                        },
                    ],
                    // @ts-ignore
                    [rehypeKatex, { output: "htmlAndMathml" }],
                    // @ts-ignore
                    [rehypePrismPlus, { ignoreMissing: true }],
                ],
            },
            scope: { ...data },
        }
    );

    return {
        content: mdxSource,
        toc: toc,
    };
};
