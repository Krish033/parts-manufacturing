import React from "react";
import ApplicationLogo from "../ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderTree,
    Layers,
    Package,
    ShoppingCart,
    Users,
    ShieldCheck,
    Settings,
    ChevronRight,
} from "lucide-react";

const Sidebar = () => {
    const { route, auth, site_settings } = usePage().props;

    const perms = auth?.permissions ?? [];
    const hasPermission = (permission) => {
        if (!Array.isArray(perms)) return true;
        return perms.includes("*") || perms.includes(permission);
    };

    const mainNav = [
        {
            name: "Dashboard",
            href: "/admin",
            uri: "admin/dashboard",
            icon: LayoutDashboard,
            permission: "view_dashboard",
        },
    ];

    const catalogNav = [
        {
            name: "Categories",
            href: "/admin/categories",
            uri: "admin/categories",
            icon: FolderTree,
            permission: "view_categories",
        },
        {
            name: "Sub Categories",
            href: "/admin/sub-categories",
            uri: "admin/sub-categories",
            icon: Layers,
            permission: "view_subcategories",
        },
        {
            name: "Products",
            href: "/admin/products",
            uri: "admin/products",
            icon: Package,
            permission: "view_products",
        },
    ];

    const salesNav = [
        {
            name: "Orders",
            href: "/admin/orders",
            uri: "admin/orders",
            icon: ShoppingCart,
            permission: "view_orders",
        },
    ];

    const userNav = [
        {
            name: "User List",
            href: "/admin/users",
            uri: "admin/users",
            icon: Users,
            permission: "view_users",
        },
        {
            name: "Roles & Permissions",
            href: "/admin/roles",
            uri: "admin/roles",
            icon: ShieldCheck,
            permission: "view_roles",
        },
    ];

    const systemNav = [
        {
            name: "Website Settings",
            href: "/admin/settings",
            uri: "admin/settings",
            icon: Settings,
            permission: "*",
        },
    ];

    const renderNavGroup = (title, items) => {
        const visibleItems = items.filter((i) => hasPermission(i.permission));
        if (visibleItems.length === 0) return null;

        return (
            <div className="mb-6">
                {title && (
                    <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {title}
                    </div>
                )}
                <div className="space-y-1">
                    {visibleItems.map((item, idx) => {
                        const isActive = route.uri === item.uri;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-black text-white font-semibold shadow-md shadow-gray-200"
                                        : "text-gray-700 hover:text-black hover:bg-gray-100"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                                    <span>{item.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 text-white opacity-80" />}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <aside className="w-64 min-w-[260px] bg-white border-r border-gray-200 h-screen flex flex-col justify-between shadow-xs z-20">
            <div className="p-4 overflow-y-auto flex-1">
                {/* Header Logo */}
                <div className="flex items-center gap-3 px-2 pb-6 border-b border-gray-100 mb-6">
                    <ApplicationLogo className="w-9 h-9" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-base font-bold text-gray-900 tracking-tight">
                            {site_settings?.site_name || "Estbanh"}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Control Panel</span>
                    </div>
                </div>

                {/* Navigation Sections */}
                {renderNavGroup(null, mainNav)}
                {renderNavGroup("Catalog Management", catalogNav)}
                {renderNavGroup("Sales & Orders", salesNav)}
                {renderNavGroup("User Access", userNav)}
                {renderNavGroup("System", systemNav)}
            </div>
        </aside>
    );
};

export default Sidebar;
