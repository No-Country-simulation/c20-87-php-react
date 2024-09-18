<?php

use App\Http\Controllers\DesbloquearUser;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\PaymentControllerr;
use App\Http\Controllers\EvaluacionCrediticia;
use Illuminate\Foundation\Auth\User;
use App\Http\Controllers\TransferenciaController;
use App\Http\Controllers\FiltersController;
use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\Credito_user;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(LoginController::class)->group(function(){
    Route::post('/login_user', 'login_sesion');
    Route::post('/crear_usuario', 'create_user');
    Route::post('/cerrar_session', 'logout_user');
});

Route::controller(BankAccountController::class)->group(function(){
    Route::middleware('auth:sanctum')->post('/deposit', 'deposit');
    Route::middleware('auth:sanctum')->post('/withdraw', 'withdraw');
    //Route::middleware('auth:sanctum')->post('/pay_service', 'pay_service');    
});

Route::controller(PaymentController::class)->group(function(){
    Route::middleware('auth:sanctum')->post('/payservice', 'payservice');
});


Route::controller(FiltersController::class)->group(function(){
    Route::middleware('auth:sanctum')->get('/transactions', 'transactions');  
    Route::middleware('auth:sanctum')->get('/getSevices', 'obtener_servicios');    
});

Route::controller(TransferenciaController::class)->group(function(){
    Route::middleware('auth:sanctum')->post('/generar_transferencia', 'create_transferencia');
});

Route::controller(EvaluacionCrediticia::class)->group(function(){
    Route::get('validacion_crediticia/evaluar_score', 'evaluacion_score');
});

Route::controller(BalanceController::class)->group(function(){
    Route::middleware('auth:sanctum')->get('/listar_balance', 'listAllBalances');
});

Route::middleware('auth:sanctum')->prefix('admin')->controller(AdminUserController::class)->group(function() {
    Route::post('/users/{id}/enable', 'enable');
    Route::post('/users/{id}/disable', 'disable');
    Route::delete('/users/{id}', 'delete');
    Route::put('/users/{id}', 'update');
    Route::get('/users', 'index');
});

Route::controller(Credito_user::class)->group(function(){
    Route::middleware('auth:sanctum')->post('/pedir_credito', 'solicitud_credito');
    Route::middleware('auth:sanctum')->post('/infomacion_creditos', 'get_info_credito');
});