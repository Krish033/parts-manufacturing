<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        // Clean up previous dummy data
        DB::table('product_images')->delete();
        ProductDetail::query()->delete();
        Product::query()->delete();

        $user = User::first();
        if (!$user) {
            $user = User::factory()->create();
        }

        $category = Category::first();
        if (!$category) {
            $category = Category::create(['name' => 'Auto Parts', 'slug' => 'auto-parts', 'user_id' => $user->id]);
        }

        $subcategory = Subcategory::first();
        if (!$subcategory) {
            $subcategory = Subcategory::create(['name' => 'Electrical', 'category_id' => $category->id, 'slug' => 'electrical']);
        }

        $images = [
            'products/Sec_3_product.png',
            'products/Sec_3_product_2.png',
            'products/Sec_3_product_3.png',
            'products/Sec_3_product_4.png',
            'products/Sec_3_product_5.png',
            'products/Sec_3_product_6.png',
            'products/Sec_3_product_7.png',
        ];

        $makes = ['Bosch', 'Denso', 'Delphi', 'Valeo', 'Continental', 'Aisin', 'Magneti Marelli', 'VARTA', 'Exide', 'ACDelco'];
        $models = ['Premium', 'Pro', 'Standard', 'Heavy Duty', 'Eco', 'MaxPower', 'Ultra', 'Platinum', 'Gold', 'Silver'];
        $partNames = [
            'Alternator', 'Starter Motor', 'Ignition Coil', 'Spark Plug Set', 'Mass Air Flow Sensor',
            'Oxygen Sensor', 'Crankshaft Position Sensor', 'Camshaft Position Sensor', 'Fuel Injector', 'Fuel Pump',
            'Throttle Body', 'EGR Valve', 'ABS Sensor', 'Wheel Speed Sensor', 'Engine Control Module',
            'Battery 12V 60Ah', 'Battery 12V 70Ah', 'Battery 12V 100Ah Heavy Duty', 'Radiator Cooling Fan Motor', 'Blower Motor',
            'Wiper Motor', 'Window Regulator Motor', 'Ignition Switch', 'Relay Box', 'Fuse Box Assembly',
            'Headlight Control Module', 'LED Headlight Bulb Set', 'Tail Light Assembly', 'Turn Signal Switch', 'Cruise Control Switch',
            'Air Conditioning Compressor', 'AC Condenser Fan', 'Heater Core', 'Evaporator Temperature Sensor', 'Cabin Air Temperature Sensor',
            'Oil Pressure Switch', 'Coolant Temperature Sensor', 'Knock Sensor', 'Manifold Absolute Pressure Sensor', 'Transmission Control Module',
            'Power Steering Pump', 'Electronic Power Steering Rack', 'Brake Light Switch', 'Neutral Safety Switch', 'Clutch Position Sensor',
            'Battery Terminal Set', 'Wiring Harness Assembly', 'Ground Strap', 'Voltage Regulator', 'Starter Relay',
            'Air Filter', 'Oil Filter', 'Brake Pad Set', 'Fuel Filter', 'Cabin Air Filter'
        ];

        foreach ($partNames as $index => $partName) {
            $make = $makes[array_rand($makes)];
            $model = $models[array_rand($models)];
            $partNumber = strtoupper(substr($make, 0, 3)) . '-' . rand(1000, 9999) . '-' . strtoupper(substr(md5($partName), 0, 4));

            $mainImage = $images[array_rand($images)];

            $product = Product::create([
                'name' => $make . ' ' . $partName,
                'part_number' => $partNumber,
                'image' => $mainImage,
                'description' => "High-quality {$partName} manufactured by {$make}. Part of the {$model} series, designed for superior performance, durability, and reliability. Perfect fit for compatible vehicles.",
                'user_id' => $user->id,
            ]);

            // Create product details JSON
            $productDetailsArray = [
                ['name' => 'Brand', 'value' => $make],
                ['name' => 'Series', 'value' => $model],
                ['name' => 'Warranty', 'value' => rand(1, 3) . ' Years'],
                ['name' => 'Condition', 'value' => 'Brand New'],
                ['name' => 'Compatibility', 'value' => 'Universal / specific models check manual'],
            ];

            ProductDetail::create([
                'product_id' => $product->id,
                'category_id' => $category->id,
                'sub_category_id' => $subcategory->id,
                'regular_price' => rand(100, 500) + (rand(0, 99) / 100),
                'sale_price' => rand(50, 90) + (rand(0, 99) / 100),
                'weight' => rand(1, 20) + (rand(0, 9) / 10),
                'height' => rand(5, 30),
                'length' => rand(5, 50),
                'width' => rand(5, 40),
                'make' => $make,
                'model' => $model,
                'product_details' => json_encode($productDetailsArray),
            ]);

            // Add extra images
            $numExtraImages = rand(1, 3);
            for ($j = 0; $j < $numExtraImages; $j++) {
                DB::table('product_images')->insert([
                    'product_id' => $product->id,
                    'image' => $images[array_rand($images)],
                    'description' => 'View of ' . $product->name,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
