<?php

namespace App\Http\Controllers;

use App\Models\Bank_account;
use App\Models\Credito_user as ModelsCredito_user;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class Credito_user extends Controller
{
    public function solicitud_credito(Request $request){
        $data = $request->only('id_user');        
        $validator = Validator::make($data, [
            'id_user' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $credito = ModelsCredito_user::getCreditoUser($request->id_user);
        if ($credito) {
            $fecha_pago = date("Y-m-d", strtotime("+15 days"));

            $credito_update = ModelsCredito_user::find($credito[0]->id);
            $credito_update->fecha_pago = $fecha_pago;
            $credito_update->reclamado = 1;
            $credito_update->save();

            $balance_account = Bank_account::where("user_id", $request->id_user)->get();
            
            $update_balance = Bank_account::find($balance_account[0]->id);
            $update_balance->balance = $update_balance->balance+$credito[0]->monto;
            $update_balance->save();

            return response()->json([
                'response' => "Felicidades ya tienes tu credito disponible"
            ], 200);
        }else{
            return response()->json([
                'response' => "Lamentamos informarte que aun no tienes un credito displonible"
            ], 202);
        }
    }
}