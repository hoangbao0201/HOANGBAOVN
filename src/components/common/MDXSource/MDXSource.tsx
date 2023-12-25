import { Toc } from "@/types";
import { bundleMDX } from "mdx-bundler";

// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import remarkCodeTitles from "./remarkCodeTitles";
import remarkTocHeadings from "./remarkTocHeadings";

// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface MDXSourceProps {
    source: string;
}
export const MDXSource = async ({ source }: MDXSourceProps) => {
    const toc: Toc = [];

    const { code, frontmatter } = await bundleMDX({
        source,
        mdxOptions(options, frontmatter) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                [remarkTocHeadings, { exportRef: toc }],
                remarkGfm,
                [remarkFootnotes, { inlineNotes: true }],
                remarkMath,
                remarkCodeTitles,
            ];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
                [rehypePrismPlus, { ignoreMissing: true }],
            ];
            return options;
        },
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                ".js": "jsx",
            };
            return options;
        },
    });

    return {
        content: code,
        toc: toc,
    };
};
