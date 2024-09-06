<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    
    // Metodo para listar todos los balances
    public function listAllBalances(Request $request){

        // Autenticación por defecto de usuario
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $userId = auth()->id();

        // Tomamos los datos de los modelos BankAccount y User
        $allBalance = BankAccount::with('user:id,name,lastname') // Relación con el modelo User, seleccionando id y username
        ->select('user_id', 'account_number', 'balance') // Incluimos user_id
        ->get()
        ->map(function ($bankAccount) {
            return [
                'user_id' => $bankAccount->user_id,
                'account_number' => $bankAccount->account_number,
                'name' => $bankAccount->user->name,
                'lastname' => $bankAccount->user->lastname, 
                'balance' => $bankAccount->balance,
                
            ];
        });

    // Retornar todos los atributos de balance a JSON
    return response()->json($allBalance); 

    }


}
