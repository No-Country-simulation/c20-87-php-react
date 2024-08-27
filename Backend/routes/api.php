<?php

use App\Http\Controllers\DesbloquearUser;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TransferenciaController;
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
});

Route::controller(TransferenciaController::class)->group(function(){
    Route::middleware('auth:sanctum')->post('/generar_transferencia', 'create_transferencia');
});
