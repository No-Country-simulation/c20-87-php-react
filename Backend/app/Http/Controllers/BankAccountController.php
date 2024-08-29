<?php

namespace App\Http\Controllers;

use App\Models\Bank_account;
use App\Models\BankAccount;
use App\Models\Pay_service;
use App\Models\Transaction;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    // Método para crear una nueva cuenta bancaria en sistema
    public function createAccount(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'account_number' => 'required|unique:bank_accounts,account_number',
            'currency' => 'required|in:PESO,USD,EUR', 
        ]);

        $account = BankAccount::create([
            'user_id' => $validatedData['user_id'],
            'account_number' => $validatedData['account_number'],
            'balance' => 0,
            'currency' => $validatedData['currency'],
        ]);

        return response()->json(['message' => 'Cuenta bancaria creada con éxito', 'account' => $account], 201);
    }

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

    public function pay_service(Request $request){
        $data = $request->only('user_id', 'amount', 'number_client', 'name_service');
        $validatorPay = Validator::make($data, [
            'user_id' => 'required|exists:users,id',
            'amount' => 'required',
            'number_client' => 'required', 
            'name_service' => 'required',
        ]);

        if ($validatorPay->fails()) {
            return response()->json([
                'errors' => $validatorPay->errors()
            ], 422);
        }
        
        $pago_servicio = Bank_account::realizarPagoServicio($request);
        if ($pago_servicio) {
            $pay_service = Pay_service::create_pay($request);
            if ($pay_service) {
                return response()->json([
                    'message' => 'Pago realizado con exito',
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Error al realizar el pago',
                ], 400);
            }
        }else{
            return response()->json([
                'errors' => "Saldo insuficiente para realizar la transferencia"
            ], 400);
        }       
    }
}
