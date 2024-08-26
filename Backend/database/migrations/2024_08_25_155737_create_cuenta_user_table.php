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
        Schema::create('cuenta_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_user')->nullable(false);
            $table->integer('saldo')->nullable(false);
            $table->integer('numero_cuenta');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cuenta_user');
    }
};
