<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_account_id',
        'to_account_id',
        'amount',
        'type',
        'status'
    ];

    static function create_movimiento($originador, $destinatario, $monto, $type, $status){
        $create_movimiento = new Transaction();
        $create_movimiento->from_account_id = $originador;
        $create_movimiento->to_account_id = $destinatario;
        $create_movimiento->amount = $monto;
        $create_movimiento->type = $type;
        $create_movimiento->status = $status;
        $registro = $create_movimiento->save();

        return ($registro) ? $create_movimiento->id : false;
    }

    static function updateStatus($id, $status){
        $movimiento = Transaction::find($id);
        $movimiento->status = $status;
        $update = $movimiento->update();

        return ($update) ? $update : false;
    }

    static function get_data_from($id){
        dd($id);
    }
}
