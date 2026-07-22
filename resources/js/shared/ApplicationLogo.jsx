import Logo from "@/public/images/general/logo.svg";
import { usePage } from "@inertiajs/react";

export default function ApplicationLogo({ className }) {
    const site_settings = usePage().props.site_settings;
    const logoSrc = site_settings?.logo ? `/storage/${site_settings.logo}` : Logo;

    return (
        <div className={`max-w-40 ` + className}>
            <img src={logoSrc} alt={site_settings?.site_name || "Logo"} className="w-full h-auto object-contain max-h-24" />
        </div>
    );
}
