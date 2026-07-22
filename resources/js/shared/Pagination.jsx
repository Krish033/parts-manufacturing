import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ collection }) => {
    if (!collection || !collection.links || collection.links.length <= 1) {
        return null;
    }

    const { links, from, to, total } = collection;

    // Helper to extract relative URL path and query string to prevent origin mismatch in Inertia
    const getRelativeUrl = (url) => {
        if (!url) return "#";
        try {
            const parsed = new URL(url, window.location.origin);
            return parsed.pathname + parsed.search + parsed.hash;
        } catch (e) {
            return url;
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 pb-2 border-t border-gray-200 mt-6">
            {/* Items count summary */}
            <div className="text-sm text-gray-500 font-main">
                Showing <span className="font-semibold text-gray-900">{from || 0}</span> to{" "}
                <span className="font-semibold text-gray-900">{to || 0}</span> of{" "}
                <span className="font-semibold text-gray-900">{total || 0}</span> results
            </div>

            {/* Navigation links */}
            <nav aria-label="Pagination Navigation">
                <ul className="inline-flex items-center space-x-2 text-sm font-main">
                    {links.map((link, index) => {
                        const isActive = link.active;
                        const isDisabled = !link.url;

                        let cleanLabel = link.label;
                        if (cleanLabel.includes("&laquo;")) cleanLabel = "Previous";
                        if (cleanLabel.includes("&raquo;")) cleanLabel = "Next";

                        return (
                            <li key={index}>
                                <Link
                                    href={getRelativeUrl(link.url)}
                                    className={`flex items-center justify-center px-4 py-2 rounded-md transition-all ${
                                        isActive
                                            ? "bg-secondary text-black font-semibold shadow-sm"
                                            : isDisabled
                                            ? "bg-gray-50 text-gray-400 cursor-not-allowed pointer-events-none"
                                            : "bg-white text-gray-600 hover:bg-gray-100 hover:text-black border border-gray-200"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: cleanLabel }}
                                    preserveScroll={true}
                                />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
