<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank_account extends Model
{
    use HasFactory;

    static function getDestinatario($destinatario){
        $from = Bank_account::where("account_number", $destinatario)
                            ->join("users", "users.id", "=", "user_id")
                            ->join("type_users", "users.type_user", "=", "type_users.id")
                            ->select("users.id AS destinatario", "users.username", "type_users.type_user", "account_number")
                            ->get();
        return !is_null($from) ? $from : false;
    }    

    static function updateMontoOriginador($originador, $monto, $revertir = null){
        $saldo_originador = Bank_account::find($originador);
        $monto_update = (!is_null($revertir) ? $saldo_originador->balance : $saldo_originador->balance-$monto);

        if ($monto_update >= 0) {
            $saldo_originador->balance = $monto_update;
            $update = $saldo_originador->update();
        }else{
            $update = false;
        }
        return $update;
    }

    static function updateMontoDestinatario($destinatario, $monto, $revertir = null){
        $saldo_destinatario = Bank_account::find($destinatario);
        $monto_update = (!is_null($revertir) ? $saldo_destinatario->balance-$monto : $saldo_destinatario->balance+$monto);
        
        $saldo_destinatario->balance = $monto_update;
        $update = $saldo_destinatario->update();

        return $update;
    }    

    static function realizarPagoServicio($data){
        $account = BankAccount::where("user_id", $data->user_id)->get();
        $data_account = BankAccount::find($account[0]["id"]);

        $saldo = $data_account->balance-$data->amount;
        if ($saldo >= 0) {
            $data_account->balance = $saldo;
            $update = $data_account->update();
        }else{
            $update = "Saldo";
        }
        return $update;
    }
}
