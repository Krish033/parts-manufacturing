import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { WhyChooseUsIcon4, FeedBackground } from "@/public/images/home/index";
import { BlueQuote, YellowQuote } from "@/components/icons";

const CustomerReview = () => {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <section className="my-5 py-5 bg-cover bg-center bg-no-repeat" style={{ background: `url(${FeedBackground})` }}>
                <div className="px-[10em] space-y-2">
                    <h2 className="text-black text-center text-3xl font-main font-medium">
                        What Our Customers Say!
                    </h2>
                    <p className="text-center font-main text-[13px] font-normal">Hear it Straight from Our Happy Customers</p>
                </div>

                <div className="relative px-[10em]">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.activeIndex)
                        }
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        className="relative"
                    >
                        <SwiperSlide>
                            <div className="rounded-lg py-10">
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-6 md:col-span-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <YellowQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <BlueQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <YellowQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <BlueQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <BlueQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <YellowQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rounded-lg py-10">
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-6 md:col-span-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <YellowQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <BlueQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <YellowQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <BlueQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3 my-auto">
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <BlueQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 rounded-lg shadow-md bg-white">
                                            <div className="mb-8">
                                                <YellowQuote />
                                            </div>
                                            <p className="text-primary font-main font-light text-justify text-[13px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Rem est voluptatibus ad ipsum
                                                nostrum recusandae eos! Nulla
                                                impedit harum commodi, eveniet
                                                mollitia a ipsum hic est,
                                                quaerat, at veritatis soluta.
                                            </p>
                                            <div className="mt-3 flex">
                                                <div className="rounded-full w-1/4">
                                                    <img
                                                        src={WhyChooseUsIcon4}
                                                        alt=""
                                                        className=""
                                                    />
                                                </div>
                                                <div className="my-auto w-3/4">
                                                    <h4 className="text-primary font-main font-medium text-[13px]">
                                                        Divya R
                                                    </h4>
                                                    <p className="text-gray-600 font-main text-[10px]">
                                                        Great Value for Money
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    {/* Navigation Buttons */}
                    <button className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 md:-translate-y-1/4 z-10 bg-white p-2 rounded-full shadow-lg flex items-center justify-center">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 md:-translate-y-1/4 z-10 bg-white p-2 rounded-full shadow-lg flex items-center justify-center">
                        <ChevronRight size={24} />
                    </button>

                    {/* Custom Pagination */}
                    <div className="absolute left-1/2 lg:left-[155px] bottom-[0] z-10 transform -translate-x-1/2 flex gap-2">
                        {swiperInstance &&
                            [...Array(swiperInstance?.slides.length || 0)].map(
                                (_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all bg-white ${
                                            activeIndex === index
                                                ? "w-4 bg-blue-900"
                                                : "w-2 bg-zinc-500"
                                        }`}
                                        onClick={() =>
                                            swiperInstance &&
                                            swiperInstance.slideTo(index)
                                        }
                                    />
                                )
                            )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CustomerReview;
