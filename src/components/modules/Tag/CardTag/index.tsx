import { GetTagsProps } from "@/lib/services/tag.service";
import Link from "next/link";

interface CardTagProps {
    tag: GetTagsProps
}
const CardTag = ({ tag } : CardTagProps) => {

    return (
        <div className="px-2 mb-4">
            <div className="h-48 bg-white rounded-md shadow-sm px-3 py-3 flex flex-col outline-2 outline-indigo-500 hover:outline-dashed">
                <div className="flex items-end justify-between line-clamp-1 mb-2">
                    <Link
                        className=""
                        href={`/tags/${tag.slug}`}
                    >
                        <h2 className="font-semibold text-lg hover:underline hover:text-indigo-700">#{tag.name}</h2>
                    </Link>
                    <span className="text-sm text-gray-500">{tag._count.blogTags} bài viết</span>
                </div>
                <p className="mb-3 line-clamp-3 text-sm">
                    Tutorial is a general purpose tag. We welcome all types of tutorial - code related or not! It is all about learning, and using tutorials to teach others!
                </p>

                <div className="space-x-1 mt-auto">
                    <button className="py-2 px-3 text-sm min-w-[90px] text-white border bg-blue-600 hover:bg-blue-700 rounded-md">Theo dõi</button>
                    <button className="py-2 px-3 text-sm min-w-[90px] text-black hover:bg-blue-50 rounded-md">Ẩn đi</button>
                </div>
            </div>
        </div>
    )
}

export default CardTag;