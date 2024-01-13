import Link from "next/link";
import Image from "next/image";

import Pre from "./Tags/Pre";
import YoutubeEmbed from "./Tags/YoutubeEmbed";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
    content: MDXRemoteSerializeResult;
}
const MDXContent = ({ content }: MDXContentProps) => {
    return (
        <div id="mdxpage" className="break-words prose md:prose-lg prose-base max-w-none dark:prose-dark text-black prose-gray prose-strong:text-black">
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
                    a: ({ node, ...props }: any) => {
                        return (
                            <Link href={`${props?.href}`} target="_blank" className="text-blue-500" {...props}>
                                {props?.children.length > 50 ? props?.children.substring(0, 50) + "/..." : props?.children}
                            </Link>
                        );
                    },
                }}
            />
        </div>
    );
};

export default MDXContent;
