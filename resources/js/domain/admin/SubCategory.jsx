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
import SubCategoryForm from "@/domain/admin/_partials/subcategories/SubCategoryForm";

export default function SubCategory({ subCategories, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category_id: null,
        slug: "",
        description: "",
        image: null,
    });

    const { auth } = usePage().props;
    const { getObjectMountState, dispatchSideBarState, object } =
        useAdminDefaultContext();

    const handleCreate = () => {
        post(route("create-sub-category", { id: object?.id }), {
            onSuccess: () => dispatchSideBarState(),
        });
    };

    const handleDelete = () => {
        post(route("delete-sub-category", { id: object?.id }), {
            onSuccess: () => dispatchSideBarState(),
        });
    };

    const hasPermission = (permission) => {
        const perms = auth?.permissions;
        if (!Array.isArray(perms)) return true;
        return perms.includes('*') || perms.includes(permission);
    };

    const formContent =
        getObjectMountState() === "deleting" ? (
            <DefaultDeleteAction title="Sub Category" onDelete={handleDelete} />
        ) : hasPermission("create_subcategories") ? (
            <SubCategoryForm
                data={data}
                errors={errors}
                setData={setData}
                onSubmit={handleCreate}
                categories={categories}
            />
        ) : null;

    return (
        <AdminLayout className="p-3">
            <DefaultPageLayout
                title="Sub Category"
                reset={reset}
                form={formContent}
            >
                <StyledTable>
                    <StyledTableHeader>
                        <tr>
                            <StyledTableHeaderCell>Id</StyledTableHeaderCell>
                            <StyledTableHeaderCell>
                                Category
                            </StyledTableHeaderCell>
                            <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Slug</StyledTableHeaderCell>
                            <StyledTableHeaderCell>
                                Action
                            </StyledTableHeaderCell>
                        </tr>
                    </StyledTableHeader>
                    <StyledTableBody>
                        {subCategories.data.map((subCategory, index) => (
                            <StyledTableRow key={index}>

                                <StyledTableCell>
                                    {subCategory.id}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {subCategory?.category?.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {subCategory.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {subCategory.slug}
                                </StyledTableCell>

                                <StyledTableCell className="flex gap-2">
                                    <ActionButtons
                                        object={subCategory}
                                        data={data}
                                        setData={setData}
                                        module="subcategories"
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </StyledTableBody>
                </StyledTable>

                <Pagination collection={subCategories} />
            </DefaultPageLayout>
        </AdminLayout>
    );
}
