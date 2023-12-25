import Link from "next/link";
import Image from "next/image";

import TagsBlog from "../TagsBlog";
import AvatarRank from "../AvatarRank";
import convertTime from "@/utils/convertTime";
import IconShare from "../../modules/icons/IconShare";
import IconVerify from "../../modules/icons/IconVerify";
import { GetBlogsProps } from "@/lib/services/blog.service";
import dynamic from "next/dynamic";

const ButtonAction = dynamic(() => import('./ButtonAcction'), {
    ssr: false
});

interface CardBlog {
    blog: GetBlogsProps
}

const CardBlog = ({blog} : CardBlog) => {

    // const { data: session, status } = useSession();

    return (
        <article className="md:px-3 flex mb-4 relative">
            <div className="bg-white md:rounded-md w-full overflow-hidden shadow-sm outline-2 outline-indigo-500 hover:outline-dashed">
                <div className="flex px-4 pt-4">
                    <Link href={`/user/${blog.author.username}`}>
                        <AvatarRank rank={1}>
                            <Image
                                width={48}
                                height={48}
                                alt="ảnh người dùng"
                                src={"/static/images/default/avatar_user_sm.jpg"}
                                className="w-12 h-12 block object-cover rounded-full flex-shrink-0"
                            />
                        </AvatarRank>
                    </Link>
                    <div className="ml-2">
                        <div className="flex items-center mb-[3px]">
                            <Link href={`/user/${blog.author.username}`}>
                                <p className="hover:underline text-lg font-medium">
                                    {blog.author.name}
                                </p>
                            </Link>
                            <i className="ml-1">
                                <IconVerify
                                    className="w-4 h-4 block fill-blue-500"
                                />
                            </i>
                            {/* <span className="ml-2 text-sm font-medium border border-gray-400 px-2 py-[2px] rounded-md">
                                Cấp {blog.author.rank || 1}
                            </span> */}
                        </div>
                        <Link href={`/`}>
                            <p className="text-sm hover:underline">
                                {convertTime(blog.createdAt)}
                            </p>
                        </Link>
                    </div>
                    <div className="ml-auto">
                        <ButtonAction blogId={blog.blogId} authorId={blog.author.userId}/>
                    </div>
                </div>
                <div className="px-4 my-3">
                    <h2 className="text-2xl font-semibold mb-2 line-clamp-2">
                        <Link href={`/blog/${blog.slug}-${blog.blogId}`} className="hover:underline hover:text-indigo-700">
                            {blog.title}
                        </Link>
                    </h2>
                    <div className="overflow-hidden">
                        <div className="text-lg line-clamp-4">{blog.summary}</div>
                    </div>
                </div>

                <div className="px-4 my-3">
                    <TagsBlog
                        listTag={blog.blogTags}
                    />
                </div>

                <div className="border-t px-4 pt-3 pb-3 flex items-center justify-between">
                    <div className="">{blog._count.userViews} lượt xem</div>
                    <div>
                        <button className="p-2 rounded-full hover:bg-gray-200 [&>svg]:hover:fill-blue-700">
                            <IconShare size={23}/>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CardBlog;