<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Order', [
            'orders' => Order::with(['customer', 'userAddress'])->latest()->paginate(10)->withQueryString()
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['customer', 'userAddress', 'orderDetails'])->findOrFail($id);
        return Inertia::render('admin/OrderShow', [
            'order' => $order,
        ]);
    }
}
