<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index (): Response {
        $counts = [
            'categories' => Category::count(),
            'subcategories' => Subcategory::count(),
            'products' => Product::count(),
            'orders' => Order::count(),
            'users' => User::count(),
        ];

        $recentNotifications = Notification::orderBy('created_at', 'desc')->take(5)->get();

        $monthlyOrders = Order::select('id', 'created_at')
            ->whereYear('created_at', date('Y'))
            ->get()
            ->groupBy(function($item) {
                return Carbon::parse($item->created_at)->format('M');
            })
            ->map(function ($group, $month) {
                return ['month' => $month, 'count' => $group->count()];
            })->values();

        $monthlyUsers = User::select('id', 'created_at')
            ->whereYear('created_at', date('Y'))
            ->get()
            ->groupBy(function($item) {
                return Carbon::parse($item->created_at)->format('M');
            })
            ->map(function ($group, $month) {
                return ['month' => $month, 'count' => $group->count()];
            })->values();

        return Inertia::render('admin/Dashboard', [
            'counts' => $counts,
            'recentNotifications' => $recentNotifications,
            'monthlyOrders' => $monthlyOrders,
            'monthlyUsers' => $monthlyUsers,
        ]);
    }
}
