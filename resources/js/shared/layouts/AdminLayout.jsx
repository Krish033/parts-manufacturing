import Navigation from "@/shared/layouts/Navigation";
import Sidebar from "@/shared/layouts/Sidebar";
import NotificationBar from "@/shared/layouts/NotificationBar";

import SettingBar from "@/shared/layouts/SettingBar";
import Mobilebar from "@/shared/layouts/Mobilebar";
import { usePage } from "@inertiajs/react";
import Breadcrumb from "@/shared/Breadcrumb";
import { useAdminLayoutContext } from "@/lib/context/AdminLayoutContext";
import DefaultPageLayout from "@/components/DefaultPageLayout";
import Toast from "@/shared/Toast";

export default function AdminLayout({ title, header, children, className='' }) {
    const { flash } = usePage().props;
    
    const {
        isSideBarOpen,
        setIsSideBarOpen,
        settingBar,
        setSettingBar,
        notificationBar,
        setNotificationBar,
    } = useAdminLayoutContext();

    const formatted_url = usePage().props.route.uri.split("/");

    return (
        <div
            className={`bg-gray-50 h-screen flex justify-start align-top overflow-hidden`}
        >
            {isSideBarOpen ? <Sidebar /> : <Mobilebar />}

            <div className={`flex-1 w-full min-w-0 flex flex-col h-full overflow-hidden`}>
                <Navigation
                    onOpenSideBar={() => setIsSideBarOpen((state) => !state)}
                    onNotificationClick={() => {
                        setNotificationBar((state) => !state);
                        setSettingBar(() => false);
                    }}
                    onSettingClick={() => {
                        setSettingBar((state) => !state);
                        setNotificationBar(() => false);
                    }}
                />
                <div className="flex h-full w-full">
                    <div className="w-auto flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <Breadcrumb paths={formatted_url} />
                            {header}
                        </div>

                        <div className="h-[88%] flex-1 w-full overflow-y-auto">
                            {flash.success && (
                                <Toast message={flash.success} />
                            )}
                            <div className={className}>{children}</div>
                        </div>
                    </div>
                    {notificationBar && (
                        <NotificationBar
                            onClick={() => setNotificationBar(() => false)}
                        />
                    )}
                    {settingBar && (
                        <SettingBar
                            onClick={() => setSettingBar(() => false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
