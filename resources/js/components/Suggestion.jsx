import Text from "@/shared/Text";
import { Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Suggestion = ({ suggestion }) => {
    const { data, post, errors, setData } = useForm({
        quantity: 1,
        productId: suggestion.id,
    });

    return (
        <>
            <div className="flex items-center gap-4 p-2 border-2 border-[#f6f6f6] rounded-md">
                <div className="w-20 h-16 rounded-md p-2 bg-[#DBDBDB] flex items-center justify-center">
                    <img
                        src={suggestion.image}
                        alt="asa"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className=" rounded-md flex-1  my-auto">
                    <p className="text-[12px] font-primary text-[#556174]">
                        {suggestion.part_number}
                    </p>
                    <p className="text-sm font-medium font-main text-primary">
                        {suggestion.name}
                    </p>

                    <Text className="text-xs line-clamp-1 text-gray-500 mt-1">{suggestion.description}</Text>
                </div>
                <div className="rounded-md p-0 md:p-2 my-auto flex md:block space-x-2 md:space-x-0 md:space-y-3">
                    <Link href={route("view-product", suggestion.id)}>
                        <button className="border-primary border-[1px] rounded-md text-[13px] w-32 block text-primary font-medium font-primary p-2">
                            View Product
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Suggestion;
