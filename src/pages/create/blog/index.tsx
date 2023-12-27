import { useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, MultiValue } from "react-select";

import Modal from "@/components/common/Modal";
import { textToSlug } from "@/utils/testToSlug";
import blogService from "@/lib/services/blog.service";
import imageService from "@/lib/services/image.service";
import { ShowToastify } from "@/components/common/ShowToastify";
import IconAlertCircle from "@/components/modules/icons/IconAlertCircle";
import MDXContentEdit from "@/components/common/MDXSource/MDXContentEdit";
import MainLayout from "@/components/Layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

interface Option {
    label: string;
    value: string;
}
interface StateDataBlogProps {
    title: string;
    summary: string;
    content: string;
    published: boolean;
}

interface CreateBlogPageProps {

}
const CreateBlogPage: NextPageWithLayout<CreateBlogPageProps> = () => {
    const [isShowEditBlogDetail, setIsShowEditBlogDetail] = useState<boolean>(false);
    const [dataBlog, setDataBlog] = useState<StateDataBlogProps>({
        title: "",
        summary: "",
        content: "",
        published: true,
    });
    const [selectedTags, setSelectedTags] = useState<MultiValue<Option>>([]);
    const [optionTagDefault, setOptionTagDefault] = useState<
        MultiValue<Option>
    >([{ label: "ReactJS", value: "reactjs" }]);
    const [fileThumbnail, setFileThumbnail] = useState<{
        dataImage: File | null
        urlImage: string
    }>({
        dataImage: null,
        urlImage: ""
    }); 

    // SESSION
    const { data: session, status } = useSession();

    // Onchange Thumbnail Blog 
    const eventOnchangeThumbnailBlog = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files == null ) {
            return;
        }
        const dataImg = e.target.files[0];

        setFileThumbnail({
            ...fileThumbnail,
            dataImage: dataImg,
            urlImage: URL.createObjectURL(dataImg)
        });
    }

    // Onchange Data Blog
    const eventOnchangeDataBlog = (e: ChangeEvent<HTMLInputElement>) => {
        setDataBlog({
            ...dataBlog,
            [e.target.name]: e.target.value,
        });
    };

    // Onchange Tag Blog
    const eventOnchangeTagsBlog = (
        selectedOptions: MultiValue<Option>,
        actionMeta: ActionMeta<Option>
    ) => {
        setSelectedTags(selectedOptions);
        console.log(selectedOptions)
        console.log(actionMeta)
    };

    // Onchange Editor
    const eventOnchangeEditorChange = ({
        html,
        text,
    }: {
        html: string;
        text: string;
    }) => {
        // console.log(session)
        setDataBlog({
            ...dataBlog,
            content: text,
        });
    };

    // Create Blog
    const handleCreateBlog = async () => {

        // console.log(selectedTags)

        if(!session || status !== "authenticated") {
            return;
        }

        const convertTags : { name: string, slug: string }[] = selectedTags.map(item => {
            return {
                name: item.label,
                slug: textToSlug(item.label) || ""
            }
        });
        
        try {
            const createBlogRes = await blogService.createBlog({
                data: {
                    ...dataBlog,
                    blogTags: convertTags
                },
                token: session.backendTokens.accessToken
            });
            console.log(createBlogRes);
        } catch (error) {}
    };

    // Hanlde Upload Thumnail Blog
    const handleUploadThumbnailBlog = async () => {
        if(!session || status !== "authenticated") {
            return;
        }
        try {
            if(!fileThumbnail.dataImage) {
                return;
            }
            const formData = new FormData();
            formData.append("image", fileThumbnail.dataImage);
            // const imageRes = await fetch(`${API_BASE_URL}/api/images/cloudinary/upload/blog?width=1500&height=1500`, {
            //     method: "POST",
            //     body: (formData),
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            //     },
            // });
            const imageRes = await imageService.createImageBlog({
                dataImage: formData,
                token: session?.backendTokens.accessToken
            })
            console.log(imageRes)
        } catch (error) {
            
        }
    }

    // Hanlde Upload Image Blog
    const handleUploadImageBlog = async (file: File) => {
        if(!session || status !=="authenticated") {{
            return;
        }};

        try {
            const formData = new FormData();
            formData.append("image", file);
            const imageUrl = await imageService.createImageBlog({
                dataImage: formData,
                token: session.backendTokens.accessToken,
                query: "?blogId="+11
            });
            console.log(imageUrl);
            
            if(imageUrl?.success) {
                return imageUrl.image.url;
            }
        } catch (error) {
            
        }
    }

    const handleShowToastify = () => {
        ShowToastify({
            data: () => <div className='text-center'>Tạo thành công</div>,
            className: "text-base",
            toastOptions: {
                theme: "dark",
                delay: 3000,
                position: "top-center",
                hideProgressBar: true,
            }
        });
    }

    useEffect(() => {
        if (dataBlog.title.length >= 10) {
        }

    }, [dataBlog.title]);

    return (
        <div className="">
            <div
                style={{
                    height: "calc(100vh - px)",
                }}
                className="py-5 px-4 bg-white"
            >
                <button onClick={handleShowToastify}>Show</button>
                <div className="flex">
                    <input
                        name="title"
                        value={dataBlog.title}
                        onChange={eventOnchangeDataBlog}
                        placeholder="Tiêu đề bài viết"
                        className="border-b outline-none mb-4 pb-2 font-semibold text-lg w-full"
                    />
                    <button
                        onClick={() => setIsShowEditBlogDetail(true)}
                        className="ml-5 px-3 rounded-md h-10 border text-white whitespace-nowrap bg-blue-500 hover:bg-blue-600"
                    >
                        Xuất bản
                    </button>
                </div>
                <div>
                    {
                        session ? (
                            <Editor
                                value={dataBlog.content}
                                htmlClass=" "
                                className="w-full min-h-screen border-none"
                                onChange={eventOnchangeEditorChange}
                                onImageUpload={handleUploadImageBlog}
                                renderHTML={(text) => <MDXContentEdit content={text}/>}
                            />
                        ) : (
                            <div className="w-full min-h-screen border-none"></div>
                        )
                    }               
                </div>
            </div>

            <Modal
                size="full"
                isOpen={isShowEditBlogDetail}
                setIsOpen={setIsShowEditBlogDetail}
            >
                <div>
                    <div className="font-semibold text-lg mb-4">Xem trước</div>
                    <div className="h-full md:flex md:space-x-8">
                        <div className="md:w-2/5">

                            <div className="mb-6">
                                <label htmlFor="inputThumbnail" className="cursor-pointer group image-change">
                                    <div
                                        style={{ backgroundImage: `URL('${fileThumbnail.urlImage}')` }}
                                        className={`${fileThumbnail.dataImage && "exist-file"} transition-opacity duration-500 relative bg-center bg-cover border text-center w-full px-6 py-5 bg-gray-200 h-40 block rounded-md`}
                                    >
                                        <p className={`text-gray-900 mb-3`}>
                                            Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                                        </p>
                                        <p>Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh</p>
                                    </div>
                                </label>
                            </div>
                            <input
                                value={dataBlog.title}
                                name="title"
                                onChange={eventOnchangeDataBlog}
                                placeholder="Tiêu đề bài viết"
                                className="border-b outline-none mb-4 pb-2 font-semibold text-lg w-full"
                            />
                            <input
                                value={dataBlog.summary}
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
                                    <IconAlertCircle className="w-4 h-4 stroke-blue-500 block"/>
                                    <span className="ml-2 text-sm text-gray-700">Không quá 3 thẻ, không quá 15 kí tự</span>
                                </div>
                                <CreatableSelect
                                    isMulti
                                    // getOptionLabel={option => option.label}
                                    // getOptionValue={option => option.name}
                                    // formatOptionLabel={option => option.name ? option.label : `${option.label} Whatever`}
                                    formatCreateLabel={(inputValue) => `Tạo tag ${inputValue}`}
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
                                    // defaultValue={selectedTags}
                                    onChange={eventOnchangeTagsBlog}
                                />
        
                                <div className="flex items-center mt-4">
                                    <input
                                        id="idCheckPublished"
                                        type="checkbox"
                                        className=""
                                        onChange={(e) =>
                                            setDataBlog({
                                                ...dataBlog,
                                                published: e.target.checked,
                                            })
                                        }
                                        checked={dataBlog.published}
                                    />
                                    <label htmlFor="idCheckPublished" className="ml-2">
                                        Bài viết công khai
                                    </label>
                                </div>
                            </div>
                            <div className="mt-10 py-5 flex bottom-0 justify-end space-x-2">
                                <button
                                    onClick={handleCreateBlog}
                                    className="border rounded-md py-2 px-3 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Xuất bản ngay
                                </button>
                                <button
                                    onClick={() => setIsShowEditBlogDetail(false)}
                                    className="border rounded-md py-2 px-3 hover:bg-slate-100 text-black"
                                >
                                    Thoát
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CreateBlogPage;

CreateBlogPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
