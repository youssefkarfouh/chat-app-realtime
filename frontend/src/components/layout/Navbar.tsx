import { FaComments } from "react-icons/fa";

import { useLogout } from "@/modules/auth/hooks/useLogout";

export default function Navbar() {
    const { logout } = useLogout();

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <FaComments size={24} className="text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <span className="font-bold text-xl tracking-tight">Chatty</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors" onClick={() => logout()}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}