<?php

namespace App\Http\Controllers;

use App\Models\Bank_account;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    
    // Metodo para listar todos los balances
    public function listAllBalances(Request $request)
{
    // Verificación de autenticación de usuario
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Verificación del tipo de usuario (solo para usuarios con type_user = 3)
    $user = auth()->user();
    if ($user->type_user !== 3) {
        return response()->json(['message' => 'Forbidden: Access denied'], 403);
    }

    // Continuar con la consulta de balances si el usuario es type_user = 3
    $allBalance = Bank_account::with('user:id,name,lastname') // Relación con el modelo User, seleccionando id y username
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
