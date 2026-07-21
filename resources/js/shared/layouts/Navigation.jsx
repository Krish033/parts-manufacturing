import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Bell, Settings, Menu } from "lucide-react";

const Navigation = ({ onOpenSideBar, onNotificationClick, onSettingClick }) => {
    const { auth, notifications, site_settings } = usePage().props;
    const user = auth?.user;
    const unreadNotificationsCount = Array.isArray(notifications)
        ? notifications.filter((n) => !n.status).length
        : 0;

    return (
        <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between shadow-xs z-10">
            {/* Left: Sidebar Toggle & App Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onOpenSideBar}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                    title="Toggle Sidebar"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900 tracking-tight">
                        {site_settings?.site_name || "Estbanh"}
                    </span>
                    <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 bg-gray-100 text-gray-800 rounded-full border border-gray-200">
                        Admin Portal
                    </span>
                </div>
            </div>

            {/* Right: Actions (Notifications, Settings, Profile) */}
            <div className="flex items-center gap-3">
                {/* Notifications Button */}
                <button
                    onClick={onNotificationClick}
                    className="relative p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all focus:outline-none"
                    title="Notifications"
                >
                    <Bell className="w-5 h-5" />
                    {unreadNotificationsCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                            {unreadNotificationsCount}
                        </span>
                    )}
                </button>

                {/* Profile Link */}
                <Link
                    href={route("admin.profile")}
                    className="flex items-center gap-2.5 p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                    title="Admin Profile"
                >
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                    </div>
                    <div className="hidden md:flex flex-col text-left leading-tight">
                        <span className="text-sm font-bold text-gray-900">
                            {user?.name || "Admin"}
                        </span>
                        <span className="text-xs text-gray-500">
                            {user?.email || "admin@example.com"}
                        </span>
                    </div>
                </Link>

                {/* Settings Toggle Button */}
                <button
                    onClick={onSettingClick}
                    className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all focus:outline-none"
                    title="Quick Actions & Account"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default Navigation;
