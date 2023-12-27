import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import Pre from "./Tags/Pre";
import YoutubeEmbed from "./Tags/YoutubeEmbed";

interface MDXContentProps {
    content: MDXRemoteSerializeResult
}
const MDXContent = ({ content }: MDXContentProps) => {

    return (
        <div id='mdxpage' className="prose prose-lg max-w-none dark:prose-dark">
            <MDXRemote
                {...content}
                components={{
                    pre: Pre,
                    YoutubeEmbed,
                }}
            />
        </div>
    );
};

export default MDXContent;
