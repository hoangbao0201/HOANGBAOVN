import IconComment from "../../icons/IconComment";
import IconHear from "../../icons/IconHear";
import IconSave from "../../icons/IconSave";


interface SidebarLeftBlogDetailProps {
}
const SidebarLeftBlogDetail = ({  }: SidebarLeftBlogDetailProps) => {
    return (
        <aside className="sticky top-[72px]">
            <div className="bg-white px-3 py-4 shadow-sm rounded-md">
                <div className="text-gray-500 space-y-3">
                    <div className="flex flex-col items-center">
                        <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 rounded-full">
                            <IconHear size={24} className="fill-gray-500" />
                        </div>
                        <p className="text-lg">0</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 rounded-full">
                            <IconComment
                                size={24}
                                className="fill-gray-500"
                            />
                        </div>
                        <p className="text-lg">0</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 rounded-full">
                            <IconSave size={24} className="fill-gray-500" />
                        </div>
                        <p className="text-lg">0</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarLeftBlogDetail;
