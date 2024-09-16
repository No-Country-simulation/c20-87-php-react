<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class AdminUserController extends Controller
{

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (auth()->user()->type_user !== 3) {
                return response()->json(['error' => 'No autorizado. Solo administradores pueden acceder.'], 403);
            }
            return $next($request);
        });
    }
    

    public function index() //Mostrar todos los usuarios
    {
    $users = User::all();

    return response()->json($users);
    }

    public function index() //Mostrar todos los usuarios
    {
    $users = User::all();

    return response()->json($users);
    }

    public function enable($id) //habilitar usuario
    {
        $user = User::find($id);
        if ($user) {
            $user->status = 1;
            $user->save();
            return response()->json(['success' => 'Usuario habilitado correctamente.']);
        }
        return response()->json(['error' => 'Usuario no encontrado.'], 404);
    }

    public function disable($id) //deshabilitar usuario
    { 
        $user = User::find($id);
        if ($user) {
            $user->status = 0;
            $user->save();
            return response()->json(['success' => 'Usuario deshabilitado correctamente.']);
        }
        return response()->json(['error' => 'Usuario no encontrado.'], 404);
    }

    public function delete($id) //eliminar usuario
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['success' => 'Usuario eliminado correctamente.']);
        }
        return response()->json(['error' => 'Usuario no encontrado.'], 404);
    }

    public function update(Request $request, $id) //actualizar usuario
{
    $user = User::find($id);
    if (!$user) {
        return response()->json(['error' => 'Usuario no encontrado.'], 404);
    }

    $validator = Validator::make($request->all(), [
        'username' => 'sometimes|string|max:255',
        'name' => ['sometimes', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
        'lastname' => ['sometimes', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
        'email' => 'sometimes|email|unique:users,email,' . $id,
        'phone_number' => 'sometimes|nullable|digits:10',
        'type' => 'sometimes|in:cliente,empresa,administrador',
        'status' => 'sometimes|in:enabled,disabled',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $user->update($validator->validated());

    return response()->json([
        'success' => 'Usuario actualizado correctamente.',
        'user' => $user
    ], 200);
}

}
