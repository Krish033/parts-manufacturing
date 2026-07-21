<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Role;
use Inertia\Inertia;

class RoleController extends Controller {
    public function index() {
        $roles = Role::latest()->paginate(10)->withQueryString();
        return Inertia::render('admin/Role', [
            'roles' => $roles,
            'permissions' => $this->availablePermissions()
        ]);
    }

    public function save(Request $request) {
        $request->validate([
            'id' => 'nullable|integer',
            'role_name' => 'required|string|max:255',
            'permissions' => 'required|array|min:1',
        ]);

        if (!($role = Role::find($request->get('id')))) {
            $role = Role::create([
                'role_name' => $request->role_name,
                'permissions' => $request->permissions,
                'referral_code' => bin2hex(random_bytes(8)),
            ]);
        } else {
            $role->update([
                'role_name' => $request->role_name,
                'permissions' => $request->permissions,
            ]);
        }

        return redirect()->back()->with('success', 'Role saved and assigned successfully.');
    }

    public function destroy(Request $request) {
        if (!($id = $request->get('id'))) {
            return redirect()->back()->with('error', 'Id is required.');
        }

        $role = Role::find($id);

        if ($role) {
            $role->delete();
        }

        return redirect()->back()->with('success', 'Role deleted successfully.');
    }


    private function availablePermissions(): array {
        return [
            'Dashboard' => [
                'View Dashboard' => 'view_dashboard',
            ],
            'categories' => [
                'View' => 'view_categories',
                'Create' => 'create_categories',
                'Edit' => 'edit_categories',
                'Delete' => 'delete_categories',
            ],
            'subcategories' => [
                'View ' => 'view_subcategories',
                'Create' => 'create_subcategories',
                'Edit' => 'edit_subcategories',
                'Delete' => 'delete_subcategories',
            ],
            'Orders' => [
                'View ' => 'view_orders',
                'Create' => 'create_orders',
                'Edit' => 'edit_orders',
                'Delete' => 'delete_orders',
            ],
            'Products' => [
                'View' => 'view_products',
                'Create' => 'create_products',
                'Edit' => 'edit_products',
                'Delete' => 'delete_products',
            ],
            'Users' => [
                'View' => 'view_users',
            ],
            'Roles' => [
                'View' => 'view_roles',
                'Create' => 'create_roles',
                'Edit' => 'edit_roles',
                'Delete' => 'delete_roles',
            ],
        ];
    }
}
