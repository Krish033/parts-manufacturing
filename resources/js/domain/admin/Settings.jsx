import React, { useState } from "react";
import AdminLayout from "@/shared/layouts/AdminLayout";
import InputLabel from "@/shared/InputLabel";
import TextInput from "@/shared/TextInput";
import InputError from "@/shared/InputError";
import PrimaryButton from "@/shared/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { Settings as SettingsIcon, Image as ImageIcon, Phone, Palette, Save } from "lucide-react";

export default function Settings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: settings?.site_name || "Estbanh",
        site_title: settings?.site_title || "Quality Parts & Accessories",
        contact_email: settings?.contact_email || "",
        contact_phone: settings?.contact_phone || "",
        contact_address: settings?.contact_address || "",
        currency_symbol: settings?.currency_symbol || "$",
        primary_color: settings?.primary_color || "#000000",
        footer_text: settings?.footer_text || "",
        logo: null,
        favicon: null,
    });

    const [logoPreview, setLogoPreview] = useState(
        settings?.logo ? `/storage/${settings.logo}` : null
    );
    const [faviconPreview, setFaviconPreview] = useState(
        settings?.favicon ? `/storage/${settings.favicon}` : null
    );

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("logo", file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("favicon", file);
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.settings.save"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout className="p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-100 text-black rounded-xl border border-gray-200">
                            <SettingsIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Website Settings</h1>
                            <p className="text-sm text-gray-500">
                                Manage branding, logo, website title, contact details, and theme customization.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Branding Section */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                            <SettingsIcon className="w-5 h-5 text-black" />
                            <h2>General & Identity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="site_name" value="Website Name *" />
                                <TextInput
                                    id="site_name"
                                    value={data.site_name}
                                    onChange={(e) => setData("site_name", e.target.value)}
                                    placeholder="e.g. Estbanh"
                                />
                                <InputError message={errors.site_name} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="site_title" value="Website Slogan / Subtitle" />
                                <TextInput
                                    id="site_title"
                                    value={data.site_title}
                                    onChange={(e) => setData("site_title", e.target.value)}
                                    placeholder="e.g. Quality Parts & Accessories"
                                />
                                <InputError message={errors.site_title} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Logo & Favicon Section */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                            <ImageIcon className="w-5 h-5 text-black" />
                            <h2>Logo & Favicon</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Logo */}
                            <div className="space-y-2">
                                <InputLabel value="Brand Logo" />
                                <div className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Logo Preview"
                                            className="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-white p-1"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg bg-gray-200 text-gray-500 flex items-center justify-center text-xs">
                                            No Logo
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 cursor-pointer"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            PNG, JPG or SVG (Max 2MB)
                                        </p>
                                    </div>
                                </div>
                                <InputError message={errors.logo} />
                            </div>

                            {/* Favicon */}
                            <div className="space-y-2">
                                <InputLabel value="Website Favicon" />
                                <div className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
                                    {faviconPreview ? (
                                        <img
                                            src={faviconPreview}
                                            alt="Favicon Preview"
                                            className="w-12 h-12 object-contain rounded-lg border border-gray-200 bg-white p-1"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-lg bg-gray-200 text-gray-500 flex items-center justify-center text-xs">
                                            No Icon
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFaviconChange}
                                            className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 cursor-pointer"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            Square icon (32x32 or 64x64)
                                        </p>
                                    </div>
                                </div>
                                <InputError message={errors.favicon} />
                            </div>
                        </div>
                    </div>

                    {/* Contact & Localization */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                            <Phone className="w-5 h-5 text-black" />
                            <h2>Contact Details & Footer</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="contact_email" value="Support Email" />
                                <TextInput
                                    id="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData("contact_email", e.target.value)}
                                    placeholder="support@example.com"
                                />
                                <InputError message={errors.contact_email} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="contact_phone" value="Support Phone" />
                                <TextInput
                                    id="contact_phone"
                                    value={data.contact_phone}
                                    onChange={(e) => setData("contact_phone", e.target.value)}
                                    placeholder="+1 (555) 000-0000"
                                />
                                <InputError message={errors.contact_phone} className="mt-1" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="contact_address" value="Business Address" />
                                <TextInput
                                    id="contact_address"
                                    value={data.contact_address}
                                    onChange={(e) => setData("contact_address", e.target.value)}
                                    placeholder="123 Commerce Way, Tech City"
                                />
                                <InputError message={errors.contact_address} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Branding Theme */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                            <Palette className="w-5 h-5 text-black" />
                            <h2>Theme & Footer Text</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="currency_symbol" value="Currency Symbol" />
                                <TextInput
                                    id="currency_symbol"
                                    value={data.currency_symbol}
                                    onChange={(e) => setData("currency_symbol", e.target.value)}
                                    placeholder="e.g. $, €, ₹"
                                />
                                <InputError message={errors.currency_symbol} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="primary_color" value="Primary Theme Color" />
                                <div className="flex items-center gap-3 mt-1">
                                    <input
                                        type="color"
                                        id="primary_color"
                                        value={data.primary_color}
                                        onChange={(e) => setData("primary_color", e.target.value)}
                                        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 p-1"
                                    />
                                    <TextInput
                                        value={data.primary_color}
                                        onChange={(e) => setData("primary_color", e.target.value)}
                                        placeholder="#000000"
                                        className="flex-1"
                                    />
                                </div>
                                <InputError message={errors.primary_color} className="mt-1" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="footer_text" value="Footer Copyright Notice" />
                                <TextInput
                                    id="footer_text"
                                    value={data.footer_text}
                                    onChange={(e) => setData("footer_text", e.target.value)}
                                    placeholder="© 2026 Estbanh. All rights reserved."
                                />
                                <InputError message={errors.footer_text} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                        <PrimaryButton disabled={processing} className="px-6 py-3 text-sm font-semibold flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save Settings
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
