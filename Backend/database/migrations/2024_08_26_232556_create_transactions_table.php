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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();  // Identificador único (BigInt Auto Increment)
            $table->foreignId('from_account_id')->constrained('bank_accounts')->onDelete('cascade');  // FK a bank_accounts (BigInt)
            $table->foreignId('to_account_id')->nullable();  // FK a bank_accounts (BigInt)
            $table->decimal('amount', 15, 2);  // Monto de la transacción (DECIMAL con precisión)
            $table->enum('type', ['transferencia', 'depósito', 'retiro', 'pago_servicio']);  // Tipo de transacción (ENUM)
            $table->enum('status', ['pendiente', 'completada', 'fallida']);  // Estado de la transacción (ENUM)
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
        Schema::dropIfExists('transactions');
    }
};
