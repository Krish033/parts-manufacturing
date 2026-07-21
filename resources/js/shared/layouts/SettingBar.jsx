import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { User, Settings, LogOut, X } from "lucide-react";

const SettingBar = ({ onClick }) => {
    const user = usePage().props.auth?.user;

    const { post } = useForm();

    const logout = (e) => {
        e.preventDefault();
        post(route("admin.logout.test"));
    };

    return (
        <div className="w-80 bg-white border-l border-gray-200 h-full shadow-lg flex flex-col justify-between z-30">
            <div>
                {/* Header */}
                <div className="h-16 px-4 flex justify-between items-center border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm shadow-xs">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 leading-tight">
                                {user?.name || "Admin"}
                            </span>
                            <span className="text-xs text-gray-500 truncate max-w-[170px]">
                                {user?.email || "admin@example.com"}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClick}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Quick Menu */}
                <div className="p-3 space-y-1">
                    <Link
                        href={route("admin.profile")}
                        onClick={onClick}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-all"
                    >
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Admin Profile</span>
                    </Link>

                    <Link
                        href={route("admin.settings")}
                        onClick={onClick}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-all"
                    >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span>Website Settings</span>
                    </Link>
                </div>
            </div>

            {/* Logout Footer */}
            <div className="p-3 border-t border-gray-200">
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default SettingBar;
