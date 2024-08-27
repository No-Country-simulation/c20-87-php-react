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
        Schema::create('notification_user', function (Blueprint $table) {
            $table->id();  // Identificador único (BigInt Auto Increment)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // FK a users (BigInt)
            $table->foreignId('notification_id')->constrained('notifications')->onDelete('cascade');  // FK a notifications (BigInt)
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
        Schema::dropIfExists('notification_user');
    }
};
