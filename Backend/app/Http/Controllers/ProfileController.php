<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function DatosUsuarios(Request $request){

         // Verificación de autenticación de usuario
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $userId = auth()->id();
    $datosUsuario = User::find($userId);

    //Seleciona solo los campos necesarios
    $response= [
        'name' => $datosUsuario->name . " " . $datosUsuario->lastname,
        'email' => $datosUsuario->email,
        'username' => $datosUsuario->username,
        'phone_number' => $datosUsuario->phone_number,
        'type_user' => $datosUsuario->type_user,
    ];

    return response()->json($response);

    }
}
