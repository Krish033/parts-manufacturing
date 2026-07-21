import React from "react";
import AdminLayout from "@/shared/layouts/AdminLayout";
import InputLabel from "@/shared/InputLabel";
import TextInput from "@/shared/TextInput";
import InputError from "@/shared/InputError";
import PrimaryButton from "@/shared/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { User, Key, Save, Shield } from "lucide-react";

export default function Profile({ admin }) {
    const user = admin || usePage().props.auth?.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.profile.update"), {
            onSuccess: () => reset("password", "password_confirmation"),
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-100 text-black rounded-xl border border-gray-200">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Admin Profile & Password</h1>
                            <p className="text-sm text-gray-500">
                                Update your account name, email address, and security credentials.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Account Info */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                            <Shield className="w-5 h-5 text-black" />
                            <h2>Account Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="name" value="Admin Name *" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="e.g. Krishna"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email Address *" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    placeholder="admin@example.com"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                            <Key className="w-5 h-5 text-black" />
                            <h2>Change Password</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="password" value="New Password (Optional)" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    placeholder="Leave blank to keep current"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm New Password" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    placeholder="Confirm new password"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                        <PrimaryButton disabled={processing} className="px-6 py-3 text-sm font-semibold flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Update Profile
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
