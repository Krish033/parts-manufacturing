import { HeartIcon, TimeIcon } from "@/components/icons";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Minus, Plus } from "lucide-react";
import { memo, useState } from "react";

const ListItem = ({ product, isSelected, onToggle }) => {
    const { data, setData, errors, post } = useForm({
        productId: product.id,
        quantity: 1,
    });

    const wishlist = usePage().props.auth?.user?.wishlist;
    console.log(wishlist);

    const decrement = (e) => {
        e.preventDefault();

        if (data.quantity > 1) {
            setData("quantity", data.quantity - 1);
        }
        return true;
    };

    const increment = (e) => {
        e.preventDefault();

        setData("quantity", data.quantity + 1);
        return true;
    };

    const addToCart = (e) => {
        e.preventDefault();
        post(route("create.cart"), {
            onSuccess: () => {
                router.visit(route("cart"));
            },
        });
    };

    const togglewishlist = (e) => {
        e.preventDefault();
        post(route("wishlist.toggle", product.id), {
            onSuccess: () => {
                console.log("Toggled wishlist");
            },
        });
    };

    return (
        <div className="bg-white border-2 flex items-center overflow-hidden border-gray-300 rounded-xl max-h-46 mb-5">
            <div className="relative w-1/4 h-[233px] flex items-center justify-center bg-white">
                {onToggle && (
                    <div className="absolute top-3 left-3 z-10 bg-white/80 p-1 rounded shadow-sm">
                        <input 
                            type="checkbox" 
                            checked={isSelected || false} 
                            onChange={onToggle} 
                            className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                        />
                    </div>
                )}
                <button
                    onClick={togglewishlist}
                    className="absolute top-2 right-2 bg-[#FFEEC6]/80 p-1 rounded-full w-fit z-10 hover:bg-[#FFEEC6] transition-colors"
                >
                    <HeartIcon
                        fill={
                            wishlist?.includes(product.id)
                                ? "lightcoral"
                                : "white"
                        }
                    />
                </button>
                <img
                    src={product.image}
                    alt="image"
                    className="w-full h-full object-contain p-2"
                />
            </div>

            <div className="w-3/4 h-46 py-3 px-5 ">
                <div className="flex items-center">
                    <div className="flex-1">
                        <p className="text-[14px] font-main text-gray-600 uppercase">
                            {product.part_number}
                        </p>
                        <h1 className="text-lg mt-1 font-main font-bold">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap gap-2 items-center mt-1 text-[14px] font-main text-gray-600">
                            <span className="whitespace-nowrap">
                                ₹{product.discount_price}
                                {product.regular_price > product.discount_price && (
                                    <span className="line-through text-gray-400 ml-1 text-[12px]">
                                        ₹{product.regular_price}
                                    </span>
                                )}
                                /piece <span className="hidden sm:inline">|</span>
                            </span>

                            <span className="flex items-center gap-1 sm:gap-2 whitespace-nowrap text-[13px] sm:text-[14px]">
                                <TimeIcon size={18} />
                                No returns or cancellations
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-1 items-center">
                        <span className="text-2xl font-medium font-main text-black me-4">
                            ₹{product.discount_price * data.quantity}
                        </span>
                        <button
                            onClick={(e) => decrement(e)}
                            className="p-1 border-2 border-gray-700 rounded-md"
                        >
                            <Minus className="w-5 h-5" />
                        </button>
                        <p className="text-primary text-xl font-main  font-medium px-2">
                            {data.quantity}
                        </p>
                        <button
                            onClick={(e) => increment(e)}
                            className="p-1 bg-gray-900 text-white rounded-md"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="mt-5 mb-2 font-main text-[13px] w-full  flex">
                    <div className="flex flex-col gap-2 w-1/2">
                        <div className="flex justify-between">
                            <span>Warranty </span>
                            <span className="text-gray-700">{product?.detail?.warranty || "None"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Reference </span>
                            <span className="text-gray-700">
                                Own Reference{" "}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Weight </span>
                            <span className="text-gray-700">0.00 kg </span>
                        </div>
                    </div>
                    <div className="rounded-md w-1/2 flex flex-col items-end justify-center gap-2">
                        <Link href={route("view-product", product.id)}>
                            <button className="border-primary border-[1px] rounded-md text-[13px] w-32 block text-primary font-medium font-primary p-2">
                                View Product
                            </button>
                        </Link>
                        <button
                            onClick={addToCart}
                            className="bg-secondary rounded-md text-[13px] w-32 block text-black font-medium font-primary p-2"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ListItem);
