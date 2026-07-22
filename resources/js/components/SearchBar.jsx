import React, { useState, useRef, useEffect } from "react";

import Suggestion from "./Suggestion";
import { SearchIcon } from "@/components/icons";
import { router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import useSearchHistory from "@/lib/hooks/useSearchHistory";

const SearchBar = () => {
    const { make } = usePage().props;
    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef(null);
    const [dataset, setDataset] = useState(false);

    const { data, setData, reset } = useForm({
        search: "",
    });

    const { addToSearchHistory } = useSearchHistory();

    const submit = async (e) => {
        e.preventDefault();
        if (data.search.length) {
            addToSearchHistory(data.search);
            router.get(route("products-list", { search: data.search }));
        }
    };

    const handleInputChange = async (e) => {
        if (e.target.value.length) {
            const response = await axios.post(route("search"), {
                search: e.target.value,
            });

            setDataset(() => response.data.products);
            if (response.data.products.length) {
                setIsActive(() => true);
            }
        } else {
            setDataset(() => []);
            setIsActive(() => false);
        }
    };

    return (
        <>
            {/* Semi-transparent background when active */}
            {isActive && <div className="fixed inset-0 bg-black/50 z-30"></div>}

            {/* Search Container */}
            <div className="relative z-40" ref={dropdownRef}>
                {/* Search Input */}
                <form
                    onSubmit={submit}
                    className="py-[2px] px-[4px] border-2 border-secondary bg-white rounded-xl w-[500px] flex space-x-2"
                >
                    <select className="border-none font-main rounded-md focus:outline-none focus:ring-0 focus:ring-white text-zinc-500 text-[11px] md:text-[13px] pe-2 md:pe-auto">
                        <option value="Make">Make</option>
                        {make &&
                            make?.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.make}
                                </option>
                            ))}
                    </select>
                    <input
                        type="text"
                        value={data.search}
                        placeholder="Start your search for quality parts..."
                        className="border-none rounded-md focus:outline-none focus:ring-0 focus:ring-white w-full text-[11px] md:text-[14px]"
                        onChange={(e) => {
                            setData("search", e.target.value);
                            handleInputChange(e);
                        }}
                    />
                    <button
                        className="text-zinc-400 text-[13px] font-main"
                        onClick={() => reset()}
                        type="button"
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        className="bg-secondary text-black font-main py-2 px-1 md:px-3 flex font-regular my-auto rounded-[10px] text-[12px] md:text-[13px]"
                    >
                        <div className="my-auto me-1">{SearchIcon}</div>
                        Search
                    </button>
                </form>

                {dataset.length > 0 && (
                    <div className="absolute w-full mt-2 bg-white shadow-md rounded-md p-3 space-y-3 max-h-[60vh] overflow-y-auto">
                        {dataset.slice(0, 5).map((item, index) => (
                            <Suggestion suggestion={item} key={index} />
                        ))}
                        {dataset.length > 5 && (
                            <button
                                onClick={submit}
                                className="w-full text-center text-primary font-main font-medium py-2 mt-2 border border-gray-200 hover:bg-gray-50 rounded-md transition-colors"
                            >
                                View all {dataset.length} results
                            </button>
                        )}
                    </div>
                )}

                {isActive && dataset.length === 0 && (
                    <div className="absolute bg-white border border-gray-200 w-full mt-1 p-2 rounded-md shadow-md text-gray-500">
                        No matching products found.
                    </div>
                )}
            </div>
        </>
    );
};

export default React.memo(SearchBar);
