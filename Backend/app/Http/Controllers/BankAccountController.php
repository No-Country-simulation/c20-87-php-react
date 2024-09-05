<?php
namespace App\Http\Controllers;

use App\Models\Bank_account;
use App\Models\BankAccount;
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
            $account->id,
            $validatedData['amount'],
            'depósito',  // Asegúrate de que el tipo coincide con el definido en la tabla
            'completada'
        );

        Score_crediticio::scoreCrediticio($account->user_id);
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
            $account->id,
            $validatedData['amount'],
            'retiro',  // Valor actualizado para coincidir con el definido en la base de datos
            'completada'
        );
    
        if ($transactionId === false) {
            return response()->json(['message' => 'Error al registrar la transacción'], 500);
        }
        Score_crediticio::scoreCrediticio($account->user_id);
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
                Score_crediticio::scoreCrediticio($request->user_id);
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