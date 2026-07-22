<?php

namespace App\Repositories;

use App\Contracts\Cart;
use App\Contracts\CartManager;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class CartRepository implements Cart
{
    public function __construct(public CartManager $cart) {}






    /**
     * Get a list of all cart IDs
     */
    public function getCartList(): array
    {
        return collect($this->cart->all())->pluck('id')->toArray();
    }







    /**
     * Create a cart and set it as active
     */
    public function createCart(string $cartName): bool
    {
        $cart = $this->cart->create($cartName);
        $this->cart->setActive($cart["id"]);
        return true;
    }











    /**
     * Get the list of products from the active cart as full Product models
     */
    public function get(): Collection
    {
        $cart = collect($this->cart->getProducts());

        return Product::whereIn('id', $cart->pluck('productId'))->get()->map(function (Product $product) use ($cart) {
            $matchedCart = $cart->first(fn($item) => isset($item["productId"]) && $item["productId"] == $product->id);

            if (!$matchedCart) return null;

            return $this->product($product, $matchedCart);
        })->filter(); // Remove any nulls just in case
    }







    /**
     * Get the index of a product in the cart
     */
    protected function getIndexOfProduct(string|int $productId): int|false
    {
        return collect($this->cart->getProducts())->search(fn($item) => $item['productId'] == $productId);
    }








    /**
     * Calculate cart totals, weights, count, etc.
     */
    public function getCartValue(): array
    {
        $cart = $this->get();
        $tax = 0; // Extend later
        $shipping = 0; // Extend later

        $total = $cart->sum('net_amount');
        $subTotal = $total - $tax;

        return [
            "total" => $total,
            "subTotal" => $subTotal,
            "shipping" => $shipping,
            "totalWeight" => $cart->sum('weight') . 'g',
            "grandTotal" => $subTotal + $shipping,
            "count" => $cart->count()
        ];
    }







    /**
     * Get the name of the currently active cart
     */
    public function getActiveCartName(): string
    {
        return $this->cart->getActiveCartId();
    }






    /**
     * Switch active cart
     */
    public function switchCart(string $cartId): bool
    {
        $this->cart->setActive($cartId);
        return true;
    }






    /**
     * Add a product to the cart or update quantity if it exists
     */
    public function addToCart(array $cart): array
    {
        $products = $this->cart->getProducts();
        $index = $this->getIndexOfProduct($cart["productId"]);

        if ($index === false) {
            $products[] = $cart;
        } else {
            $products[$index]["quantity"] += $cart["quantity"];
        }

        $this->cart->setProducts($products);
        return $cart;
    }







    /**
     * Increment quantity of a cart item
     */
    public function increment(int $productId): bool
    {
        $products = $this->cart->getProducts();
        $index = $this->getIndexOfProduct($productId);

        if ($index === false) return false;

        $products[$index]["quantity"] += 1;
        $this->cart->setProducts($products);

        return true;
    }







    /**
     * Decrement quantity of a cart item, or remove if less than 1
     */
    public function decrement(int|string $productId): bool
    {
        $products = $this->cart->getProducts();
        $index = $this->getIndexOfProduct($productId);

        if ($index === false) return false;

        #

        $products[$index]["quantity"] -= 1;

        if ($products[$index]["quantity"] < 1) {
            return $this->removeFromCart($productId);
        }

        $this->cart->setProducts($products);
        return true;
    }






    /**
     * Remove a product from the cart
     */
    public function removeFromCart(string|int $productId): bool
    {
        $products = $this->cart->getProducts();

        $filtered = collect($products)
            ->filter(fn($item) => $item["productId"] != $productId)
            ->values() // reindex for safety
            ->toArray();

        $this->cart->setProducts($filtered);
        return true;
    }






    /**
     * Delete the current active cart and fallback to default
     */
    public function deleteCart(): bool
    {
        $activeCart = $this->cart->getActiveCartId();
        $this->cart->setActive('#cart_DEFAULT');
        $this->cart->delete($activeCart);
        return true;
    }






    /**
     * Get the formatted product-cart merged data for frontend use
     */
    protected function product(Product $product, array|Collection|Model|EloquentCollection $cart): array
    {
        $unitPrice = $product->discount_price;
        $qty = $cart['quantity'];
        
        if ($qty >= 10 && $product->detail && $product->detail->bulk_discount_percentage > 0) {
            $unitPrice = $unitPrice * (1 - ($product->detail->bulk_discount_percentage / 100));
        }

        return [
            "id" => $product->id,
            "name" => $product->name,
            "part_number" => $product->part_number,
            "image" => $product->image,
            "gross_amount" => intval($unitPrice * $qty),
            "quantity" => $qty,
            "net_amount" => ($unitPrice - $product->gst) * $qty,
            "weight" => $product->weight * $qty,
        ];
    }
}
