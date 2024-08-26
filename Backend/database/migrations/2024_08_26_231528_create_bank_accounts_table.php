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
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // FK a users (BigInt)
            $table->string('account_number')->unique();  // Número de cuenta único (VARCHAR)
            $table->decimal('balance', 15, 2);  // Saldo actual (DECIMAL con precisión)
            $table->enum('currency', ['PESO', 'USD', 'EUR']);  // Moneda (ENUM)
            $table->timestamps();  // created_at y updated_at (TIMESTAMP)
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bank_accounts');
    }
};
