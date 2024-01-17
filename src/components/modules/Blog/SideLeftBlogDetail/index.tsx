import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { styled } from "styled-components";

import IconHear from "../../icons/IconHear";
import IconSave from "../../icons/IconSave";
import IconComment from "../../icons/IconComment";
import IconHearFull from "../../icons/IconHearFull";
import blogService, { GetSidebarBlog } from "@/lib/services/blog.service";
import { useDebounce } from "@/hook/useDebounce";
import formatNumberAbbreviation from "@/utils/formatNumberAbbreviation";

const ButtonAction = styled.div`
    .like {
        animation-timing-function: ease-in-out;
        animation-duration: 0.45s;
        transform: scale(1);
        animation-name: animation-like;

        @keyframes animation-like {
            0% {
                transform: scale(1);
            }

            25% {
                transform: scale(1.2);
            }
            50% {
                transform: scale(0.95);
            }
            100% {
                transform: scale(1);
            }
        }
    }
`;

interface SidebarLeftBlogDetailProps {
    blogId?: number;
}
const SidebarLeftBlogDetail = ({ blogId }: SidebarLeftBlogDetailProps) => {
    const [isLike, setIsLike] = useState<boolean>(false);
    const [dataSidebar, setDataSidebar] = useState<{
        userLikes: number | null,
        userSaves: number | null,
        Comment: number | null
    }>({
        userLikes: null,
        userSaves: null,
        Comment: null
    })
    const { data: session, status } = useSession();

    // Handle Onclick Button Like Blog
    const handleOnclickButtonLike = () => {
        if(dataSidebar.userLikes === null) {
            return;
        }
        if(isLike) {
            setDataSidebar({
                ...dataSidebar,
                userLikes: dataSidebar.userLikes-1
            });
        }
        else {
            setDataSidebar({
                ...dataSidebar,
                userLikes: dataSidebar.userLikes+1
            })
        }
        setIsLike(state => !state);
    }

    // Handle Action Like Blog
    const handleActionLikeBlog = async () => {
        if(status !== "authenticated" || !blogId || dataSidebar.userLikes === null) {
            return;
        }
        
        try {
            const isLikeBlogRes = await blogService.increaseLike({ blogId: blogId, token: session?.backendTokens.accessToken });            
        } catch (error) {
        }
    };

    // Event Get Data Sidebar Blog
    const eventGetDataSidebarBlog = async () => {
        if (!blogId) {
            return;
        }
        try {
            const sidebarBlogRes: {
                success: boolean;
                sidebarBlog: GetSidebarBlog;
            } = await blogService.getSidebar({
                blogId: blogId,
                token: session?.backendTokens.accessToken || undefined,
            });

            if (sidebarBlogRes?.success) {
                const { sidebarBlog } = sidebarBlogRes;
                if(sidebarBlog.userLikes.length > 0) {
                    setIsLike(true);
                }
                setDataSidebar({
                    userLikes: sidebarBlog?._count.userLikes || 0,
                    userSaves: sidebarBlog?._count.userSaves || 0,
                    Comment: sidebarBlog?._count.Comment || 0,
                })
            }
            else {
                setIsLike(false);
            }
        } catch (error) {}
    };


    const userLikeDebounce = useDebounce(isLike?"1":"0", 3000);
    useEffect(() => {
        eventGetDataSidebarBlog();
    }, [blogId]);
    useEffect(() => {
        if(userLikeDebounce === (isLike?"1":"0")) {
            handleActionLikeBlog();
        }
    }, [userLikeDebounce])

    return (
        <aside className="sticky top-[72px] pl-4">
            <div className="bg-white dark:bg-slate-800 py-4 shadow-sm rounded-md">
                <div className="text-gray-500 space-y-3">
                    <div className="flex flex-col items-center select-none">
                        <ButtonAction
                            onClick={handleOnclickButtonLike}
                            className="p-2 flex-1 cursor-pointer hover:bg-gray-100 hover:dark:bg-white/30 rounded-full"
                        >
                            {!isLike ? (
                                <IconHear
                                    size={24}
                                    className="fill-gray-500 group-hover:fill-gray-400 dark:fill-white"
                                />
                            ) : (
                                <IconHearFull
                                    size={24}
                                    className="fill-red-500 group-hover:fill-gray-400 dark:fill-white like"
                                />
                            )}
                        </ButtonAction>
                        <p className={`${dataSidebar?.userLikes ?? "bg-gray-200 animate-pulse"} text-lg dark:text-white/70 h-6 leading-6 min-w-6 text-center rounded-md`}>
                            {formatNumberAbbreviation(dataSidebar?.userLikes)}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link href="#comment">
                            <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 hover:dark:bg-white/30 rounded-full">
                                <IconComment
                                    size={24}
                                    className="fill-gray-500 dark:fill-white"
                                />
                            </div>
                        </Link>
                        <p className={`${dataSidebar?.userLikes ?? "bg-gray-200 animate-pulse"} text-lg dark:text-white/70 h-6 leading-6 min-w-6 text-center rounded-md`}>
                            {formatNumberAbbreviation(dataSidebar?.Comment)}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 hover:dark:bg-white/30 rounded-full">
                            <IconSave
                                size={24}
                                className="fill-gray-500 dark:fill-white"
                            />
                        </div>
                        <p className={`${dataSidebar?.userLikes ?? "bg-gray-200 animate-pulse"} text-lg dark:text-white/70 h-6 leading-6 min-w-6 text-center rounded-md`}>
                            {formatNumberAbbreviation(dataSidebar?.userSaves)}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarLeftBlogDetail;
