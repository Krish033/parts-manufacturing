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
} from "lucide-react";

const Mobilebar = () => {
    const { route, auth } = usePage().props;
    const perms = auth?.permissions ?? [];

    const hasPermission = (permission) => {
        if (!Array.isArray(perms)) return true;
        return perms.includes("*") || perms.includes(permission);
    };

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            uri: "admin/dashboard",
            icon: LayoutDashboard,
            permission: "view_dashboard",
        },
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
        {
            name: "Orders",
            href: "/admin/orders",
            uri: "admin/orders",
            icon: ShoppingCart,
            permission: "view_orders",
        },
        {
            name: "User List",
            href: "/admin/users",
            uri: "admin/users",
            icon: Users,
            permission: "view_users",
        },
        {
            name: "Roles",
            href: "/admin/roles",
            uri: "admin/roles",
            icon: ShieldCheck,
            permission: "view_roles",
        },
        {
            name: "Website Settings",
            href: "/admin/settings",
            uri: "admin/settings",
            icon: Settings,
            permission: "*",
        },
    ];

    return (
        <aside className="w-16 bg-white border-r border-gray-200 h-screen flex flex-col justify-between items-center py-3 shadow-xs z-20">
            <div className="flex flex-col items-center gap-6 w-full">
                {/* Logo */}
                <Link href="/admin" className="p-1 hover:opacity-80 transition-opacity">
                    <ApplicationLogo className="w-8 h-8" />
                </Link>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 w-full px-2">
                    {navItems.map((item, idx) => {
                        if (!hasPermission(item.permission)) return null;

                        const isActive = route.uri === item.uri;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                title={item.name}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                    isActive
                                        ? "bg-black text-white shadow-md shadow-gray-300"
                                        : "text-gray-500 hover:text-black hover:bg-gray-100"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default Mobilebar;
