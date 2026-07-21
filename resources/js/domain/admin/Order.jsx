import React from "react";
import AdminLayout from "@/shared/layouts/AdminLayout";
import DefaultPageLayout from "@/components/DefaultPageLayout";
import StyledTable, {
    StyledTableBody,
    StyledTableCell,
    StyledTableHeader,
    StyledTableHeaderCell,
    StyledTableRow,
} from "@/shared/styled/StyledTable";
import Pagination from "@/shared/Pagination";
import { Link } from "@inertiajs/react";
import { Eye } from "lucide-react";

export default function Order({ orders }) {
    return (
        <AdminLayout className="p-3">
            <DefaultPageLayout title="Orders">
                <StyledTable>
                    <StyledTableHeader>
                        <tr>
                            <StyledTableHeaderCell>Order ID</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Customer</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Email / Phone</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Amount</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Date</StyledTableHeaderCell>
                        </tr>
                    </StyledTableHeader>
                    <StyledTableBody>
                        {orders?.data && orders.data.length > 0 ? (
                            orders.data.map((order, index) => (
                                <StyledTableRow key={order.id || index}>
                                    <StyledTableCell className="font-semibold text-gray-900">
                                        #{order.order_id || order.id}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {order.customer?.name || "Guest Customer"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <div className="flex flex-col">
                                            <span>{order.email || order.customer?.email || "N/A"}</span>
                                            <span className="text-xs text-gray-500">{order.phone || "N/A"}</span>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell className="font-semibold text-gray-900">
                                        ${order.gross_amount || order.net_amount || "0.00"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                                            {order.status || "Processing"}
                                        </span>
                                    </StyledTableCell>
                                    <StyledTableCell className="text-xs text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    No orders found.
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </StyledTableBody>
                </StyledTable>

                {orders && <Pagination collection={orders} />}
            </DefaultPageLayout>
        </AdminLayout>
    );
}
