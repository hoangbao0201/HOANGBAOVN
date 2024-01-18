import Link from "next/link";
import IconHome from "../../icons/IconHome";
import IconClock from "../../icons/IconClock";
import IconTopic from "../../icons/IconTopic";
import IconChartLine from "../../icons/IconChartLine";
import IconSignalStream from "../../icons/IconSignalStream";
import IconScrewdriverWrench from "../../icons/ScrewdriverWrench";

const SideBarNavigationMainData = [
    {
        title: 'Trang chủ',
        link: "/",
        icon: <IconHome size={20} />
    },
    {
        title: 'Phổ biến',
        link: "/",
        icon: <IconChartLine size={20} />
    },
    {
        title: 'Lịch sử',
        link: "/",
        icon: <IconClock size={20} />
    },
    {
        title: 'Chủ đề',
        link: "/tags",
        icon: <IconTopic size={20} />
    },
    {
        title: 'Live',
        link: "/",
        icon: <IconSignalStream size={20} />
    },
    {
        title: 'Tool',
        link: "/tool",
        icon: <IconScrewdriverWrench size={20} />
    },
];


const SideLeftHome = () => {
    return (
        <aside className="md:sticky top-[72px]">
            <ul className="xl:block flex xl:space-x-0 space-x-3 overflow-x-auto">
                {
                    SideBarNavigationMainData.map((item, index) => {
                        return (
                            <li key={index} className="hover:underline">
                                <Link href={item.link}>
                                    <div
                                        className="xl:bg-transparent bg-white max-xl:dark:bg-gray-800/70 text-gray-700 dark:text-slate-100 flex items-center px-3 py-2 space-x-3 hover:bg-white/90 dark:hover:bg-white/10 rounded-md whitespace-nowrap"
                                    >
                                        {item.icon && (
                                            <i className="flex-shrink-0 fill-gray-500 dark:fill-white stroke-gray-500">{item.icon}</i>
                                        )}
                                        <p>{item.title}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}

export default SideLeftHome;