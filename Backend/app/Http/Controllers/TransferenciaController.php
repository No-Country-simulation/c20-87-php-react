<?php

namespace App\Http\Controllers;

use App\Models\Cuenta_user;
use App\Models\Movimientos_cuenta;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TransferenciaController extends Controller
{
    public function create_transferencia(Request $request){
        $data = $request->only('monto', 'id_user', 'destinatario', 'token');
        $validator = Validator::make($data, [
            'monto' => 'required',
            'id_user' => 'required',
            'destinatario' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $search_destinatario = Cuenta_user::getDestinatario($request->destinatario);
        if ($search_destinatario) {
            $movimineto = Movimientos_cuenta::create_movimineto($request->id_user, $search_destinatario[0]["destinatario"], $request->monto, "PENDIENTE");
            
            $saldo_destinatario = Cuenta_user::update_monto_destinatario($search_destinatario[0]["destinatario"], $request->monto);      
            if ($saldo_destinatario) {
                $update_originador = Cuenta_user::update_monto_originador($request->id_user, $request->monto);
                if ($update_originador) {
                    Movimientos_cuenta::updateStatus($movimineto, "APROBADO");
                }else{
                    $saldo_destinatario = Cuenta_user::update_monto_destinatario($search_destinatario[0]["destinatario"], $request->monto, true);  
                    Movimientos_cuenta::updateStatus($movimineto, "RECHAZADO");
                    return response()->json([
                        'errors' => "Error al actualizar monto del originador"
                    ], 400);
                }
            }else{
                Movimientos_cuenta::updateStatus($movimineto, "RECHAZADO");
                return response()->json([
                    'errors' => "Error al actualizar monto del destinatario"
                ], 400);
            }
        }else{
            return response()->json([
                'errors' => "No se encontro al destinatario seleccionado"
            ], 400);
        }

        return response()->json([
            'success' => "Transferencia realizada"
        ], 200);
    }
}
