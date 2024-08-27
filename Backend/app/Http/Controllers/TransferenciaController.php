<?php

namespace App\Http\Controllers;

use App\Mail\NotificacionTransferenciaEnviada;
use App\Mail\NotificacionTransferenciaRecibida;
use App\Models\Bank_account;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TransferenciaController extends Controller
{
    public function create_transferencia(Request $request)
    {
        $data = $request->only('monto', 'id_user', 'destinatario');        
        $validator = Validator::make($data, [
            'monto' => 'required|numeric|min:0',
            'id_user' => 'required|exists:users,id',
            'destinatario' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $destinatario = Bank_account::getDestinatario($data['destinatario']);
        if (!$destinatario) {
            return response()->json([
                'errors' => "No se encontró al destinatario seleccionado"
            ], 400);
        }

        return DB::transaction(function () use ($data, $destinatario, $request) {
            $monto = $data['monto'];
            $id_user = $data['id_user'];
            $destinatarioId = $destinatario[0]['destinatario'];

            $movimiento = Transaction::create_movimiento($id_user, $destinatarioId, $monto, "transferencia", "pendiente");
            if (Bank_account::updateMontoOriginador($id_user, $monto)) {
                Bank_account::updateMontoDestinatario($destinatarioId, $monto);
                Transaction::updateStatus($movimiento, "fallida");
            }else{
                return response()->json([
                    'errors' => "Saldo insuficiente para realizar la transferencia"
                ], 400);
            }

            Transaction::updateStatus($movimiento, "completada");
            $to = User::find($request->id_user);
            $from = User::find($destinatario[0]["destinatario"]);
            $movimiento = Transaction::find($movimiento);
            $monto = $request->monto;

            $data = ["to" => $to, "from" => $from, "monto" => $monto, "movimiento" => $movimiento];
            Mail::to($to->email)->send(new NotificacionTransferenciaEnviada($data));
            Mail::to($from->email)->send(new NotificacionTransferenciaRecibida($data));

            return response()->json([
                'message' => 'Transferencia completada exitosamente',
            ], 200);
        });
    }
}
