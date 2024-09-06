<?php
namespace App\Http\Controllers;

use App\Models\Bank_account;
use App\Models\BankAccount;
use App\Models\Pay_service;
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
        $validatedData = $request->validate([
            'account_id' => 'required|exists:bank_accounts,id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        $account = BankAccount::find($validatedData['account_id']);
        $account->balance += $validatedData['amount'];
        $account->save();

        // Guardar la transacción en la tabla 'transactions'
        $transactionId = Transaction::create_movimiento(
            $account->id, // from_account_id y to_account_id son el mismo para depósitos
            $account->null,
            $validatedData['amount'],
            'depósito',  // Asegúrate de que el tipo coincide con el definido en la tabla
            'completada'
        );

        return response()->json(['message' => 'Depósito realizado con éxito', 'account' => $account], 201);
    }


     // Método para hacer una extracción de una cuenta bancaria del sistema del sistema
    public function withdraw(Request $request)
    {
        $validatedData = $request->validate([
            'account_id' => 'required|exists:bank_accounts,id',
            'amount' => 'required|numeric|min:0.01',
        ]);
    
        $account = BankAccount::find($validatedData['account_id']);
    
        if ($account->balance < $validatedData['amount']) {
            return response()->json(['message' => 'Fondos insuficientes'], 400);
        }
    
        $account->balance -= $validatedData['amount'];
        $account->save();
    
        // Guardar la transacción en la tabla 'transactions'
        $transactionId = Transaction::create_movimiento(
            $account->id, // from_account_id y to_account_id son el mismo para retiros
            $account->null,
            $validatedData['amount'],
            'retiro',  // Valor actualizado para coincidir con el definido en la base de datos
            'completada'
        );
    
        if ($transactionId === false) {
            return response()->json(['message' => 'Error al registrar la transacción'], 500);
        }
    
        return response()->json(['message' => 'Extracción realizada con éxito', 'account' => $account], 201);
    }

}