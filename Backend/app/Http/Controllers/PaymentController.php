<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BankAccount;
use App\Models\Bank_account;
use App\Models\Service;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function payservice(Request $request)
    {

        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'service_id' => 'required|exists:services,id',
                'amount' => 'required|numeric|min:0.01',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            
            return response()->json([
                'message' => 'Error en los datos ingresados',
                'errors' => $e->errors() 
            ], 422);
        }
        // Obtengo la cuenta bancaria del usuario
        $account = Bank_account::where('user_id', $request->user_id)->first();

        if (!$account) {
            return response()->json(['error' => 'Cuenta bancaria no encontrada'], 404);
        }

        // Obtengo el servicio seleccionado
        $service = Service::findOrFail($request->service_id);

        // Valido que el usuario tenga suficiente saldo para el monto ingresado
        if ($account->balance < $request->amount) {
            return response()->json(['error' => 'Saldo insuficiente'], 400);
        }

        // Inicia la transacción
        DB::transaction(function () use ($account, $service, $request) {
            // Descuento el monto del saldo de la cuenta
            
            $account->balance -= $request->amount;
            $account->save();

            // Creo la transacción en la tabla `transactions`
            $transaction = Transaction::create([
                'from_account_id' => $account->id,
                'to_account_id' => null,
                'amount' => $request->amount, 
                'type' => 'pago_servicio',
                'status' => 'completada',
            ]);

            // Registro la relación en la tabla pivot `payservice_user`
            DB::table('payservice_user')->insert([
                'user_id' => $request->user_id,
                'transaction_id' => $transaction->id, 
                'service_id' => $service->id, 
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });

        return response()->json(['message' => 'Pago realizado con éxito'], 200);
    }
}
