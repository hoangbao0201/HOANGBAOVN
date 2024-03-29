"use client"

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

const UserDropdown = () => {
    const { data: session, status } = useSession();

    const handleLogoutUser = () => {
        signOut({ redirect: false });
    };

    return (
        <>
            <Menu as="div" className="relative align-middle flex-shrink-0">
                <Menu.Button className="block h-[60px]">
                    <Image
                        alt="ảnh người dùng"
                        src={"/static/images/default/avatar_user_sm.jpg"}
                        width={40}
                        height={40}
                        title="hoangbao"
                        className="w-10 h-10 rounded-full overflow-hidden block object-cover hover:outline-dashed outline-2 outline-blue-600"
                    />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0"
                    enterTo="transform opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100"
                    leaveTo="transform opacity-0"
                >
                    <Menu.Items className="absolute z-50 mt-1 right-0 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-800 shadow-xl dark:shadow-slate-500 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <div className="pb-1 mb-1 border-b">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            aria-label={`${session?.user.name}`}
                                            href={`/user/${session?.user.username}`}
                                            className={`${
                                                active
                                                    ? "bg-gray-100"
                                                    : "text-gray-900"
                                            } group hover:dark:bg-white/30 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <Image
                                                alt="ảnh người dùng"
                                                src={"/static/images/default/avatar_user_sm.jpg"}
                                                width={40}
                                                height={40}
                                                title="hoangbao"
                                                className="w-10 h-10 rounded-full overflow-hidden block object-cover hover:outline-dashed outline-2 outline-blue-600"
                                            />
                                            <div className="ml-3">
                                                {session?.user.name}
                                            </div>
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                            {session?.user.username === "admin" && (
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            aria-label={`Admin`}
                                            target="_blank"
                                            href={`/admin/dashboarch`}
                                            className={`${
                                                active
                                                    ? "bg-gray-100"
                                                    : "text-gray-900"
                                            } group hover:dark:bg-white/30 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Admin
                                        </Link>
                                    )}
                                </Menu.Item>
                            )}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        title="Nút đăng xuất"
                                        onClick={handleLogoutUser}
                                        className={`${
                                            active
                                                ? "bg-gray-100"
                                                : "text-gray-900"
                                        } group hover:dark:bg-white/30 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Đăng xuất
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
};

export default UserDropdown;
