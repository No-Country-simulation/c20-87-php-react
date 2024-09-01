<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class FiltersController extends Controller
{
    public function transactions(Request $request)
    {
        // Verifico si el usuario está logueado
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $userId = auth()->id();

        // Verifico si se proporcionan fechas / id juntos, lo cual no se permite
        if ($request->has('id') && ($request->has('desde') || $request->has('hasta'))) {
            return response()->json(['message' => 'Cannot filter by both transaction ID and date'], 400);
        }

        // Si se proporciona el ID de transacción
        if ($request->has('id')) {
            $transactionId = $request->input('id');

            // Busco la transacción específica del usuario
            $transaction = Transaction::where('id', $transactionId)
                ->where(function ($query) use ($userId) {
                    $query->where('from_account_id', $userId)
                        ->orWhere('to_account_id', $userId);
                })
                ->first();

            // Si no se encuentra la transacción, devuelvo un mensaje de error
            if (!$transaction) {
                return response()->json(['message' => 'Transaction not found or does not belong to the user'], 404);
            }

            // Retorno solo esa transacción
            return response()->json([$transaction]);
        }

        // Creo la consulta inicial para filtrar por fechas
        $query = Transaction::query();

        // Filtro por ID del usuario logueado en from_account_id / to_account_id
        $query->where(function ($query) use ($userId) {
            $query->where('from_account_id', $userId)
                ->orWhere('to_account_id', $userId);
        });

        // Filtro por fechas si se proporcionan
        if ($request->has('desde')) {
            $query->whereDate('created_at', '>=', $request->input('desde'));
        }

        if ($request->has('hasta')) {
            $query->whereDate('created_at', '<=', $request->input('hasta'));
        }

        // Obtengo los resultados
        $transactions = $query->get();

        // Retorno los resultados
        return response()->json($transactions);
    }
}

