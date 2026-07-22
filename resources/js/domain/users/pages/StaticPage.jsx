import React from "react";
import UserLayout from "@/shared/layouts/UserLayout";
import { Head } from "@inertiajs/react";

const StaticPage = ({ title, content }) => {
    return (
        <UserLayout>
            <Head title={title} />
            <section className="px-[12em] py-[5em]">
                <div className="bg-white p-10 rounded-xl border-2 border-gray-200 shadow-md">
                    <h1 className="text-3xl font-main font-bold mb-6 text-primary">
                        {title}
                    </h1>
                    <div className="font-main text-gray-700 leading-relaxed space-y-4">
                        <p>{content}</p>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default StaticPage;
