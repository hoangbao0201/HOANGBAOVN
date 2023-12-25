import Link from "next/link";
import { useSession } from "next-auth/react";

import DropdownButton from "../DropdownButton";
import IconEcllipsis from "@/components/modules/icons/IconEllipsis";

interface ButtonActionProps {
    blogId: number
    authorId: number
}
const ButtonAction = ({ blogId, authorId } : ButtonActionProps) => {
    const { data: session, status } = useSession();

    return (
        <DropdownButton
            className="top-full right-0 shadow-lg border rounded-md bg-white"
            content={
                <div className="py-2 px-2 min-w-[300px]">
                    {
                        status === "loading" ? (
                            <div className="text-center">Loading</div>
                        ) : (
                            <>
                                {
                                    authorId === session?.user.userId && (
                                        <Link href={`/edit/blog/${blogId}`}>
                                            <div className="px-2 py-2 rounded-md hover:bg-gray-200">
                                                Chỉnh sửa bài viết
                                            </div>
                                        </Link>
                                    )
                                }
                                
                                <div className="px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
                                    Báo cáo bài viết
                                </div>
                            </>
                        )
                    }
                </div>
            }
        >
            <div className="cursor-pointer p-1 rounded-full hover:bg-gray-200 block">
                <IconEcllipsis />
            </div>
        </DropdownButton>
    )
}

export default ButtonAction;