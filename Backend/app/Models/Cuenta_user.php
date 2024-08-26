<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuenta_user extends Model
{
    use HasFactory;
    protected $table = 'cuenta_user';

    protected $fillable = [
        'id_user',
        'numero_cuenta',
    ];

    protected $hidden = [];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->numero_cuenta = rand(1000000000, 9999999999);
        });
    }

    static function getDestinatario($destinatario){
        $from = Cuenta_user::where("cuenta_user.numero_cuenta", $destinatario)
                            ->where("cuenta_user.status", 1)
                            ->join("users", "users.id", "=", "cuenta_user.id_user")
                            ->join("type_users", "users.type_user", "=", "type_users.id")
                            ->select("users.id AS destinatario", "users.username", "type_users.type_user", "cuenta_user.numero_cuenta")
                            ->get();
        return !is_null($from) ? $from : false;
    }

    static function update_monto_destinatario($destinatario, $monto, $revertir = null){
        $saldo_destinatario = Cuenta_user::find($destinatario);
        
        $monto_update = (!is_null($revertir) ? $saldo_destinatario->saldo-$monto : $saldo_destinatario->saldo+$monto);
        $saldo_destinatario->saldo = $monto_update;
        $update = $saldo_destinatario->update();

        return $update;
    }

    static function update_monto_originador($destinatario, $monto, $revertir = null){
        $saldo_destinatario = Cuenta_user::find($destinatario);
        $monto_update = (!is_null($revertir) ? $monto : $saldo_destinatario->saldo-$monto);
        $saldo_destinatario->saldo = $saldo_destinatario->saldo-$monto;
        $update = $saldo_destinatario->update();

        return $update;
    }
}
