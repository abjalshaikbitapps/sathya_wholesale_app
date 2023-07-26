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
        //
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstname',500)->nullable();
            $table->string('lastname',500)->nullable();
            $table->string('buslicenseno',500)->nullable();
            $table->string('tradlicenseno',500)->nullable();
            $table->string('country',500)->nullable();
            $table->string('city',500)->nullable();
            $table->string('pincode',500)->nullable();
            $table->string('fax',100)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn('firstname');

            $table->dropColumn('lastname');

            $table->dropColumn('buslicenseno');

            $table->dropColumn('tradlicenseno');

            $table->dropColumn('country');

            $table->dropColumn('city');

            $table->dropColumn('pincode');

            $table->dropColumn('fax');

        });
    }
};
