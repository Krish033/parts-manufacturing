import { useAdminDefaultContext } from "@/lib/context/AdminDefaultContext";
import { usePage } from '@inertiajs/react';

const ActionButtons = ({ object, data, setData, permissions = [], module = "" }) => {
    const { dispatchContextEvent, setObject } = useAdminDefaultContext();
    const { auth } = usePage().props;
    const createObjectUpdatedAction = (object) => {
        
        dispatchContextEvent("editing");
        Object.entries(object).forEach(([key, value]) => {
            if (data.hasOwnProperty(key)) {
                if(Array.isArray(value)) {
                    setData(key, [...value]);
                } else {
                    setData(key, value);
                }
               
            }
        });
    };

    const hasPermission = (permission) => {
        const perms = auth?.permissions;
        if (!Array.isArray(perms)) return true;
        return perms.includes('*') || perms.includes(permission);
    };

    const canEdit = hasPermission(`edit_${module}`);
    const canDelete = hasPermission(`delete_${module}`);

    return (
        <div className="flex gap-2 items-center">
            {canEdit && (
                <button
                    className="text-blue-600 font-main"
                    onClick={() => {
                        setObject(object);
                        createObjectUpdatedAction(object);
                    }}
                >
                    Edit
                </button>
            )}

            {canDelete && (
                <button
                    className="text-red-500 font-main"
                    onClick={() => {
                        setObject(object);
                        dispatchContextEvent("deleting");
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
