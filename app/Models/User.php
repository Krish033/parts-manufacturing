<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'status',
        'wishlist',
        'cnr_number',
        'vat_number',
        'address_line_1',
        'country',
        'state',
        'city',
        'pin_code',
        'issuer_name',
        'issuer_phone',
        'accountant_name',
        'accountant_phone',
        'authority_name',
        'authority_phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }



    public function documents()
    {
        return $this->hasMany(UserDocument::class);
    }


    public function city()
    {
        return $this->belongsTo(City::class, 'city');
    }



    public function state()
    {
        return $this->belongsTo(State::class, 'state');
    }



    public function country()
    {
        return $this->belongsTo(Country::class, 'country');
    }






    public function address()
    {
        return $this->hasMany(Address::class);
    }
}
