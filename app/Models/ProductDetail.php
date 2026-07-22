<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{


    
    protected $fillable = [
        'product_id', 'category_id', 'sub_category_id', 
        'sale_price', 'regular_price', 'weight', 
        'height', 'length', 'width', 'make', 'model', 'product_details',
        'warranty', 'bulk_discount_percentage'
    ];



    public function getProductDetailsAttribute($product_details) {
        
        if($product_details) {
            return json_decode($product_details, true);
        }
        
        return [];
    }

}
