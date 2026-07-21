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
import { usePage } from "@inertiajs/react";
import ActionButtons from "@/shared/ActionButtons";
import DefaultDeleteAction from "@/shared/DefaultDeleteAction";
import { useForm } from "@inertiajs/react";
import { useAdminDefaultContext } from "@/lib/context/AdminDefaultContext";
import CategoryForm from "@/domain/admin/_partials/categories/CategoryForm";


export default function Category({ categories }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        slug: "",
    });

    const { auth } = usePage().props;
    const { getObjectMountState, dispatchSideBarState, object } =
        useAdminDefaultContext();

    const handleCreate = () => {
        post(route("create-category", { id: object?.id }), {
            onSuccess: () => dispatchSideBarState(),
        });
    };


    const handleDelete = () => {
        post(route("delete-category", { id: object?.id }), {
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
            <DefaultDeleteAction title="Category" onDelete={handleDelete} />
        ) : hasPermission("create_categories") ? (
            <CategoryForm
                data={data}
                errors={errors}
                setData={setData}
                onSubmit={handleCreate}
            />
        ) : null;

    return (
        <AdminLayout className="p-3">
            <DefaultPageLayout
                title="Category"
                reset={reset}
                form={formContent}
            >
                <StyledTable>
                    <StyledTableHeader>
                        <tr>
                            <StyledTableHeaderCell>Id</StyledTableHeaderCell>

                            <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Slug</StyledTableHeaderCell>
                            <StyledTableHeaderCell>
                                Action
                            </StyledTableHeaderCell>
                        </tr>
                    </StyledTableHeader>
                    <StyledTableBody>
                        {categories.data.map((category, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    {category.id}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {category.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {category.slug}
                                </StyledTableCell>
                                <StyledTableCell className="flex gap-2">
                                    <ActionButtons
                                        object={category}
                                        data={data}
                                        setData={setData}
                                        module="categories"
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </StyledTableBody>
                </StyledTable>

                <Pagination collection={categories} />
            </DefaultPageLayout>
        </AdminLayout>
    );
}
