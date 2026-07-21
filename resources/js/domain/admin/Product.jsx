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
import ActionButtons from "@/shared/ActionButtons";
import DefaultDeleteAction from "@/shared/DefaultDeleteAction";
import { usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useAdminDefaultContext } from "@/lib/context/AdminDefaultContext";
import Image from "@/shared/Image";
import ProductForm from "@/domain/admin/_partials/products/forms/ProductForm";

export default function Product({ products, categories }) {
    const { auth } = usePage().props;
    const {
        getObjectMountState,
        dispatchSideBarState,
        object,
        dispatchContextEvent,
        setObject
    } = useAdminDefaultContext();

    const form = useForm({
        name: "",
        part_number: "",
        description: "",
        image: null,
        detail: {
            category_id: null,
            sub_category_id: null,
            product_details: [],
            make: "",
            model: "",
        },
        features: [],
        images: [],
    });

    // const canEdit = auth?.permissions?.includes(`edit_product`);
    // const canDelete = auth?.permissions?.includes(`delete_product`);

    const createObjectUpdatedAction = (object) => {
        dispatchContextEvent("editing");

        // Explicitly assign each field
        form.setData("name", object.name ?? "");
        form.setData("part_number", object.part_number ?? "");
        form.setData("description", object.description ?? "");
        form.setData("image", object.image ?? null);
        form.setData(
            "features",
            Array.isArray(object.features) ? [...object.features] : []
        );
        form.setData(
            "images",
            Array.isArray(object.images) ? [...object.images] : []
        );

        const detailsData = {
            category_id: object.detail?.category_id ?? null,
            sub_category_id: object.detail?.sub_category_id ?? null,
            product_details: Array.isArray(object?.detail?.product_details)
                ? [...object.detail.product_details]
                : [],
            make: object.detail?.make ?? "",
            model: object.detail?.model ?? "",
        }
        // Handle 'detail' object
        form.setData("detail", { ...detailsData });
    };

    const hasPermission = (permission) => {
        const perms = auth?.permissions;
        if (!Array.isArray(perms)) return true;
        return perms.includes('*') || perms.includes(permission);
    };

    const formContent =
        getObjectMountState() === "deleting" ? (
            <DefaultDeleteAction
                title="Product"
                onDelete={() => {
                    form.post(route("delete-product", { id: object?.id }), {
                        onSuccess: () => dispatchSideBarState(),
                    });
                }}
            />
        ) : hasPermission("create_products") ? (
            <ProductForm {...form} categories={categories} />
        ) : null;

    return (
        <AdminLayout className="p-3">
            <DefaultPageLayout
                title="Product"
                reset={form.reset}
                form={formContent}
                sideBarWidth={`8xl`}
            >
                <StyledTable>
                    <StyledTableHeader>
                        <tr>
                            <StyledTableHeaderCell>Id</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Image</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                            <StyledTableHeaderCell>
                                Part Number
                            </StyledTableHeaderCell>
                            <StyledTableHeaderCell>Make</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Model</StyledTableHeaderCell>
                            <StyledTableHeaderCell>
                                Description
                            </StyledTableHeaderCell>
                            <StyledTableHeaderCell>
                                Action
                            </StyledTableHeaderCell>
                        </tr>
                    </StyledTableHeader>
                    <StyledTableBody>
                        {products?.data
                            ? products?.data?.map((product, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        {product.id}
                                    </StyledTableCell>
                                    <td className="ps-4">
                                        <Image source={product.image} />
                                    </td>
                                    <StyledTableCell>
                                        {product.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {product.part_number}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {product?.detail?.make}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {product?.detail?.model}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {product.description}
                                    </StyledTableCell>
                                    <StyledTableCell className="flex gap-2">

                                        {/* {canEdit && ( */}
                                        <button
                                            className="text-blue-600 font-main"
                                            onClick={() => {
                                                setObject(product);
                                                createObjectUpdatedAction(
                                                    product
                                                );
                                            }}
                                        >
                                            Edit
                                        </button>
                                        {/* )} */}
                                        {/* {canDelete && ( */}
                                        <button
                                            className="text-red-500 font-main"
                                            onClick={() => {
                                                setObject(product);
                                                dispatchContextEvent(
                                                    "deleting"
                                                );
                                            }}
                                        >
                                            Delete
                                        </button>
                                        {/* )} */}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            : null}
                    </StyledTableBody>
                </StyledTable>
                {products?.data ? <Pagination collection={products} /> : null}
            </DefaultPageLayout>
        </AdminLayout>
    );
}
