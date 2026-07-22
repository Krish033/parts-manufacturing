<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->integer('sales_count')->default(0);
            $table->float('rating')->default(0.0);
        });

        Schema::table('product_details', function (Blueprint $table) {
            $table->string('warranty')->nullable();
            $table->integer('bulk_discount_percentage')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['sales_count', 'rating']);
        });

        Schema::table('product_details', function (Blueprint $table) {
            $table->dropColumn(['warranty', 'bulk_discount_percentage']);
        });
    }
};
