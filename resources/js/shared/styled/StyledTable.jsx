import React from "react";

const StyledTable = ({ children }) => {
    return (
        <div className="relative overflow-x-auto shadow-xs border border-gray-200 sm:rounded-xl bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                {children}
            </table>
        </div>
    );
};

export const StyledTableBody = ({ children }) => {
    return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

export const StyledTableCell = ({ className = '', children }) => {
    return <td className={`px-5 py-3.5 text-sm text-gray-900 ${className}`}>{children}</td>;
};

export const StyledTableHeader = ({ children }) => {
    return (
        <thead className="text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-100/80 border-b border-gray-200">
            {children}
        </thead>
    );
};

export const StyledTableHeaderCell = ({ className = '', children }) => {
    return (
        <th scope="col" className={`px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    );
};

export const StyledTableRow = ({ className = '', children }) => {
    return (
        <tr className={`bg-white hover:bg-gray-50/80 transition-colors ${className}`}>
            {children}
        </tr>
    );
};

export default StyledTable;
