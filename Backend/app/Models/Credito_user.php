<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credito_user extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'monto',
        'fecha_pago',
        'estado_credito',
        'reclamado',
    ];

    static function getCreditoUser($id_user){
        $credito = Credito_user::where("user_id", $id_user)
                                ->where("reclamado", 0)
                                ->where("fecha_pago", null)->get();

        return $credito;
    }
}