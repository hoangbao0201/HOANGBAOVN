import { Toc } from "@/types";
import TOCInline from "@/components/common/MDXSource/TOCInline";

interface SidebarRightBlogDetailProps {
    toc: Toc
}
const SidebarRightBlogDetail = ({ toc } : SidebarRightBlogDetailProps) => {

    return (
        <aside className="sticky top-[72px]">
            {toc?.length > 0 && (
                <div className="bg-white px-3 py-4 rounded-md shadow-sm">
                    <TOCInline toc={toc}/>
                </div>
            )}
        </aside>
    )
}

export default SidebarRightBlogDetail;