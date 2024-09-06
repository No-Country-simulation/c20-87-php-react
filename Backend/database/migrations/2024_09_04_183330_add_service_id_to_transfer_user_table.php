<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddServiceIdToTransferUserTable extends Migration
{
    public function up()
    {
        Schema::table('transfer_user', function (Blueprint $table) {
            $table->foreignId('service_id')->nullable()->after('transfer_id')->constrained('services')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('transfer_user', function (Blueprint $table) {
            $table->dropForeign(['service_id']);
            $table->dropColumn('service_id');
        });
    }

};



