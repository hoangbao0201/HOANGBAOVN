import Link from "next/link";
import IconComment from "../../icons/IconComment";
import IconHear from "../../icons/IconHear";
import IconSave from "../../icons/IconSave";


interface SidebarLeftBlogDetailProps {
}
const SidebarLeftBlogDetail = ({  }: SidebarLeftBlogDetailProps) => {
    return (
        <aside className="sticky top-[72px] pl-4">
            <div className="bg-white dark:bg-slate-800 py-4 shadow-sm rounded-md">
                <div className="text-gray-500 space-y-3">
                    <div className="flex flex-col items-center">
                        <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 hover:dark:bg-white/30 rounded-full">
                            <IconHear size={24} className="fill-gray-500 dark:fill-white" />
                        </div>
                        <p className="text-lg dark:text-white/70">0</p>
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
                        <p className="text-lg dark:text-white/70">0</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 hover:dark:bg-white/30 rounded-full">
                            <IconSave size={24} className="fill-gray-500 dark:fill-white" />
                        </div>
                        <p className="text-lg dark:text-white/70">0</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarLeftBlogDetail;
