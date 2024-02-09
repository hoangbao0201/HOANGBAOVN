import Image from "next/image";
import { useState } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@/components/common/Modal";
import IconCheckMark from "../../icons/IconCheckMark";
import { PageEditBlogSlideProps, addImageContentBlogEditRDHandle } from "@/redux/pageEditBlogSlide";

interface ListImageEditBlogProps {}
const ListImageEditBlog = ({}: ListImageEditBlogProps) => {
    const dispatch = useDispatch();
    const { blogEdit, isSave }: PageEditBlogSlideProps = useSelector(
        (state: any) => state.blogEdit
    );

    const [isShowListImageBlog, setIsShowListImageBlog] =
        useState<boolean>(false);

    const handleCopyUrlImage = (urlImage: string) => {
        const copyInput = document.createElement("input");
        copyInput.value = urlImage;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand("copy");
        document.body.removeChild(copyInput);

        toast(
            () => (
                <div className="flex items-center justify-center whitespace-nowrap overflow-hidden">
                    <IconCheckMark size={18} className="mr-2" /> Sao chép thành
                    công!
                </div>
            ),
            {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                closeButton: false,
                className: "max-w-[230px] h-10 py-0",
            }
        );
    };

    const handleAddImage = (imageId: number, url: string) => {
        dispatch(addImageContentBlogEditRDHandle(`![](${url})`));
    }

    return (
        <>
            <button
                title="Nút ẩn/hiện danh sách ảnh"
                onClick={() => setIsShowListImageBlog(true)}
                className="px-3 py-1 rounded-md border text-white whitespace-nowrap bg-blue-500 hover:bg-blue-600"
            >
                Danh sách ảnh
            </button>
            <Modal
                size="large"
                title="Danh sách ảnh"
                isOpen={isShowListImageBlog}
                setIsOpen={setIsShowListImageBlog}
            >
                <div className="flex-auto overflow-y-auto">
                    <div className="relative md:columns-3 columns-2 gap-3 space-y-3">
                        {blogEdit?.blogImages &&
                            blogEdit?.blogImages.length > 0 &&
                            blogEdit?.blogImages.map((image, index) => {
                                return (
                                    <div
                                        key={image.blogImageId}
                                        className="relative group block"
                                    >
                                        <Image
                                            width={200}
                                            height={200}
                                            alt="ảnh blog"
                                            src={`${image.urlImage}`}
                                            className="group-hover:fill-black object-cover w-full"
                                        />
                                        <div className="select-none absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center ease-linear transition-all delay-100 group-hover:bg-gray-950/50">
                                            <div className="transition-all text-sm opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                                                <div className="px-2 py-1 mb-1 rounded-md text-center hover:bg-gray-200 bg-white cursor-pointer min-w-[150px]">
                                                    Xóa ảnh
                                                </div>
                                                <div
                                                    onClick={() => handleAddImage(image.blogImageId, image.urlImage)}
                                                    className="px-2 py-1 mb-1 rounded-md text-center hover:bg-gray-200 bg-white cursor-pointer"
                                                >
                                                    Thêm ảnh vào bài viết
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        handleCopyUrlImage(
                                                            image.urlImage
                                                        )
                                                    }
                                                    className="px-2 py-1 rounded-md text-center hover:bg-gray-200 bg-white cursor-pointer"
                                                >
                                                    Sao chép địa chỉ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ListImageEditBlog;
