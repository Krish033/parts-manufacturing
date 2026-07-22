import { SearchIcon, TimeIcon } from "@/components/icons";
import UserLayout from "@/shared/layouts/UserLayout";

import AppButton from "@/shared/AppButton";
import { Head, usePage, router } from "@inertiajs/react";
import React, { useState } from "react";
import ListItem from "./_partials/products/ListItem";
import RequestProduct from "./_partials/products/RequestProduct";
import SelectCart from "./_partials/cart/SelectCart";
import NavigateHistoryHeading from "@/shared/NavigateHistoryHeading";
import Pagination from "@/shared/Pagination";
import axios from "axios";

const ProductList = ({ products, search }) => {
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { make, model } = usePage().props;
    const user = usePage().props.auth.user;

    const queryParams = new URLSearchParams(window.location.search);
    const [selectedMake, setSelectedMake] = useState(queryParams.get("make") || "");
    const [selectedModel, setSelectedModel] = useState(queryParams.get("model") || "");
    const [selectedWarranty, setSelectedWarranty] = useState(queryParams.get("warranty") || "");
    const [isDiscounted, setIsDiscounted] = useState(queryParams.get("discounted") === "1");

    const availableModels = selectedMake ? model?.filter(m => m.make === selectedMake) : model;

    const [selectedItems, setSelectedItems] = useState([]);
    const [isAddingBulk, setIsAddingBulk] = useState(false);

    const handleRefineSearch = () => {
        const query = search !== "all" ? search : "all";
        const params = {};
        if (selectedMake) params.make = selectedMake;
        if (selectedModel) params.model = selectedModel;
        if (selectedWarranty) params.warranty = selectedWarranty;
        if (isDiscounted) params.discounted = "1";

        router.visit(route("products-list", { search: query, ...params }));
    };

    const handleBulkAddToCart = async () => {
        if (!selectedItems.length) return;
        setIsAddingBulk(true);
        try {
            await Promise.all(
                selectedItems.map((id) =>
                    axios.post(route("create.cart"), { productId: id, quantity: 1 })
                )
            );
            router.visit(route("cart"));
        } catch (error) {
            console.error("Bulk add to cart failed", error);
            setIsAddingBulk(false);
        }
    };

    return (
        <UserLayout>
            <Head title="Search Product" />

            <RequestProduct
                state={show}
                action={setShow}
                setSubmitted={setSubmitted}
            />

            <section className="px-[8em]">
                <div className="mt-[1em]  bg-white p-5 rounded-lg border-2 border-gray-300">
                    <div className="flex items-center justify-between">
                        <NavigateHistoryHeading
                            heading={
                                <h1 className="font-main text-xl">
                                    Results for {search}
                                </h1>
                            }
                        />

                        <div className="flex items-center gap-2">
                            <span>Active Cart: </span>
                            <SelectCart />
                        </div>
                    </div>
                    <div className="flex items-start gap-2 mt-[3em] w-full">
                        <div className="w-[30%] p-5">
                            <div className="bg-white border-2 border-gray-300 rounded-xl p-5">
                                <h1 className="font-main ">
                                    Refind your search
                                </h1>
                                <span className="font-main block text-primary mt-3 text-[14px]">
                                    Suitable for
                                </span>

                                <div className="rounded-[10px] w-full mt-5 flex space-x-2 bg-white shadow-md border-2 border-gray-200">
                                    <select
                                        name="make"
                                        className="border-none rounded-md focus:outline-none focus:ring-0 focus:ring-white text-zinc-500 text-[12px] md:text-[15px] pe-2 md:pe-auto w-full"
                                        value={selectedMake}
                                        onChange={(e) => {
                                            setSelectedMake(e.target.value);
                                            setSelectedModel("");
                                        }}
                                    >
                                        <option value="">Make</option>
                                        {make &&
                                            make?.map((m) => (
                                                <option key={m.id} value={m.make}>
                                                    {m.make}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                
                                <div className="rounded-[10px] w-full mt-5 flex space-x-2 bg-white shadow-md border-2 border-gray-200">
                                    <select
                                        name="model"
                                        className="border-none rounded-md focus:outline-none focus:ring-0 focus:ring-white text-zinc-500 text-[12px] md:text-[15px] pe-2 md:pe-auto w-full"
                                        value={selectedModel}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                    >
                                        <option value="">Select your Model</option>
                                        {availableModels &&
                                            availableModels?.map((m) => (
                                                <option key={m.id} value={m.model}>
                                                    {m.model}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="rounded-[10px] w-full mt-5 flex space-x-2 bg-white shadow-md border-2 border-gray-200">
                                    <select
                                        name="warranty"
                                        className="border-none rounded-md focus:outline-none focus:ring-0 focus:ring-white text-zinc-500 text-[12px] md:text-[15px] pe-2 md:pe-auto w-full"
                                        value={selectedWarranty}
                                        onChange={(e) => setSelectedWarranty(e.target.value)}
                                    >
                                        <option value="">Any Warranty</option>
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Years">2 Years</option>
                                        <option value="3 Years">3 Years</option>
                                        <option value="Lifetime">Lifetime</option>
                                    </select>
                                </div>

                                <div className="w-full mt-5 flex items-center gap-2 px-2">
                                    <input 
                                        type="checkbox" 
                                        id="discountFilter" 
                                        checked={isDiscounted}
                                        onChange={(e) => setIsDiscounted(e.target.checked)}
                                        className="rounded border-gray-300 text-secondary focus:ring-secondary w-4 h-4"
                                    />
                                    <label htmlFor="discountFilter" className="text-zinc-600 text-sm font-medium">Offers & Discounts Only</label>
                                </div>

                                <AppButton onClick={handleRefineSearch} className="w-full mt-5 flex justify-center items-center">
                                    {SearchIcon} Search
                                </AppButton>
                            </div>
                        </div>
                        <div className="w-[70%] p-5">
                            <div className="flex items-center gap-3 font-main">
                                <span>{products?.total || 0} Results | </span>
                                <div className="text-gray-500 flex items-center gap-3 flex-1">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedItems.length === (products?.data?.length || 0) && (products?.data?.length || 0) > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedItems(products?.data?.map(p => p.id) || []);
                                            } else {
                                                setSelectedItems([]);
                                            }
                                        }}
                                    />{" "}
                                    <span>Select all</span>
                                </div>

                                {selectedItems.length > 0 && (
                                    <button 
                                        onClick={handleBulkAddToCart}
                                        disabled={isAddingBulk}
                                        className="bg-secondary text-black px-3 py-1 rounded-md text-sm font-medium mr-2 hover:bg-orange-400 transition-colors"
                                    >
                                        {isAddingBulk ? "Adding..." : "Add Selected to Cart"}
                                    </button>
                                )}

                                {!user
                                    ? null
                                    : !submitted && (
                                          <button
                                              onClick={(e) => {
                                                  e.preventDefault();
                                                  setShow(true);
                                              }}
                                              className=" text-blue-500 text-[13px] underline"
                                          >
                                              Couldn't find what you were
                                              looking for?
                                          </button>
                                      )}

                                {submitted && (
                                    <span className=" text-gray-900 text-[13px] ">
                                        Request Submitted
                                    </span>
                                )}
                            </div>

                            <div className="mt-3">
                                {products?.data?.map((product, index) => (
                                    <ListItem 
                                        product={product} 
                                        key={index}
                                        isSelected={selectedItems.includes(product.id)}
                                        onToggle={() => {
                                            if (selectedItems.includes(product.id)) {
                                                setSelectedItems(selectedItems.filter(id => id !== product.id));
                                            } else {
                                                setSelectedItems([...selectedItems, product.id]);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {products?.data?.length > 0 && (
                                <div className="mt-8">
                                    <Pagination collection={products} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default ProductList;
