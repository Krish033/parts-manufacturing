<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController as ControllersProductController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::post('/request-product', [ControllersProductController::class, 'requestProduct'])->name('request-product');
    Route::get('/checkout', [OrderController::class, 'index'])->name('checkout');

    /**
     * Orders
     */
    Route::get('/orders', [OrderController::class, 'orders'])->name('order.home');
    Route::post('/orders/update', [OrderController::class, 'updateOrder'])->name('order.update');
    Route::post('/orders/create', [OrderController::class, 'createOrder'])->name('order.create');


    /**
     * Wishlist
     */
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.home');
    Route::post('/wishlist/toggle/{product}', [WishlistController::class, 'toggle'])->name('wishlist.toggle');


    /**
     * Notification
     */
    Route::get('/address', [AddressController::class, 'index'])->name('address.home');
    Route::post('/address/set-default/{address}', [AddressController::class, 'setDefault'])->name('address.default');
    Route::post('/address/create', [AddressController::class, 'create'])->name('address.create');
    Route::post('/address/update/{address}', [AddressController::class, 'update'])->name('address.update');
    Route::delete('/address/delete/{address}', [AddressController::class, 'delete'])->name('address.delete');



    /**
     * Notification
     */
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
    Route::delete('/notifications/delete-all', [NotificationController::class, 'deleteAll']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'deleteNotification']);



    /**
     * Cart
     */
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::post('/create-cart', [CartController::class, 'createCart'])->name('create-cart');
    Route::post('/switch-cart', [CartController::class, 'switchCart'])->name('switch-cart');
    Route::post('/delete-cart', [CartController::class, 'deleteCart'])->name('delete-cart');


    Route::post('/cart', [CartController::class, 'create'])->name('create.cart');
    Route::post('/cart/decrement', [CartController::class, 'decrement'])->name('decrement.cart');
    Route::post('/cart/increment', [CartController::class, 'increment'])->name('increment.cart');
    Route::post('/cart/remove', [CartController::class, 'remove'])->name('remove.cart');
});


Route::get('/', [ControllersProductController::class, 'index'])->name('home');
Route::get('/offers', [ControllersProductController::class, 'offers'])->name('offers');
Route::post('/search', [ControllersProductController::class, 'search'])->name('search');
Route::get('/view-product/{product}', [ControllersProductController::class, 'view'])->name('view-product');
Route::get('/products', [ControllersProductController::class, 'searchProduct'])->name('products-list');

// Static Pages
use App\Http\Controllers\PageController;
Route::get('/technical-documents', [PageController::class, 'technicalDocuments'])->name('technical-documents');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/help-center', [PageController::class, 'helpCenter'])->name('help-center');
Route::get('/repair-services', [PageController::class, 'repairServices'])->name('repair-services');
Route::get('/returns-exchange', [PageController::class, 'returnsExchange'])->name('returns-exchange');
