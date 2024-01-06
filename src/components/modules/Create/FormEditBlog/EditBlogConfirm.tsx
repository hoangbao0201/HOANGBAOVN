import { ChangeEvent, useState } from "react";

import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@/components/common/Modal";
import { setBlogEditRDHandle } from "@/redux/blogEditSlide";
import IconAlertCircle from "../../icons/IconAlertCircle";


interface Option {
    label: string;
    value: string;
}
interface EditBlogConfirmProps {
}
const EditBlogConfirm = () => {
    const dispatch = useDispatch();
    const { blogEdit, isSave } = useSelector((state: any) => state.blogEdit);

    const [selectedTags, setSelectedTags] = useState<MultiValue<Option>>([]);
    const [isShowEditBlogDetail, setIsShowEditBlogDetail] =
        useState<boolean>(false);
    const [fileThumbnail, setFileThumbnail] = useState<{
        dataImage: File | null;
        urlImage: string;
    }>({
        dataImage: null,
        urlImage: "",
    });
    const [optionTagDefault, setOptionTagDefault] = useState<
        MultiValue<Option>
    >([{ label: "ReactJS", value: "reactjs" }]);

    const eventOnchangeDataBlog = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setBlogEditRDHandle({
            ...blogEdit,
            [e.target.name]: e.target.value,
        }));
    };

    // Onchange Thumbnail Blog
    const eventOnchangeThumbnailBlog = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files == null) {
            return;
        }
        const dataImg = e.target.files[0];

        setFileThumbnail({
            ...fileThumbnail,
            dataImage: dataImg,
            urlImage: URL.createObjectURL(dataImg),
        });
    };

    const handleSaveEditBlog = () => {

    }

    const handleUploadThumbnailBlog = () => {

    }

    const eventOnchangeTagsBlog = (
        selectedOptions: MultiValue<Option>,
        // actionMeta: ActionMeta<Option>
    ) => {
        setSelectedTags(selectedOptions);
    };

    return (
        <>
            <button
                onClick={() => setIsShowEditBlogDetail(true)}
                className="ml-5 px-3 rounded-md h-10 border text-white whitespace-nowrap bg-blue-500 hover:bg-blue-600"
            >
                Lưu
            </button>
            <Modal
                size="full"
                title="Tổng quan bài viết"
                isOpen={isShowEditBlogDetail}
                setIsOpen={setIsShowEditBlogDetail}
            >
                <div>
                    <div className="font-semibold text-lg mb-4">Xem trước</div>
                    <div className="h-full md:flex md:space-x-8">
                        <div className="md:w-2/5">
                            <div className="mb-6">
                                <label
                                    htmlFor="inputThumbnail"
                                    className="cursor-pointer group image-change"
                                >
                                    <div
                                        style={{
                                            backgroundImage: `URL('${fileThumbnail.urlImage}')`,
                                        }}
                                        className={`${
                                            fileThumbnail.dataImage &&
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
                                // value={blogEdit?.title}
                                name="title"
                                onChange={eventOnchangeDataBlog}
                                placeholder="Tiêu đề bài viết"
                                className="border-b outline-none mb-4 pb-2 font-semibold text-lg w-full"
                            />
                            <input
                                value={blogEdit?.summary}
                                name="summary"
                                onChange={eventOnchangeDataBlog}
                                placeholder="Mô tả khi được hiển thị"
                                className="border-b outline-none mb-4 pb-2 font-medium text-base w-full"
                            />
                            <input
                                id="inputThumbnail"
                                className="hidden"
                                type="file"
                                onChange={eventOnchangeThumbnailBlog}
                            />
                            <button
                                onClick={handleUploadThumbnailBlog}
                                className="border rounded-md px-3 py-1 bg-blue-600 active:scale-105"
                            >
                                Upload
                            </button>
                        </div>
                        <div className="md:w-3/5 flex flex-col justify-between">
                            <div className="">
                                <div className="flex items-center py-1">
                                    <IconAlertCircle className="w-4 h-4 stroke-blue-500 block" />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Không quá 3 thẻ, không quá 15 kí tự
                                    </span>
                                </div>
                                <CreatableSelect
                                    isMulti
                                    // getOptionLabel={option => option.label}
                                    // getOptionValue={option => option.name}
                                    // formatOptionLabel={option => option.name ? option.label : `${option.label} Whatever`}
                                    formatCreateLabel={(inputValue) =>
                                        `Tạo tag ${inputValue}`
                                    }
                                    isValidNewOption={(value) =>
                                        value.length > 1 && value.length < 15
                                    }
                                    // isValidNewOption={() => true}
                                    options={optionTagDefault}
                                    placeholder="Ví dụ: ReactJS, NodeJS, UX, UI"
                                    noOptionsMessage={() => "Không tìm thấy"}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: "#ccc",
                                            outline: "none",
                                            backgroundColor: "#fafafa",
                                            borderRadius: "6px",
                                            padding: "3px 5px",
                                        }),
                                    }}
                                    defaultValue={selectedTags}
                                    onChange={eventOnchangeTagsBlog}
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
                            <div className="mt-10 py-5 flex bottom-0 justify-end space-x-2">
                                <button
                                    onClick={handleSaveEditBlog}
                                    className="border rounded-md py-2 px-3 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Lưu và xuất bản
                                </button>

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
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditBlogConfirm;
