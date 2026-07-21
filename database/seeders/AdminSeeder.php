<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Role;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allPermissions = [
            '*',
            'view_dashboard',
            'view_categories',
            'create_categories',
            'edit_categories',
            'delete_categories',
            'view_subcategories',
            'create_subcategories',
            'edit_subcategories',
            'delete_subcategories',
            'view_orders',
            'create_orders',
            'edit_orders',
            'delete_orders',
            'view_products',
            'create_products',
            'edit_products',
            'delete_products',
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'view_roles',
            'create_roles',
            'edit_roles',
            'delete_roles',
        ];

        $role = Role::firstOrCreate(
            ['role_name' => 'Super Admin'],
            [
                'permissions' => $allPermissions,
                'referral_code' => 'SUPERADMIN'
            ]
        );

        // Update permissions in case the role existed previously
        $role->update(['permissions' => $allPermissions]);

        Admin::updateOrCreate(
            ['email' => 'srik51977@gmail.com'],
            [
                'name' => 'krishna',
                'password' => 'Krish@033',
                'role_id' => $role->id,
            ]
        );
    }
}
