import { Fragment, useEffect, useState } from "react";

import CardBlog from "@/components/common/CardBlog";
import SkeletonCardBlog from "../../skeletons/SkeletonCardBlog";
import blogService, { GetBlogsProps } from "@/lib/services/blog.service";

interface ListBlogUserProps {
    slug: string;
}
const ListBlogUser = ({ slug }: ListBlogUserProps) => {
    const [listBlog, setListBlog] = useState<GetBlogsProps[]>([]);

    const handleGetListBlogUser = async () => {
        try {
            const blogsRes = await blogService.getAllBlogs({ query: `?byu=${slug}` });

            if (blogsRes.success) {
                setListBlog(blogsRes.blogs);
            }
        } catch (error) {}
    };
    useEffect(() => {
        if (slug && slug !== "") {
            handleGetListBlogUser();
        }
    }, [slug]);

    return (
        <div>
            {listBlog.length > 0 ? (
                listBlog.map((blog) => {
                    return (
                        <Fragment key={blog.blogId}>
                            <CardBlog blog={blog} />
                        </Fragment>
                    );
                })
            ) : (
                <SkeletonCardBlog count={3} />
            )}
        </div>
    );
};

export default ListBlogUser;
