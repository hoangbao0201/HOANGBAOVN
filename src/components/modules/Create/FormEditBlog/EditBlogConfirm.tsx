import { ChangeEvent, useEffect, useState } from "react";

import { MultiValue } from "react-select";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import ListTag from "./ListTag";
import Modal from "@/components/common/Modal";
import IconAlertCircle from "../../icons/IconAlertCircle";
import imageService from "@/lib/services/image.service";
import { RootStatePageEditBlog, addImageBlogEditRDHandle, setBlogEditRDHandle, setIsSaveBlogEditRDHandle } from "@/redux/pageEditBlogSlide";


interface Option {
    label: string;
    value: string;
}
interface EditBlogConfirmProps {
}
const EditBlogConfirm = () => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const { blogEdit, isSave } = useSelector((state: RootStatePageEditBlog) => state.pageEditBlog);

    const [isShowEditBlogDetail, setIsShowEditBlogDetail] =
        useState<boolean>(false);
    const [fileThumbnail, setFileThumbnail] = useState<{
        dataImage: File | null;
        urlImage: string;
    }>({
        dataImage: null,
        urlImage: "",
    });

    const eventOnchangeDataBlog = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setIsSaveBlogEditRDHandle(false));
        dispatch(setBlogEditRDHandle({
            ...blogEdit,
            [e.target.name]: e.target.value,
        }));
    };

    // Onchange Thumbnail Blog
    const eventOnchangeThumbnailBlog = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files == null || (e.target.files && e.target.files.length <=0 || status !== "authenticated")) {
            return;
        }
        const dataImg = e.target.files[0];
        const urlImage = URL.createObjectURL(dataImg);

        setFileThumbnail({
            dataImage: dataImg,
            urlImage: urlImage,
        });

        try {
            dispatch(setIsSaveBlogEditRDHandle(false));

            const formData = new FormData();
            formData.append("image", dataImg);
            const imageRes = await imageService.createImageBlog({
                query: `?blogId=${blogEdit?.blogId}&type=thumbnail`,
                dataImage: formData,
                token: session.backendTokens.accessToken,
            });
            console.log(imageRes)
            if (imageRes?.success) {
                dispatch(setBlogEditRDHandle({
                    ...blogEdit,
                    thumbnailUrl: imageRes.blogImage.urlImage
                }));
                return imageRes.urlImage;
            }
        } catch (error) {}
    };


    useEffect(() => {
        if(blogEdit?.thumbnailUrl) {
            setFileThumbnail({
                dataImage: null,
                urlImage: blogEdit?.thumbnailUrl || ""
            })
        }
    }, [blogEdit?.thumbnailUrl])

    // console.log(fileThumbnail)

    return (
        <>
            <button
                onClick={() => setIsShowEditBlogDetail(true)}
                className="px-3 py-1 rounded-md border text-white whitespace-nowrap bg-green-500 hover:bg-green-600"
            >
                Xuất bản
            </button>
            <Modal
                size="full"
                title="Tổng quan bài viết"
                isOpen={isShowEditBlogDetail}
                setIsOpen={setIsShowEditBlogDetail}
            >
                <div className="">
                    <div className="font-semibold text-lg mb-4">Xem trước</div>
                    <div className="md:flex md:space-x-8">
                        <div className="md:w-2/5">
                            <div className="mb-4">
                                <input
                                    id="inputThumbnail"
                                    className="hidden"
                                    type="file"
                                    onChange={eventOnchangeThumbnailBlog}
                                />
                                <label
                                    htmlFor="inputThumbnail"
                                    className="cursor-pointer group image-change"
                                >
                                    <div
                                        style={{
                                            backgroundImage: `URL('${fileThumbnail.urlImage}')`,
                                        }}
                                        className={`${
                                            fileThumbnail.urlImage &&
                                            "exist-file"
                                        } transition-opacity duration-500 relative bg-center bg-cover border text-center w-full px-6 py-5 bg-gray-200 h-40 block rounded-md`}
                                    >
                                        <p className={`text-gray-900 mb-3`}>
                                            Thêm một ảnh đại diện hấp dẫn sẽ
                                            giúp bài viết của bạn cuốn hút hơn

                                            với độc giả.
                                        </p>
                                        <p>
                                            Kéo thả ảnh vào đây, hoặc bấm để
                                            chọn ảnh
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <input
                                name="title"
                                value={blogEdit?.title}
                                onChange={eventOnchangeDataBlog}
                                placeholder="Tiêu đề bài viết"
                                className="border-b outline-none mb-4 pb-2 font-semibold text-lg w-full"
                            />
                            <textarea
                                name="summary"
                                value={blogEdit?.summary}
                                onChange={eventOnchangeDataBlog}
                                placeholder="Mô tả khi được hiển thị"
                                onKeyDown={(e) => {
                                    if(e.key === "Enter") {
                                        e.preventDefault();
                                    }
                                }}
                                maxLength={250}
                                className="shadow border outline-none mb-2 px-3 py-3 rounded-md font-medium text-base w-full h-[80px] resize-none"
                            />
                        </div>
                        <div className="md:w-3/5 flex flex-col justify-between relative">
                            <div className="">
                                <div className="flex items-center py-1">
                                    <IconAlertCircle className="w-4 h-4 stroke-blue-500 block" />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Không quá 3 thẻ, không quá 15 kí tự
                                    </span>
                                </div>
                                <ListTag
                                    tags={blogEdit?.blogTags || []}
                                />

                                <div className="flex items-center mt-4">
                                    <input
                                        id="idCheckPublished"
                                        type="checkbox"
                                        className=""
                                        onChange={(e) =>
                                            // setDataBlog({
                                            //     ...dataBlog,
                                            //     published: e.target.checked,
                                            // })
                                            dispatch(
                                                setBlogEditRDHandle({
                                                    ...blogEdit,
                                                    published: e.target.checked,
                                                })
                                            )
                                        }
                                        checked={blogEdit?.published}
                                    />
                                    <label
                                        htmlFor="idCheckPublished"
                                        className="ml-2"
                                    >
                                        Bài viết công khai
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end space-x-2">
                        <button
                            onClick={() =>
                                setIsShowEditBlogDetail(false)
                            }
                            className="border rounded-md py-2 px-3 hover:bg-slate-100 text-black"
                        >
                            Thoát
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditBlogConfirm;
