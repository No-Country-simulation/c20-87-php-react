<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payservice_user extends Model
{
    use HasFactory;
    protected $table = "payservice_user";

    protected $fillable = [
        'user_id',
        'service_id',
        'amount'
    ];
}
