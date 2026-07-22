import UserLayout from "@/shared/layouts/UserLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

import BanSideImg from "@/public/images/home/banner-sider.png";
import { PrimaryButton } from "@/shared";
import { Search } from "@/components/icons";
import ProductsSection from "./_partials/home/ProductsSection";
import {
    WhyChooseUsBackground,
    WhyChooseUsIcon1,
    WhyChooseUsIcon2,
    WhyChooseUsIcon3,
    WhyChooseUsIcon4,
    WhyChooseUsMain,
} from "@/public/images/home/index";

import HomeScreenBannerSlider from "./_partials/home/HomeScreenBannerSlider";
import CustomerReview from "./_partials/home/CustomerReview";
import ProductBanner from "./_partials/home/ProductBanner";
import useSearchHistory from "@/lib/hooks/useSearchHistory";
import ListItem from "./_partials/products/ListItem";

export default function Home({ products, topSelling, highestRated }) {
    const { getRepeatedSearches } = useSearchHistory();
    const user = usePage().props?.auth?.user;
    const { make, model } = usePage().props;

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const availableModels = selectedMake ? model?.filter(m => m.make === selectedMake) : model;

    const handleSearch = () => {
        const query = `${selectedMake} ${selectedModel}`.trim();
        if (query) {
            router.visit(route("products-list", { search: query }));
        } else {
            router.visit(route("products-list", { search: "all" }));
        }
    };

    return (
        <UserLayout>
            <Head title="Home" />

            <section className="px-[10em] h-[75vh] flex items-center bg-[#fff]">
                <div className="flex-1">
                    <h2 className="text-4xl text-[#2B2F37] font-main font-medium mb-0 pb-0">
                        Hey {user?.name ?? "There"},
                        <br />
                        looking for the right parts?
                    </h2>

                    <p className="font-normal text-[#46505E] text-[16px] font-main mt-3 mb-12">
                        Find all the parts and accessories we stock for your
                        machine
                    </p>

                    <div className="p-1 rounded-[10px] w-full md:w-4/5 flex space-x-2 bg-white shadow-md border-2 border-gray-200">
                        <select
                            name="make"
                            id="make"
                            value={selectedMake}
                            onChange={(e) => {
                                setSelectedMake(e.target.value);
                                setSelectedModel("");
                            }}
                            className="border-none rounded-md focus:outline-none focus:ring-0 focus:ring-white text-zinc-500 text-[12px] md:text-[15px] pe-2 md:pe-auto w-1/2"
                        >
                            <option value="">Make</option>
                            {make &&
                                make?.map((m) => (
                                    <option key={m.id} value={m.make}>
                                        {m.make}
                                    </option>
                                ))}
                        </select>

                        <select
                            name="model"
                            id="model"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className="border-none rounded-md focus:outline-none focus:ring-0 focus:ring-white text-zinc-500 text-[12px] md:text-[15px] me-2 md:pe-auto w-full"
                        >
                            <option value="">Select your Model</option>
                            {availableModels &&
                                availableModels?.map((m) => (
                                    <option key={m.id} value={m.model}>
                                        {m.model}
                                    </option>
                                ))}
                        </select>
                        <button onClick={() => { setSelectedMake(""); setSelectedModel(""); }} className="text-gray-500 text-[13px] font-primary">
                            Clear
                        </button>

                        <PrimaryButton onClick={handleSearch} className="flex gap-1 items-center">
                            <Search />
                            <span className="text-[14px]">Search</span>
                        </PrimaryButton>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                        <p className="text-black font-main text-[13px] font-normal">
                            Popular Searches:
                        </p>
                        <ul className="flex gap-2 flex-wrap">
                            {getRepeatedSearches()
                                ?.slice(0, 5)
                                ?.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={route("products-list", {
                                                search: item[0],
                                            })}
                                            as="button"
                                            className="py-[2px] px-[3px] rounded-[5px] bg-white font-primary text-[#556174] font-medium text-[12px] border-[1px] border-[#D6DAE1]"
                                        >
                                            {item[0]}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-5 my-auto">
                    <img src={BanSideImg} alt="" className="w-[400px]" />
                </div>
            </section>
            <ProductsSection />



            <section className="px-[10em] mt-[3em] mb-[5em]">
                <ProductBanner />
            </section>

            <HomeScreenBannerSlider />

            <section className="px-[10em] space-y-8 mt-14 mb-14">
                <div className="text-center font-primary space-y-2">
                    <h2 className="font-main text-3xl text-black">
                        Why Choose Us
                    </h2>
                    <p className="font-main text-primary text-[13px]">
                        Our Trusted Partner for Electrical & Electronic Parts –
                        delivering <br /> high-quality components with Precision
                    </p>
                </div>

                <div className="grid grid-cols-10 gap-4">
                    <div
                        className="col-span-10 lg:col-span-4 rounded-2xl p-8 shadow-md border-2 border-gray-300"
                        style={{ background: `url(${WhyChooseUsBackground})` }}
                    >
                        <div className="flex justify-end">
                            <img
                                src={WhyChooseUsMain}
                                alt=""
                                className="w-3/6 lg:w-5/6"
                            />
                        </div>
                        <div className="lg:mt-10 space-y-3">
                            <img
                                src={WhyChooseUsIcon1}
                                alt=""
                                className="w-14"
                            />
                            <h3 className="font-main text-lg font-medium">
                                Extensive Product Range
                            </h3>
                            <p className="text-primary text-[13px]  font-main">
                                We offer a vast selection of electrical and
                                electronic parts, including motors, sensors,
                                cables, switches, and more. Whether you're
                                repairing, upgrading, or building from scratch,
                                you'll find everything you need to keep your
                                machines running smoothly.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-10 lg:col-span-6 space-y-5 ">
                        <div className="space-y-3 bg-[#EEF4FF] rounded-2xl p-8 shadow-md border-2 border-gray-300">
                            <img
                                src={WhyChooseUsIcon2}
                                alt=""
                                className="w-14 mb-10"
                            />
                            <h3 className="font-main text-lg font-medium">
                                Uncompromising Quality
                            </h3>
                            <p className="text-primary text-[13px]  font-main">
                                Quality is at the heart of what we do. We source
                                our products from trusted manufacturers,
                                ensuring every component meets industry
                                standards for performance, durability, and
                                reliability — giving you peace of mind with
                                every purchase.
                            </p>
                        </div>
                        <div className="grid grid-cols-10 gap-3 ">
                            <div className="col-span-10 md:col-span-5 p-4 bg-[#F0F0F0] rounded-2xl space-y-3 shadow-md border-2 border-gray-300">
                                <img
                                    src={WhyChooseUsIcon3}
                                    alt=""
                                    className="w-14 mb-10"
                                />
                                <h3 className="font-main text-lg font-medium">
                                    Fast & Reliable Delivery
                                </h3>
                                <p className="text-primary text-[13px]  font-main">
                                    We understand that downtime can be costly.
                                    That's why we prioritize fast and efficient
                                    delivery, ensuring your parts arrive on time
                                    to keep your projects moving without delay.
                                </p>
                            </div>
                            <div className="col-span-10 md:col-span-5 p-4 bg-[#2B2F37] rounded-2xl space-y-3 shadow-md">
                                <img
                                    src={WhyChooseUsIcon4}
                                    alt=""
                                    className="w-14 mb-10"
                                />
                                <h3 className="font-main text-lg font-medium text-white">
                                    Expert Support You Can Rely On
                                </h3>
                                <p className="text-gray-300 text-[13px]  font-main">
                                    Our dedicated support team is here to help.
                                    Whether you need product recommendations,
                                    technical guidance, or assistance with your
                                    Order.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CustomerReview />
        </UserLayout>
    );
}
