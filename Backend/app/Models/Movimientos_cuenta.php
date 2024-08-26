<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimientos_cuenta extends Model
{
    use HasFactory;

    static function create_movimineto($originador, $destinatario, $monto, $estado){
        $create_movimiento = new Movimientos_cuenta();
        $create_movimiento->originador = $originador;
        $create_movimiento->destinatario = $destinatario;
        $create_movimiento->monto = $monto;
        $create_movimiento->estado = $estado;
        $registro = $create_movimiento->save();

        return ($registro) ? $create_movimiento->id : false;
    }

    static function updateStatus($id, $status){
        $movimiento = Movimientos_cuenta::find($id);
        $movimiento->estado = $status;
        $update = $movimiento->update();

        return ($update) ? $update : false;
    }
}
