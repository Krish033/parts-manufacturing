<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'site_name',
        'site_title',
        'logo',
        'favicon',
        'contact_email',
        'contact_phone',
        'contact_address',
        'currency_symbol',
        'primary_color',
        'footer_text',
    ];

    public static function getSettings()
    {
        return static::firstOrCreate([], [
            'site_name' => 'Estbanh',
            'site_title' => 'Quality Parts & Accessories',
            'currency_symbol' => '$',
            'primary_color' => '#4F46E5',
        ]);
    }
}
