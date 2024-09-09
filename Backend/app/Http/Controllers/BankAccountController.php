<?php
namespace App\Http\Controllers;

use App\Models\Bank_account;
use App\Models\Pay_service;
use App\Models\Score_crediticio;
use App\Models\Transaction;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    //metodo para realizar deposito bancario
    public function deposit(Request $request)
    {
        $data = $request->only('account_id', 'amount');
        $validator = Validator::make($data, [
            'account_id' => 'required',
            'amount' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $account = Bank_account::find($request->account_id);
        $account->balance += $request->amount;
        $account->save();

        // Guardar la transacción en la tabla 'transactions'
        $transactionId = Transaction::create_movimiento(
            $account->id, // from_account_id y to_account_id son el mismo para depósitos
            $account->null,
            $request->amount,
            'depósito',  // Asegúrate de que el tipo coincide con el definido en la tabla
            'completada'
        );

        Score_crediticio::scoreCrediticio($account->user_id);
        return response()->json(['message' => 'Depósito realizado con éxito', 'account' => $account], 201);
    }

     // Método para hacer una extracción de una cuenta bancaria del sistema del sistema
    public function withdraw(Request $request)
    {
        $data = $request->only('account_id', 'amount');
        $validator = Validator::make($data, [
            'account_id' => 'required',
            'amount' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
    
        $account = Bank_account::find($request->account_id);
    
        if ($account->balance < $request->amount) {
            return response()->json(['message' => 'Fondos insuficientes'], 400);
        }
    
        $account->balance -= $request->amount;
        $account->save();
    
        // Guardar la transacción en la tabla 'transactions'
        $transactionId = Transaction::create_movimiento(
            $account->id, // from_account_id y to_account_id son el mismo para retiros
            $account->null,
            $request->amount,
            'retiro',  // Valor actualizado para coincidir con el definido en la base de datos
            'completada'
        );
    
        if ($transactionId === false) {
            return response()->json(['message' => 'Error al registrar la transacción'], 500);
        }
        Score_crediticio::scoreCrediticio($account->user_id);
        return response()->json(['message' => 'Extracción realizada con éxito', 'account' => $account], 201);
    }

}