<?php


use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->middleware(['auth:admin'])
    ->group(function () {

        Route::get('/', function () {
            return redirect()->route('admin.dashboard');
        });

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
        Route::get('/notifications/{notification}', [NotificationController::class, 'viewNotification'])->name('view-notification');
        Route::get('/register-notifications/{notification}', [NotificationController::class, 'viewRegisterNotification'])->name('view-register-notification');
        Route::post('/product-added-notification/{notification}', [NotificationController::class, 'productAddedNotification'])->name('product-added-notification');
        Route::get('/request-notifications/{notification}', [NotificationController::class, 'viewRequestNotification'])->name('view-request-notification');
        Route::get('/register-notifications', [NotificationController::class, 'registerNotification'])->name('register-notifications');
        Route::get('/request-notifications', [NotificationController::class, 'requestNotification'])->name('request-notification');
        Route::post('/delete-notification/{notification}', [NotificationController::class, 'delete'])->name('delete-notification');

        Route::post('/approve-user/{user}', [UserController::class, 'approve'])->name('approve-user');

        Route::get('/categories', [CategoryController::class, 'index'])->name('admin.categories');
        Route::post('/save-category', [CategoryController::class, 'save'])->name('create-category');
        Route::post('/delete-category', [CategoryController::class, 'destroy'])->name('delete-category');

        Route::get('/sub-categories', [SubCategoryController::class, 'index'])->name('admin.sub-categories');
        Route::post('/save-sub-categories', [SubCategoryController::class, 'save'])->name('create-sub-category');
        Route::post('/delete-sub-categories', [SubCategoryController::class, 'destroy'])->name('delete-sub-category');

        Route::get('/products', [ProductController::class, 'index'])->name('admin.products');
        Route::post('/save-product', [ProductController::class, 'save'])->name('create-product');
        Route::post('/delete-product', [ProductController::class, 'destroy'])->name('delete-product');

        Route::get('/orders', [OrderController::class, 'index'])->name('admin.orders');
        Route::get('/users', [UserController::class, 'index'])->name('admin.users');
        Route::get('/users/{id}', [UserController::class, 'show'])->name('admin.users.show');

        Route::get('/roles', [RoleController::class, 'index'])->name('admin.roles.index');
        Route::post('/roles/save', [RoleController::class, 'save'])->name('save-role');
        Route::post('/delete-role', [RoleController::class, 'destroy'])->name('delete-role');

        Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings');
        Route::post('/settings', [SettingController::class, 'save'])->name('admin.settings.save');

        Route::get('/profile', [SettingController::class, 'profile'])->name('admin.profile');
        Route::post('/profile', [SettingController::class, 'updateProfile'])->name('admin.profile.update');
    });
