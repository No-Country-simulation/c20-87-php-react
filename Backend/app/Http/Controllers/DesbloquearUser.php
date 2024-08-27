<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DesbloquearUser extends Controller
{
    public function change_status_user($id){
        $user = User::where("id", $id)->where("status", 0)->get();
        if (!empty($user)) {

            $update_status = User::find($id);
            $update_status->status = 1;
            $update_status->update();
            return view('cerrar_ventana');
        }
    }
}
