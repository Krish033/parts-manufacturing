import InputLabel from "@/shared/InputLabel";
import TextInput from "@/shared/TextInput";
import TextArea from "@/shared/TextArea";
import FileInput from "@/shared/FileInput";
import InputError from "@/shared/InputError";
import FormSubmitButtons from "@/shared/FormSubmitButtons";
import SelectBox from "@/shared/SelectBox";

export default function SubCategoryForm({
    data,
    errors,
    setData,
    onSubmit,
    categories,
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <div>
                <InputLabel htmlFor="name" value="Sub Category Name *" />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    isFocused
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="i.e., Motorcycle, Car, Truck"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="name" value="Category *" />

                <SelectBox
                    placeholder="Select a Category"
                    dataset={categories}
                    value={data.category_id}
                    onChange={(e) => setData("category_id", e.target.value)}
                />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="slug" value="Sub Category Slug *" />
                <TextInput
                    id="slug"
                    type="text"
                    name="slug"
                    value={data.slug}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData("slug", e.target.value)}
                    placeholder="i.e., motor-for-your-cycle"
                />
                <InputError message={errors.slug} className="mt-2" />
            </div>

            <div className="mt-6">
                <FormSubmitButtons />
            </div>
        </form>
    );
}
