<?php

namespace App\Http\Controllers;

use App\Mail\FailLoginEmail;
use App\Models\Failed_login;
use App\Models\User;
use App\Models\BankAccount;
use App\Models\Notification_user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;



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
            if(!is_null($user->tokens())){
                $user->tokens()->delete();
            }
            
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
            $login_user = User::where("username", $request->username)->get();
            if (!empty($login_user)) {
                $faileds_login = Failed_login::getFailedLogins($login_user[0]["id"]);
                if (count($faileds_login) == 3) {         
                    Mail::to($login_user[0]["email"])->send(new FailLoginEmail($login_user));
                    Notification_user::createTrack($login_user[0]["id"], 1);

                    $update_session = User::find($login_user[0]["id"]);
                    $update_session->status = 0;
                    $update_session->update();

                    return response()->json([
                        'errors' => 'Maximo de intentos alcanzados, se bloqueo el usuario'
                    ], 400);
                }else{
                    $create_fail_login = new Failed_login();
                    $create_fail_login->user_id = $login_user[0]["id"];
                    $create_fail_login->save();
                }
            }

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

    // Metodo create_user para crear usuario y automáticamente su cuenta
    public function create_user(Request $request) {
        $credentials = $request->only('email', 'username');
        $validator = Validator::make($credentials, [
            'email' => 'required|unique:users,email',
            'username' => 'required|unique:users,username',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'username' => $request->input('username'),
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'phone_number' => $request->input('phone_number'),
            'type_user' => $request->input('type_user'),
            'status' => 1,
            'session' => 1,
        ]);

        // Crear una nueva cuenta bancaria en sistema
        $account = BankAccount::create([
            'user_id' => $user->id, 
            'account_number' =>  mt_rand(1000000000, 9999999999),
            'balance' => 0,
            'currency' => 'PESO',
        ]);
    
        return response()->json(['message' => 'Usuario creado', 'user' => $user], 201);
    }

}
