<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login_sesion(Request $request){
        $credentials = $request->only('username', 'password');
        $validator = Validator::make($credentials, [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if (Auth::attempt($credentials)) {            
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access Token: '.$user->username);
            $token = $tokenResult->plainTextToken;

            $update_session = User::find($user->id);
            $update_session->session = 1;
            $update_session->update();

            return response()->json([
                'response' => [
                    "user" => User::getDataUser($user->id),
                    "token" => $token
                ],
                'success' => 'Login satisfactorio'
            ], 200);

        }else{
            return response()->json([
                'errors' => 'Los datos ingresados son incorrectos'
            ], 400);
        }
    }

    public function logout_user(Request $request){        
        $user = User::find($request->id);
        $user->tokens()->delete();

        $update_session = User::find($user->id);
        $update_session->session = 0;
        $update_session->update();
        
        return response()->json([
            'success' => 'Sesion cerrada',
        ], 200);
    }

}
