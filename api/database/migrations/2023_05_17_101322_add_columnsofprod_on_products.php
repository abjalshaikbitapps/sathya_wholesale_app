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
        Schema::table('products', function (Blueprint $table) {
            $table->tinyInteger('buyingprice')->default(0);
            $table->string('statetax',500)->nullable();
            $table->string('countrytax',500)->nullable();
            $table->string('localtax',500)->nullable();
            $table->string('itemshortdescription',500)->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('buyingprice');
            $table->dropColumn('statetax');
            $table->dropColumn('countrytax');
            $table->dropColumn('localtax');
            $table->dropColumn('itemshortdescription');
        });
    }
};