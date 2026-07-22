import UserLayout from "@/shared/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import ListItem from "./_partials/products/ListItem";
import Pagination from "@/shared/Pagination";

const Offers = ({ products }) => {
    return (
        <UserLayout>
            <Head title="Offers & Discounts" />
            <section className="px-[10em] mt-10">
                <div className="bg-white p-8 rounded-lg border-2 border-gray-300">
                    <h1 className="font-main text-3xl font-medium mb-6 text-primary">
                        Exclusive Offers & Discounts
                    </h1>
                    <p className="font-main text-gray-600 mb-8">
                        Browse our currently discounted items and bulk offers. Grab them before they're gone!
                    </p>

                    <div className="flex items-center justify-between mb-6 font-main">
                        <span className="text-gray-600 font-medium">{products?.total || 0} Results</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {products?.data?.length > 0 ? (
                            products.data.map((product, index) => (
                                <ListItem key={index} product={product} />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500 font-main">
                                No offers available right now. Check back later!
                            </div>
                        )}
                    </div>

                    {products?.data?.length > 0 && (
                        <div className="mt-8">
                            <Pagination collection={products} />
                        </div>
                    )}
                </div>
            </section>
        </UserLayout>
    );
};

export default Offers;
