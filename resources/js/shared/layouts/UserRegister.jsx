import "@/public/images/Styles/style.css";
import React from "react";
import {RegisterProvider} from "@/lib/context/RegisterContext.jsx";
import { usePage } from "@inertiajs/react";


export default function UserRegisterLayout({ children }) {
    const { site_settings } = usePage().props;

    return (
        <div className="min-h-screen gap-5 px-[1em] flex items-center justify-center bg-[#111827] text-white">
            {/* Left Section */}
            <div className="h-full flex justify-center">

            <div
                className="w-[700px] flex flex-col justify-center items-center px-10 py-10 bg-gradient-to-br from-[#111827] to-[#1f2937] text-left">
                <img src={site_settings?.logo ? `/storage/${site_settings.logo}` : "/img/Estbanh White Logo 3.png"} alt={site_settings?.site_name || "Logo"} className="h-24 w-auto object-contain mb-6"/>
                <h2 className="text-lg font-bold uppercase tracking-wide text-gray-300 mb-1 text-center">
                    MEETING TOMORROW'S
                    <br/> ENERGY NEEDS
                </h2>
                <div className="mt-8">
                    <h1 className="text-3xl font-bold mb-3 leading-tight text-center">
                        Let’s setup your{" "}
                        <br/><span className="text-gray-400">Operating Agreement</span>
                    </h1>
                    <p className="text-gray-400 text-sm text-center">
                        All-in-one solution to form your business in the state. Form a
                        new company from scratch or onboard your existing US company.
                    </p>
                </div>
            </div>
            </div>

            {/* Right Section */}
            <div className="p-[1em] h-screen flex-1 w-full">

            <div className="p-[10em] bg-white h-full text-black rounded-[2rem]">
                {/* Step progress bar (customizable via props or component) */}
                <RegisterProvider>
                    {children}
                </RegisterProvider>
            </div>

            </div>
        </div>
    );
}


