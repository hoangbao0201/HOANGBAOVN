import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

import Pre from "./Tags/Pre";
import YoutubeEmbed from "./Tags/YoutubeEmbed";

interface MDXContentProps {
    content: string;
}
const MDXContent = ({ content }: MDXContentProps) => {
    const MDXLayout = useMemo(() => getMDXComponent(content), [content]);

    return (
        <div className="prose max-w-none dark:prose-dark">
            <MDXLayout
                components={{
                    pre: Pre,
                    YoutubeEmbed,
                }}
            />
        </div>
    );
};

export default MDXContent;
