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
        Schema::create('movimientos_cuentas', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->integer("originador")->nullable(false);
            $table->integer("destinatario")->nullable(false);
            $table->integer("monto")->nullable(false);
            $table->enum('estado', ["PENDIENTE", "RECHAZADO", "APROBADO"]);
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
        Schema::dropIfExists('movimientos_cuentas');
    }
};
