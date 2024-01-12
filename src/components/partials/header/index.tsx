import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import clsx from "clsx";
import { useTheme } from "next-themes";

import SearchMain from "./SearchMain";
import UserDropdown from "./UserDropdown";
import ButtonDarkMode from "./ButtonDarkMode";
import IconPen from "@/components/modules/icons/IconPen";
import IconBell from "@/components/modules/icons/IconBell";

interface HeaderProps {
    isDynamic?: boolean;
}
const Header = ({ isDynamic = true } : HeaderProps) => {
    const { data: session, status } = useSession();
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    // const matchesMobile = useMediaQuery("(max-width: 768px)");

    return (
        <header
            className={clsx(
                "w-full bg-white dark:bg-slate-800 shadow-sm border-b z-30 top-0 left-0 right-0",
                { sticky: isDynamic }
            )}
        >
            <div className="max-w-7xl w-full h-[60px] mx-auto px-3 flex items-center">
                {/* <NavbarCollapse /> */}

                <div className="text-lg font-semibold flex flex-shrink-0 items-center">
                    <Link href={`/`}>
                        <Image
                            width={100}
                            height={100}
                            loading="lazy"
                            decoding="async"
                            src={`/static/images/${currentTheme === "light" ? "logo.png" : "logo-dark.png"}`}
                            alt="Logo HOANGBAO"
                            className="w-[100px] h-[40px]"
                        />
                    </Link>
                    <span className="mx-3 inline h-5 w-px bg-gray-300/60"></span>
                </div>
                <SearchMain />
                <div className="ml-auto">
                    <div className="flex items-center space-x-2">
                        {
                            status === "loading" ? (
                                <>
                                    <span className="bg-gray-100 dark:bg-slate-800 w-10 h-10 rounded-full"></span>
                                    <span className="bg-gray-100 dark:bg-slate-800 w-10 h-10 rounded-full"></span>
                                    <span className="bg-gray-100 dark:bg-slate-800 w-10 h-10 rounded-full"></span>
                                </>

                            ) : (
                                <>
                                    <ButtonDarkMode />
                                    <Link href={`/creator/new-post`} title="Tạo bài viết">
                                        <i className="w-10 bg-gray-100 dark:bg-slate-800 rounded-full block outline-blue-600 outline-2 hover:outline-dashed">
                                            <IconPen size={20} className="h-10 mx-auto"/>
                                        </i>
                                    </Link>
                                    {/* <Link href={`/`} title="Thông báo">
                                        <i className="w-10 text-center bg-gray-100 dark:bg-slate-800 rounded-full block outline-blue-600 outline-2 hover:outline-dashed">
                                            <IconBell size={20} className="h-10 mx-auto"/>
                                        </i>
                                    </Link> */}
                                    { status == "authenticated" ? (
                                        <UserDropdown />
                                        // <div></div>
                                    ) : (
                                        <Link href={`/auth/login`}>
                                            <span className="py-2 px-3 rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white">
                                                Đăng nhập
                                            </span>
                                        </Link>
                                    )}
                                </>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
