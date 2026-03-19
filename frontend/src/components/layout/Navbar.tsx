import { FaComments } from "react-icons/fa";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { useAuth } from "@/global/store/useAuth";
import { Dropdown, Avatar, type MenuProps, Space } from "antd";

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuth();

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "?";

    const items: MenuProps['items'] = [
        {
            key: 'header',
            label: (
                <div className="px-1 py-1">
                    <p className="text-sm font-semibold text-gray-800 truncate m-0">
                        {user?.username ?? "User"}
                    </p>
                    {user?.email && (
                        <p className="text-xs text-gray-400 truncate mt-0.5 m-0">
                            {user.email}
                        </p>
                    )}
                </div>
            ),
            type: 'group',
        },
        {
            type: 'divider',
        },
        {
            key: 'profile',
            label: 'Profile',
            icon: <FiUser size={16} />,
        },
        {
            key: 'logout',
            label: 'Log out',
            icon: <FiLogOut size={16} />,
            danger: true,
            onClick: () => logout(),
        },
    ];

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-14 items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="bg-purple-50 p-1.5 rounded-lg">
                            <FaComments size={20} className="text-purple-600" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-gray-900">Chatty</span>
                    </div>

                    {/* User dropdown */}
                    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                        <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer outline-none border-none bg-transparent">
                            <Avatar
                                size={32}
                                className="bg-linear-to-br from-purple-500 to-purple-700 font-bold border-none shadow-sm flex items-center justify-center"
                            >
                                {initials}
                            </Avatar>
                            <Space size={4} className="hidden sm:flex">
                                <span className="text-sm font-semibold text-gray-700">
                                    {user?.username ?? "User"}
                                </span>
                                <FiChevronDown size={14} className="text-gray-400" />
                            </Space>
                        </button>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
}