<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\BankAccountController;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

    Route::post('/create-account', [BankAccountController::class, 'createAccount']);
    Route::post('/deposit', [BankAccountController::class, 'deposit']);
    Route::post('/withdraw', [BankAccountController::class, 'withdraw']);
});