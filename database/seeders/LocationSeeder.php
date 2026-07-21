<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'name' => 'United States',
                'code' => 'US',
                'states' => [
                    [
                        'name' => 'California',
                        'code' => 'CA',
                        'cities' => ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento', 'Oakland']
                    ],
                    [
                        'name' => 'New York',
                        'code' => 'NY',
                        'cities' => ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany']
                    ],
                    [
                        'name' => 'Texas',
                        'code' => 'TX',
                        'cities' => ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso']
                    ],
                    [
                        'name' => 'Florida',
                        'code' => 'FL',
                        'cities' => ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee']
                    ],
                    [
                        'name' => 'Illinois',
                        'code' => 'IL',
                        'cities' => ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Springfield']
                    ],
                ]
            ],
            [
                'name' => 'India',
                'code' => 'IN',
                'states' => [
                    [
                        'name' => 'Tamil Nadu',
                        'code' => 'TN',
                        'cities' => ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli']
                    ],
                    [
                        'name' => 'Maharashtra',
                        'code' => 'MH',
                        'cities' => ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad']
                    ],
                    [
                        'name' => 'Karnataka',
                        'code' => 'KA',
                        'cities' => ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi']
                    ],
                    [
                        'name' => 'Delhi',
                        'code' => 'DL',
                        'cities' => ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi']
                    ],
                    [
                        'name' => 'Telangana',
                        'code' => 'TG',
                        'cities' => ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam']
                    ],
                ]
            ],
            [
                'name' => 'Canada',
                'code' => 'CA',
                'states' => [
                    [
                        'name' => 'Ontario',
                        'code' => 'ON',
                        'cities' => ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London']
                    ],
                    [
                        'name' => 'Quebec',
                        'code' => 'QC',
                        'cities' => ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil']
                    ],
                    [
                        'name' => 'British Columbia',
                        'code' => 'BC',
                        'cities' => ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Victoria']
                    ],
                    [
                        'name' => 'Alberta',
                        'code' => 'AB',
                        'cities' => ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge']
                    ],
                ]
            ],
            [
                'name' => 'United Kingdom',
                'code' => 'GB',
                'states' => [
                    [
                        'name' => 'England',
                        'code' => 'ENG',
                        'cities' => ['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Bristol']
                    ],
                    [
                        'name' => 'Scotland',
                        'code' => 'SCT',
                        'cities' => ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness']
                    ],
                    [
                        'name' => 'Wales',
                        'code' => 'WLS',
                        'cities' => ['Cardiff', 'Swansea', 'Newport', 'Bangor']
                    ],
                ]
            ],
            [
                'name' => 'Australia',
                'code' => 'AU',
                'states' => [
                    [
                        'name' => 'New South Wales',
                        'code' => 'NSW',
                        'cities' => ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast']
                    ],
                    [
                        'name' => 'Victoria',
                        'code' => 'VIC',
                        'cities' => ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo']
                    ],
                    [
                        'name' => 'Queensland',
                        'code' => 'QLD',
                        'cities' => ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns']
                    ],
                ]
            ],
        ];

        DB::transaction(function () use ($locations) {
            foreach ($locations as $countryData) {
                $country = Country::firstOrCreate(
                    ['name' => $countryData['name']],
                    ['code' => $countryData['code']]
                );

                foreach ($countryData['states'] as $stateData) {
                    $state = State::firstOrCreate(
                        ['country_id' => $country->id, 'name' => $stateData['name']],
                        ['code' => $stateData['code']]
                    );

                    foreach ($stateData['cities'] as $cityName) {
                        City::firstOrCreate([
                            'state_id' => $state->id,
                            'name' => $cityName,
                        ]);
                    }
                }
            }
        });
    }
}
