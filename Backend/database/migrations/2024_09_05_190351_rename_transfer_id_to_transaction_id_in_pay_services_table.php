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
        Schema::table('payservice_user', function (Blueprint $table) {
            $table->renameColumn('transfer_id', 'transaction_id');
        });
    }

    /**
     * Revertir las migraciones.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('payservice_user', function (Blueprint $table) {
            $table->renameColumn('transaction_id', 'transfer_id');
        });
    }
};
