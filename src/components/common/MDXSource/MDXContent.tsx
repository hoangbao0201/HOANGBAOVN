import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import Pre from "./Tags/Pre";
import YoutubeEmbed from "./Tags/YoutubeEmbed";
import { HTMLAttributes, ReactNode } from "react";
import Image from "next/image";

interface MDXContentProps {
    content: MDXRemoteSerializeResult;
}
const MDXContent = ({ content }: MDXContentProps) => {
    return (
        <div id="mdxpage" className="prose prose-lg max-w-none dark:prose-dark">
            <MDXRemote
                {...content}
                components={{
                    pre: Pre,
                    YoutubeEmbed,
                    img: ({ node, ...props }: any) => {
                        return (
                            <span className="rounded-md block text-center w-full">
                                <Image
                                    src={props.src}
                                    alt={props.alt}
                                    width={500}
                                    height={500}
                                    className="mx-auto mb-1"
                                />
                            </span>
                        );
                    },
                }}
            />
        </div>
    );
};

export default MDXContent;
