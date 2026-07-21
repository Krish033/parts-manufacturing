<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

class Subcategory extends Model
{


    protected $fillable = [
        'name',
        'category_id',
        'slug',
        'image',
        'user_id',
        'description',
        'is_active',
        'created_by',
        'created_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }



    public function getImageAttribute(string|null $image) {
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


}
