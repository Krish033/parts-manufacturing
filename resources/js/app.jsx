import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { AdminLayoutProvider } from "./lib/context/AdminLayoutContext";
import { AdminDefaultProvider } from "./lib/context/AdminDefaultContext";
import { RegisterProvider } from "./lib/context/RegisterContext.jsx";
import ToastProvider from "./lib/providers/ToastProvider";

const appName = window.App?.name || import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./domain/${name}.jsx`,
            import.meta.glob("./domain/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AdminLayoutProvider>
                <AdminDefaultProvider>
                    <RegisterProvider>
                        <App {...props} />
                    </RegisterProvider>
                </AdminDefaultProvider>
            </AdminLayoutProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
