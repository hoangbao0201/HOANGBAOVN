import IconHome from "@/components/modules/icons/IconHome";

export const SideBarAdminLayoutData = [
    {
        title: "Quản lí",
        children: [
            {
                pathname: "/admin/list/user",
                title: 'Danh sách người dùng',
                link: "/admin/list/user",
                icon: <IconHome size={22} />
            },
            {
                pathname: "/admin/list/blog",
                title: 'Danh sách bài viết',
                link: "/admin/list/blog",
                icon: <IconHome size={22} />
            },
        ]
    }
];