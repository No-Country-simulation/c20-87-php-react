<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pay_service extends Model
{
    use HasFactory;

    static function create_pay($data){
        $pay = new Pay_service();
        $pay->user_id = $data->user_id;
        $pay->amount = $data->amount;
        $pay->number_client = $data->number_client;        
        $pay->name_service = $data->name_service;
        $save = $pay->save();

        return $save;
    }
}
