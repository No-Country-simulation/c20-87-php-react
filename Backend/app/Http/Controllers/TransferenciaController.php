<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Mail\NotificacionTransferenciaEnviada;
use App\Mail\NotificacionTransferenciaRecibida;
use App\Models\Bank_account;
use App\Models\Notification_user;
use App\Models\Score_crediticio;
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
        // Verifica el token en la solicitud
        if (!$request->user()) {
            return response()->json(['message' => 'Usuario no autenticado'], 401);
        }

        $data = $request->only('monto', 'id_user', 'num_cuenta');        
        $validator = Validator::make($data, [
            'monto' => 'required|numeric|min:0',
            'id_user' => 'required|exists:users,id',
            'num_cuenta' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $destinatario = Bank_account::getDestinatario($data['num_cuenta']);
        
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
                Score_crediticio::scoreCrediticio($id_user);
                Transaction::updateStatus($movimiento, "completada");
            }else{
                Transaction::updateStatus($movimiento, "fallida");
                return response()->json([
                    'errors' => "Saldo insuficiente para realizar la transferencia"
                ], 400);
            }

            $to = User::find($request->id_user);
            $from = User::find($destinatario[0]["destinatario"]);
            $movimiento = Transaction::find($movimiento);
            $monto = $request->monto;

            $data = ["to" => $to, "from" => $from, "monto" => $monto, "movimiento" => $movimiento];

            Notification_user::createTrack($to->id, 2);
            Notification_user::createTrack($from->id, 3);
            Mail::to($to->email)->send(new NotificacionTransferenciaEnviada($data));
            Mail::to($from->email)->send(new NotificacionTransferenciaRecibida($data));

            return response()->json([
                'message' => 'Transferencia completada exitosamente',
                "user" => User::getDataUser($request->id_user)
            ], 200);
        });
    }
}
