import FooterLogo from "@/public/images/general/Estbanh White Logo.png";
import { Footer as FooterIcons } from "@/components/icons";
import { Link, usePage } from "@inertiajs/react";

const Footer = () => {
    const { Facebook, Twitter, Insta, Youtube, SendIcon, FooterIcon } =
        FooterIcons;
    const { site_settings } = usePage().props;

    return (
        <>
            <footer>
                <section className="px-[12em] z-10 relative mt-8">
                    <div className="footer-form-bg p-3 rounded-2xl py-9 space-y-3 z-10 mb-[-70px]">
                        <div className="mb-5">
                            <h2 className="text-center text-3xl font-main font-medium">
                                Let's Connect
                            </h2>
                            <p className="text-center font-main font-light text-[14px]">
                                We're just a message away — Connect with us
                                today!
                            </p>
                        </div>

                        <form className="bg-white rounded-xl px-[3px] py-[4px] mt-3 w-full lg:w-1/3 flex space-x-3 mx-auto">
                            <input
                                type="mail"
                                placeholder="How can we help you today?"
                                className="w-full focus:outline-none text-[14px] font-main ms-2"
                            />

                            <button className="flex items-center bg-secondary rounded-lg px-3 py-2 space-x-1">
                                <SendIcon />
                                <span className="font-main text-[13px] font-medium">
                                    Send
                                </span>
                            </button>
                        </form>
                    </div>
                </section>

                <section className="footer-bg px-[8em] h-[50vh] flex flex-col justify-end pb-10 z-0">
                    <div className="grid grid-cols-12 gap-3 lg:gap-14">
                        <div className="col-span-12 md:col-span-6 lg:col-span-3 mt-6 space-y-3">
                            <img
                                src={site_settings?.logo ? `/storage/${site_settings.logo}` : FooterLogo}
                                alt={site_settings?.site_name || "Logo"}
                                className="w-32 max-h-24 object-contain mb-4 mx-auto md:mx-0"
                            />
                            <div className="flex space-x-3 justify-center md:justify-start">
                                <div className="bg-white rounded-full p-1">
                                    <Insta />
                                </div>
                                <div className="bg-white rounded-full p-1">
                                    <Facebook />
                                </div>
                                <div className="bg-white rounded-full p-1">
                                    <Twitter />
                                </div>
                                <div className="bg-white rounded-full p-1">
                                    <Youtube />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 lg:col-span-3">
                            <div className="mt-6 space-y-2">
                                <h3 className="text-white text-xl font-bold font-main mb-5">
                                    Explore Our Services
                                </h3>

                                <div className="space-y-2">
                                    {[
                                        { title: "Find your part", url: route("products-list", { search: "all" }) },
                                        { title: "Parts Catalogue", url: route("products-list", { search: "all" }) },
                                        { title: "Model Search", url: route("products-list", { search: "all" }) },
                                        {
                                            title: "Technical Documents",
                                            url: route("technical-documents"),
                                        },
                                    ].map((el, index) => (
                                        <Link
                                            className="flex items-center gap-2"
                                            href={el.url}
                                            key={index}
                                        >
                                            <FooterIcon />
                                            <span className="text-white font-normal text-[13px]">
                                                {el.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 lg:col-span-3">
                            <div className="mt-6 space-y-2">
                                <h3 className="text-white text-xl font-bold font-main mb-5">
                                    Support & Assistance
                                </h3>

                                <div className="space-y-2">
                                    {[
                                        {
                                            title: "Returns & Exchanges",
                                            url: route("returns-exchange"),
                                        },
                                        { title: "Repair Services", url: route("repair-services") },
                                        { title: "Help Center", url: route("help-center") },
                                        { title: "FAQs", url: route("faq") },
                                    ].map((el, index) => (
                                        <Link
                                            className="flex items-center gap-2"
                                            href={el.url}
                                            key={index}
                                        >
                                            <FooterIcon />
                                            <span className="text-white font-normal text-[13px]">
                                                {el.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 lg:col-span-3">
                            <div className="mt-6 space-y-2">
                                <h3 className="text-white text-xl font-bold font-main mb-5">
                                Contact Us
                                </h3>

                                <div className="space-y-3">
                                    {[
                                        {
                                            title: "Office",
                                            icon: "",
                                            value: site_settings?.contact_phone || "+91 23134 39234",
                                        },
                                        {
                                            title: "Mail",
                                            icon: "",
                                            value: site_settings?.contact_email || "info@yourappname.com",
                                        },
                                        {
                                            title: "Address",
                                            icon: "",
                                            value: site_settings?.contact_address || "123 Tech Park, Innovation Street, Sector 45, New City, 560001, India",
                                        },
                                    ].map((el, index) => (
                                        <div
                                            className="flex items-center gap-2"
                                            href={el.url}
                                            key={index}
                                        >
                                            <div className="w-fit"> 
                                            <FooterIcon />
                                            </div>
                                            <div>
                                                <span className="text-white font-normal text-[12px]">
                                                    {el.title}
                                                </span>
                                                <span className="text-white font-bold text-[13px] block" style={{ lineHeight: '1' }} >
                                                    {el.value}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-span-12 md:col-span-6 lg:col-span-3">
                            <div className="mt-6 space-y-2">
                                <h3 className="text-white text-xl font-bold font-main mb-5">
                                    Support & Assistance
                                </h3>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Find Your Part
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Parts Catalogue
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Model Search
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Technical Documents
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-3">
                            <div className="mt-6 space-y-2">
                                <h3 className="text-white text-xl font-bold font-main mb-5">
                                    Contact Us
                                </h3>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Find Your Part
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Parts Catalogue
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Model Search
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="my-auto">
                                        <FooterIcon />
                                    </div>
                                    <div className="text-white text-[14px]">
                                        Technical Documents
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>

                <section className="bg-secondary  flex justify-center items-center">
                    <span className="font-main font-normal p-1 text-[13px]">
                        {site_settings?.footer_text || `© ${new Date().getFullYear()} ${site_settings?.site_name || "Estbanh"}. All rights reserved.`}
                    </span>
                </section>
            </footer>
        </>
    );
};

export default Footer;
