import React from "react";
import { Link } from "@inertiajs/react";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({ paths }) => {
    return (
        <nav className="h-12 flex items-center px-4 border-b border-gray-200 bg-white w-full">
            <div className="flex items-center h-full w-full space-x-2 text-sm text-gray-600">
                <Link href="/admin" className="hover:text-black flex items-center gap-1 transition-colors">
                    <Home className="w-4 h-4 text-gray-500" />
                </Link>

                {paths.map((crumb, index) => {
                    const isLast = index === paths.length - 1;
                    const to = "/" + paths.slice(0, index + 1).join("/");

                    return (
                        <React.Fragment key={index}>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            {!isLast ? (
                                <Link
                                    href={to}
                                    className="hover:text-black capitalize text-sm font-medium text-gray-600 transition-colors"
                                >
                                    {crumb}
                                </Link>
                            ) : (
                                <span className="capitalize text-sm font-bold text-gray-900">
                                    {crumb}
                                </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </nav>
    );
};

export default Breadcrumb;
