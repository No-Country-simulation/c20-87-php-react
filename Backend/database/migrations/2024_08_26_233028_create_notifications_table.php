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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();  // Identificador único (BigInt Auto Increment)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // FK a users (BigInt)
            $table->string('message');  // Mensaje de notificación (VARCHAR)
            $table->boolean('read')->default(false);  // Estado de la notificación (BOOLEAN, por defecto no leída)
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
        Schema::dropIfExists('notifications');
    }
};
