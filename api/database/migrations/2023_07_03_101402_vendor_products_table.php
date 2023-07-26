<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendorproducts', function (Blueprint $table) {
            $table->id();
            $table->string('Size')->nullable();
            $table->string('Pack')->nullable();
            $table->string('Item No')->nullable();
            $table->string('Pallet')->nullable();
            $table->string('Price')->nullable();
            $table->string('name')->nullable();
            $table->json('image')->nullable();
            $table->string('Subcategory')->nullable();
            $table->string('category')->nullable();
            $table->string('newimagefilename')->nullable();
            $table->json('gallery')->nullable();
            $table->string('product_type')->nullable();
            $table->string('unit')->nullable();
            $table->string('height')->nullable();
            $table->string('width')->nullable();
            $table->string('length')->nullable();
            $table->json('video')->nullable();
            $table->string('is_digital')->nullable();
            $table->string('is_external')->nullable();
            $table->string('external_product_url')->nullable();
            $table->string('external_product_button_text')->nullable();
            $table->string('buyingprice')->nullable();
            $table->string('sale_price')->nullable();
            $table->string('description')->nullable();
            $table->string('shop_id')->nullable();
            $table->string('statetax')->nullable();
            $table->string('countrytax')->nullable();
            $table->string('localtax')->nullable();
            $table->string('status')->nullable();
            $table->string('is_taxable')->nullable();
            $table->string('in_stock')->nullable();
            $table->unsignedBigInteger('quantity')->nullable();
            $table->string('itemshortdescription')->nullable();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vendorproducts', function (Blueprint $table) {
            $table->dropColumn('Size');
            $table->dropColumn('Pack');
            $table->dropColumn('Item No');
            $table->dropColumn('Pallet');
            $table->dropColumn('Price');
            $table->dropColumn('name');
            $table->dropColumn('image');
            $table->dropColumn('Subcategory');
            $table->dropColumn('category');
            $table->dropColumn('newimagefilename');
            $table->dropColumn('gallery');
            $table->dropColumn('product_type');
            $table->dropColumn('unit');
            $table->dropColumn('height');
            $table->dropColumn('width');
            $table->dropColumn('length');
            $table->dropColumn('video');
            $table->dropColumn('is_digital');
            $table->dropColumn('is_external');
            $table->dropColumn('external_product_url');
            $table->dropColumn('external_product_button_text');
            $table->dropColumn('buyingprice');
            $table->dropColumn('sale_price');
            $table->dropColumn('description');
            $table->dropColumn('shop_id');
            $table->dropColumn('statetax');
            $table->dropColumn('countrytax');
            $table->dropColumn('localtax');
            $table->dropColumn('status');
            $table->dropColumn('is_taxable');
            $table->dropColumn('in_stock');
            $table->dropColumn('quantity');
            $table->dropColumn('itemshortdescription');
        });
    }
};
