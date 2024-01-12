import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import IconClose from "../../icons/IconClose";
import { textToSlug } from "@/utils/testToSlug";
import { useDebounce } from "@/hook/useDebounce";
import tagService from "@/lib/services/tag.service";
import { useClickOutSide } from "@/hook/useClickOutSide";
import { RootStatePageEditBlog, setBlogEditRDHandle, setIsSaveBlogEditRDHandle } from "@/redux/pageEditBlogSlide";
import { TagProps } from "@/lib/services/blog.service";

const dataTagsDefault = [
    { name: "reactjs", slug: "reactjs", tagId: 6 },
    { name: "nextjs", slug: "nextjs", tagId: 4 },
    { name: "nodejs", slug: "nodejs", tagId: 5 },
];

interface ListTagProps {
    tags: { tags: TagProps }[]
}
const ListTag = ({ tags }: ListTagProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const { blogEdit, isSave } = useSelector((state: RootStatePageEditBlog) => state.pageEditBlog);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const menuOptionRef = useRef<HTMLInputElement>(null);

    const [isShow, setIsShow] = useState<boolean>(false);
    const [valueTag, setValueTag] = useState<string>("");
    const [suggestTag, setSuggestTag] = useState<
        { tagId: number, name: string; slug: string; _count?: { blogTags: number } }[]
    >([]);

    const valueInputDebounce = useDebounce(valueTag, 1000);

    const handleDeleteTag = ({ slugTag }: { slugTag: string }) => {
        try {
            const newListTag = tags.filter((tag) => tag.tags.slug !== slugTag);
            dispatch(setIsSaveBlogEditRDHandle(false));
            dispatch(setBlogEditRDHandle({
                ...blogEdit,
                blogTags: newListTag,
            }));
        } catch (error) {}
    };

    const handleAddTag = (tagId: number, name: string, slug?: string) => {
        if (!name || tags.length >= 3) return;
        const newListTag = [
            ...tags,
            {
                tags: { tagId: tagId, name: name, slug: slug || textToSlug(name) || "" }
            },
        ];
        dispatch(setIsSaveBlogEditRDHandle(false));
        dispatch(setBlogEditRDHandle({
            ...blogEdit,
            blogTags: newListTag,
        }));
        setValueTag("");
        setSuggestTag([]);
        inputRef.current?.focus();
    };

    const eventOnchangeValueTag = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 15) {
            return;
        }
        setValueTag(e.target.value);
    };

    const handleShowTag = () => {
        setIsShow(false);
    };

    const handleSearchSuggestTag = async () => {
        const suggestTagRes = await tagService.findAll(
            `?q=${valueInputDebounce}`
        );

        if (suggestTagRes.success) {
            setSuggestTag((state) => [...suggestTagRes.tags]);
        }
    };

    useClickOutSide(menuOptionRef, handleShowTag);

    useEffect(() => {
        if (valueInputDebounce.length > 0) {
            handleSearchSuggestTag();
        } else {
        }
    }, [valueInputDebounce]);

    return (
        <div
            ref={menuOptionRef}
            onClick={() => setIsShow(true)}
            className="border rounded-sm relative bg-gray-100"
        >
            <div className="flex flex-nowrap gap-1 overflow-y-auto py-2 px-3">
                {tags.map((tag, index) => {
                    return (
                        <p
                            key={index}
                            className="border bg-white rounded-sm flex items-center"
                        >
                            <span className="h-[33px] pl-2 leading-[33px] select-none whitespace-nowrap">
                                {tag.tags.name}
                            </span>
                            <span
                                onClick={() =>
                                    handleDeleteTag({ slugTag: tag?.tags.slug })
                                }
                                className="h-[33px] px-2 ml-1 cursor-pointer hover:bg-red-300 rounded-sm"
                            >
                                <IconClose
                                    size={12}
                                    className="top-0 translate-y-[11px]"
                                />
                            </span>
                        </p>
                    );
                })}
                <input
                    ref={inputRef}
                    value={valueTag}
                    onKeyDown={(e) => {
                        if (
                            valueTag === "" &&
                            e.key === "Backspace" &&
                            tags.length > 0
                        ) {
                            handleDeleteTag({ slugTag: tags[tags.length - 1].tags.slug })
                        }
                    }}
                    onChange={eventOnchangeValueTag}
                    placeholder="Thêm chủ để"
                    className="border-none outline-none w-full bg-transparent min-w-20"
                />
            </div>

            {/* DROPDOWN */}
            {isShow && tags.length <3 && (
                <div className="absolute top-full mt-1 z-40 left-0 right-0 bg-white py-2 px-1 border shadow-md">
                    <div className="max-h-[250px] overflow-y-auto">
                        {valueTag && (
                            <div
                                onClick={() => handleAddTag(-1, valueTag)}
                                className="hover:bg-gray-200 hover:underline px-4 py-2 rounded-md cursor-pointer"
                            >
                                {valueTag}
                            </div>
                        )}

                        {suggestTag.length > 0
                            ?(
                                <>
                                    <div className="px-3 py-1 text-sm text-gray-600">Chủ đề tìm kiếm</div>
                                    {
                                        suggestTag.map((tag, index) => {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        handleAddTag(tag.tagId, tag.name, tag.slug)
                                                    }
                                                    className="hover:bg-gray-200 group px-4 py-2 rounded-md cursor-pointer"
                                                    key={index}
                                                >
                                                    <span className="group-hover:underline">{tag?.name}</span> ({tag?._count?.blogTags})
                                                </div>
                                            );
                                        })
                                    }
                                </>
                            )
                            : (
                                <>
                                    <div className="px-3 py-1 text-sm text-gray-600">Chủ đề gợi ý</div>
                                    {
                                        dataTagsDefault.map((tag, index) => {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        handleAddTag(tag.tagId, tag.name, tag.slug)
                                                    }
                                                    className="hover:bg-gray-200 hover:underline px-4 py-2 rounded-md cursor-pointer"
                                                    key={index}
                                                >
                                                    {tag?.name}
                                                </div>
                                            );
                                        })
                                    }
                                </>
                            )
                            }
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListTag;
