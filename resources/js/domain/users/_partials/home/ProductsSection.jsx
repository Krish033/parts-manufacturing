import { Link } from "@inertiajs/react";
import {
    Section2Product1  as Section2_Product1,
    Section2Product2 as Section2_Product2,
    Section2Product2 as Section2_2_Product1,
    Section2_2Product2 as Section2_2_Product2,
    Section2_2Product3 as Section2_2_Product3,
} from "@/public/images/home/index";

const ProductsSection = () => {
    return (
        <section className="px-[10em] my-10 space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-6">
                    <div className="flex bg-[url('../../resources/js/public/images/home/ProductBG1.png')] bg-cover bg-center bg-no-repeat rounded-2xl p-8 h-full">
                        <div className="space-y-4 my-auto p-3">
                            <p className="text-black font-main ps-2 border-s-4 border-white text-[13px]">
                                Find. Fix. Upgrade
                            </p>
                            <h2 className="text-xl text-black font-main font-semibold">
                                Find the Right Parts, Fast and Easy!
                            </h2>
                            <Link href={route("products-list", { search: "all" })} className="bg-white hover:bg-gray-100 text-black font-main shadow-md font-medium py-2 px-4 rounded-full text-[12px] transition-all inline-block w-fit">
                                Checkout now!
                            </Link>
                        </div>
                        <div className="flex justify-end my-auto">
                            <img
                                src={Section2_Product1}
                                className="h-min"
                                alt="Product 1"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                    <div className="flex bg-[url('../../resources/js/public/images/home/ProductBG.png')] bg-cover bg-center bg-no-repeat rounded-2xl p-8 h-full">
                        <div className="space-y-4 my-auto p-3">
                            <p className="text-white font-main ps-2 border-s-4 border-white text-[13px]">
                                Power Up with Reliable Electronics!
                            </p>
                            <h2 className="text-xl text-white font-main font-medium">
                                Bringing Reliable Parts to Your Doorstep!
                            </h2>
                            <Link href={route("products-list", { search: "all" })} className="bg-secondary text-black font-main font-medium py-2 px-4 rounded-full text-[12px] hover:bg-orange-400 transition-all inline-block w-fit">
                                Browse Parts
                            </Link>
                        </div>
                        <div className="flex justify-end my-auto w-4/6">
                            <img
                                src={Section2_Product2}
                                className="md:w-5/6 h-min"
                                alt="Product 2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-4">
                    <div className="flex bg-[url('../../resources/js/public/images/home/pbg1.png')] bg-cover bg-center bg-no-repeat rounded-2xl p-4 h-full">
                        <div className="space-y-4 my-auto p-3">
                            <p className="text-black font-main ps-2 border-s-2 border-black text-[13px]">
                                Your Parts, Your Solution!
                            </p>
                            <h2 className="text-lg text-black font-main font-medium">
                                Smart Solutions for Every Project!
                            </h2>
                            <Link href={route("products-list", { search: "all" })} className="bg-secondary text-black font-main font-medium py-2 px-4 rounded-full text-[12px] hover:bg-orange-400 transition-all inline-block w-fit">
                                Discover More
                            </Link>
                        </div>
                        <div className="flex justify-end my-auto">
                            <img
                                src={Section2_2_Product1}
                                className="w-44 h-min"
                                alt="Product 3"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-4">
                    <div className="flex bg-[url('../../resources/js/public/images/home/pbg2.png')] bg-cover bg-center bg-no-repeat rounded-2xl p-4 h-full">
                        <div className="space-y-4 my-auto p-3">
                            <p className="text-black font-main ps-2 border-s-2 border-black text-[13px]">
                                Power Your Projects!
                            </p>
                            <h2 className="text-lf text-black font-main font-medium">
                                Your One-Stop Shop for Electronics & More!
                            </h2>
                            <Link href={route("products-list", { search: "all" })} className="bg-secondary text-black font-main font-medium py-2 px-4 rounded-full text-[12px] hover:bg-orange-400 transition-all inline-block w-fit">
                                Unlock Deals
                            </Link>
                        </div>
                        <div className="flex justify-end my-auto">
                            <img
                                src={Section2_2_Product2}
                                className="w-44 h-min"
                                alt="Product 4"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-4">
                    <div className="flex bg-[url('../../resources/js/public/images/home/pbg3.png')] bg-cover bg-center bg-no-repeat rounded-2xl p-4 h-full">
                        <div className="space-y-4 my-auto p-3">
                            <p className="text-black font-main ps-2 border-s-2 border-black text-[13px]">
                                Parts That Perform!
                            </p>
                            <h2 className="text-lg text-black font-main font-medium">
                                Smart Solutions for Every Project!
                            </h2>
                         

                            <Link href={route("products-list", { search: "all" })} className="bg-secondary text-black font-main font-medium py-2 px-4 rounded-full text-[12px] hover:bg-orange-400 transition-all inline-block w-fit">
                            Shop Now
                            </Link>
                        </div>
                        <div className="flex justify-end my-auto">
                            <img
                                src={Section2_2_Product3}
                                className="w-44 h-min"
                                alt="Product 5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
