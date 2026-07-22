<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

class Product extends Model
{




    protected $hidden = [
        'created_by',
        'updated_by',
        'updated_at',
        'is_active',
        'user_id'
    ];





    protected $appends = ['images', 'discount_price', 'regular_price'];


    protected $fillable = [
        'name',
        'part_number',
        'image',
        'description',
        'user_id',
        'sales_count',
        'rating'
    ];


    public function detail()
    {
        return $this->hasOne(ProductDetail::class);
    }




    public function features()
    {
        return $this->hasMany(ProductAttributes::class);
    }


    public function images()
    {
        return $this->hasOne(ProductImages::class);
    }





    public function getImageAttribute($image)
    {
        if (!$image) {
            return null;
        }

        if (Str::startsWith($image, ['http://', 'https://'])) {
            return $image;
        }

        $cleanPath = ltrim($image, '/');
        if (Str::startsWith($cleanPath, 'storage/')) {
            $cleanPath = substr($cleanPath, 8);
        }

        return url('storage/' . $cleanPath);
    }



    public function getImagesAttribute()
    {
        return $this->images()->pluck('image')->toArray();
    }




    public function getCreatedAtAttribute(string $created_at)
    {
        return \Carbon\Carbon::parse($created_at)->format('Y-m-d H:i A');
    }






    public function getDiscountPriceAttribute()
    {
        $firstFeature = $this->features?->first();

        if (
            $firstFeature &&
            isset($firstFeature->variants[0]['sale_price']) &&
            !empty($firstFeature->variants[0]['sale_price'])
        ) {
            return $firstFeature->variants[0]['sale_price'];
        }

        return $this->regular_price ?? 0.00;
    }

    public function getRegularPriceAttribute()
    {
        return $this->detail->regular_price ?? 0.00;
    }




    public function getWeightAttribute()
    {
        $firstFeature = $this->features?->first();

        if (
            $firstFeature &&
            isset($firstFeature->variants[0]['weight']) &&
            !empty($firstFeature->variants[0]['weight'])
        ) {
            return $firstFeature->variants[0]['weight'];
        }

        return $this->weight ?? 0;
    }
}
