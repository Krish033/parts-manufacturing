import { Link } from "@inertiajs/react";
import {
    Section3Product,
    Section3Product2,
    Section3Product3,
    Section3Product4,
    Section3Product5,
    Section3Product6,
    Section3Product7
} from "@/public/images/home/index";

const ProductBanner = () => {
    const productBanner = [
        {
            Heading: "Alternators",
            Description: "Power your vehicle reliably.",
            SearchQuery: "Alternator",
            Image: Section3Product7,
        },
        {
            Heading: "Ignition Coils",
            Description: "Consistent spark for peak performance.",
            SearchQuery: "Ignition Coil",
            Image: Section3Product6,
        },
        {
            Heading: "Starter Motors",
            Description: "Start your engine with confidence.",
            SearchQuery: "Starter Motor",
            Image: Section3Product,
        },
        {
            Heading: "Spark Plugs",
            Description: "Maximize fuel efficiency and power.",
            SearchQuery: "Spark Plug",
            Image: Section3Product4,
        },
        {
            Heading: "Car Batteries",
            Description: "Long-lasting power for all models.",
            SearchQuery: "Battery",
            Image: Section3Product5,
        },
        {
            Heading: "Brake Pads",
            Description: "Superior stopping power & safety.",
            SearchQuery: "Brake Pad",
            Image: Section3Product2,
        },
        {
            Heading: "Air Filters",
            Description: "Keep your engine breathing clean.",
            SearchQuery: "Air Filter",
            Image: Section3Product3,
        },
        {
            Heading: "Oil Filters",
            Description: "Protect your engine from wear.",
            SearchQuery: "Oil Filter",
            Image: Section3Product3,
        },
    ];

    return (
        <div className="grid grid-cols-12 gap-3">
            {productBanner.map((item, index) => (
                <div
                    key={index}
                    className="col-span-3 bg-white shadow-md border-2 border-gray-200 rounded-lg p-4"
                >
                    <h4 className="text-[17px] font-main font-medium">
                        {item.Heading}
                    </h4>
                    <p className="font-main text-gray-800 mb-5 text-[13px]">
                        {item.Description}
                    </p>
                    <div className="flex items-start justify-between space-x-2">
                        <Link href={route("products-list", { search: item.SearchQuery })} className="bg-secondary text-black font-main font-medium py-2 px-4 rounded-full text-[12px] hover:bg-orange-400 transition-all">
                            Shop Now
                        </Link>
                        <img src={item.Image} alt="" className="w-2/5" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductBanner;
