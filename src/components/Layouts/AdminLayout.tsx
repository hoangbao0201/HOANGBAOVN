import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { SideBarAdminLayoutData } from "@/lib/data";


interface AdminLayoutProps {
    children: ReactNode
}

const AdminLayout = ({ children } : AdminLayoutProps) => {

    const pathname = usePathname()
    const { data: session, status } = useSession();

    return (
        <main>
            <div className="h-full">
                <div className="fixed top-0 right-0 left-[300px] border-b bg-white z-10">
                    <div className="px-4 flex items-center h-[60px]">
                        <Link aria-label={`Trang chủ HOANGBAO`} href={`/`} target="_blank" className="font-semibold">
                            HOANGBAO
                        </Link>
                    </div>
                </div>
                <div className="w-full max-w-[300px] h-screen fixed top-0 left-0 bottom-0 border-r bg-white">
                    <Link aria-label={`${session?.user.name}`} href={`/admin/dashboarch`}>
                        <div className="flex items-center px-4 h-[60px] border-b mb-3">
                            <Image
                                alt="ảnh người dùng"
                                src={"/static/images/default/avatar_user_sm.jpg"}
                                width={40}
                                height={40}
                                title="hoangbao"
                                className="w-10 h-10 rounded-full overflow-hidden block object-cover"
                            />
                            <span className="ml-2">{session?.user.name}</span>
                        </div>
                    </Link>
                    <div>
                        {
                            SideBarAdminLayoutData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="mx-3 px-4 py-2 font-semibold text-sm text-gray-500 uppercase">{item.title}</div>
                                        {
                                            item.children.map((child, index) => {
                                                return (
                                                    <div key={child.pathname} className="mx-3 mb-1">
                                                        <Link aria-label={`${child?.title}`} key={index} href={`${child.link}`}>
                                                            <div className={clsx(
                                                                "px-4 py-2 rounded-md",
                                                                {
                                                                    "bg-blue-500 text-white": child.pathname === pathname,
                                                                    "group hover:bg-gray-100": child.pathname !== pathname,
                                                                }
                                                            )}>
                                                                <div className="transition-all translate-x-0 group-hover:translate-x-1">{child.title}</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="relative h-screen ml-[300px] pt-[80px] px-5">
                    <div>{children}</div>
                </div>
            </div>
        </main>
    )
}

export default AdminLayout;