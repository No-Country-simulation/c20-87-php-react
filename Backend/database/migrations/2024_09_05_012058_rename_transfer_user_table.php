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
        Schema::rename('transfer_user', 'payservice_user');
    }

    public function down()
    {
        Schema::rename('payservice_user', 'transfer_user');
    }

};
