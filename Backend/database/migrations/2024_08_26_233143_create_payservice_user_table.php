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
        Schema::create('payservice_user', function (Blueprint $table) {
            $table->id();  // Identificador único (BigInt Auto Increment)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // FK a users (BigInt)
            $table->foreignId('transaction_id')->constrained('transactions')->onDelete('cascade');  // FK a transactions (BigInt)
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
        Schema::dropIfExists('transfer_user');
    }
};
