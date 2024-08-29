<?php

namespace App\Http\Controllers;

use App\Models\BankAccount; 
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    

    // Método para hacer un depósito en una cuenta bancaria del sistema
    public function deposit(Request $request)
    {
        $validatedData = $request->validate([
            'account_id' => 'required|exists:bank_accounts,id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        $account = BankAccount::find($validatedData['account_id']);
        $account->balance += $validatedData['amount'];
        $account->save();

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

         // Verifica si el saldo es suficiente
        if ($account->balance < $validatedData['amount']) {
            return response()->json(['message' => 'Saldo insuficiente'], 400);
        }

        $account->balance -= $validatedData['amount'];
        $account->save();

        return response()->json(['message' => 'Extracción realizada con éxito', 'account' => $account], 201);
    }
}
