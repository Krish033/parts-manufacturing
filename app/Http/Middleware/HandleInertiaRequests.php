<?php

namespace App\Http\Middleware;

use App\Contracts\Address;
use App\Contracts\Cart;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{


    public function __construct(public readonly Cart $cart, public readonly Address $address) {}


    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $isAdmin = request()->is('admin/*') ? auth('admin')->user() : Auth::user();


        return [
            ...parent::share($request),
            'auth' => [
                'user' => $isAdmin,
                'permissions' =>  $isAdmin?->role?->permissions ?? [],
            ],

            'wishlist_count' => wishlist(),
            'usercart' => $this->cart->getCartValue(),
            'carts' => $this->cart->getCartList(),
            'activeCart' => $this->cart->getActiveCartName(),
            'default_address' => Auth::check() ? $this->address->getDefault() : null,

            'make' => ProductDetail::whereNotNull('make')->where('make', '!=', '')->distinct('make')->get(['make', 'id']),
            'model' => ProductDetail::whereNotNull('model')->where('model', '!=', '')->distinct('model')->get(['model', 'make', 'id']),

            'route' => $request->route(),
            'notifications' => \App\Models\Notification::where('user_id', '=', '0')->get(),
            'site_settings' => \App\Models\SiteSetting::getSettings(),

            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error')
            ],

            'previous_url' => url()->previous(),
        ];
    }
}
