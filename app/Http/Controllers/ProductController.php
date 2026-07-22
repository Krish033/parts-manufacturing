<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{




    public function index()
    {
        return Inertia::render('users/Home', [
            'products' => Product::take(6)->get(),
            'topSelling' => Product::orderBy('sales_count', 'desc')->take(4)->get(),
            'highestRated' => Product::orderBy('rating', 'desc')->take(4)->get(),
        ]);
    }

    public function offers()
    {
        $products = Product::with('detail')
            ->whereHas('detail', function($q) {
                $q->whereColumn('sale_price', '<', 'regular_price')
                  ->orWhereNotNull('bulk_discount_percentage');
            })
            ->paginate(10);

        return Inertia::render('users/Offers', [
            'products' => $products
        ]);
    }




    public function search(Request $request)
    {
        return response()->json([
            'products' => \App\Models\Product::where('part_number', 'like', '%' . $request->search . '%')->get()
        ]);
    }



    public function view(Request $request, Product $product)
    {
        return Inertia::render('users/ViewProduct', [
            'product' => $product->load('detail')
        ]);
    }



    public function searchProduct(Request $request)
    {
        $search = $request->input('search', 'all');
        $query = Product::with('detail');

        if ($search && $search !== 'all') {
            $searchTerms = explode(' ', $search);
            foreach ($searchTerms as $term) {
                if (empty(trim($term))) continue;
                $query->where(function($q) use ($term) {
                    $q->where('part_number', 'like', '%' . $term . '%')
                      ->orWhere('name', 'like', '%' . $term . '%')
                      ->orWhereHas('detail', function($q2) use ($term) {
                          $q2->where('make', 'like', '%' . $term . '%')
                             ->orWhere('model', 'like', '%' . $term . '%');
                      });
                });
            }
        }

        // Apply filters from Request
        if ($request->filled('make')) {
            $query->whereHas('detail', function($q) use ($request) {
                $q->where('make', $request->make);
            });
        }

        if ($request->filled('model')) {
            $query->whereHas('detail', function($q) use ($request) {
                $q->where('model', $request->model);
            });
        }

        if ($request->filled('warranty')) {
            $query->whereHas('detail', function($q) use ($request) {
                $q->where('warranty', $request->warranty);
            });
        }

        if ($request->boolean('discounted')) {
            $query->whereHas('detail', function($q) {
                $q->whereColumn('sale_price', '<', 'regular_price')
                  ->orWhereNotNull('bulk_discount_percentage');
            });
        }

        $products = $query->paginate(10)->withQueryString();

        return Inertia::render('users/ProductList', [
            'products' => $products,
            'search' => $search
        ]);
    }



    /**
     * Request product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function requestProduct(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string',
            'part_number' => 'required',
            'description' => 'required|string',
            'images' => 'required|array|max:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif'
        ]);

        try {

            $imagePath = $request->file('images')[0]->store('product-requests', 'public');

            \App\Models\Notification::create([
                "title" => "New Product Request",
                'user_id' => 0,
                "image" => $imagePath,
                "description" => "A User has requested a new product with part number: " . $request->part_number,
                "type" => 3,
                "registered_user_id" => Auth::user()->id,
                "others" => json_encode([
                    'name' => $request->name,
                    'part_number' => $request->part_number,
                    'description' => $request->description
                ])
            ]);

            return redirect()->back()->with('success', 'Product request submitted successfully!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
