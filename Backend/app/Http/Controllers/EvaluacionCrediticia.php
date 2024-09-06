<?php

namespace App\Http\Controllers;

use App\Mail\AprobacionCredito;
use App\Models\Notification_user;
use App\Models\Score_crediticio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EvaluacionCrediticia extends Controller
{
    public function evaluacion_score(){
        $clientes_aplicables = User::clientesAplicables();
        foreach ($clientes_aplicables as $key => $clients) {
            $user = User::find($clients->user_id);
            Mail::to($user->email)->send(new AprobacionCredito($user));
            Notification_user::createTrack($user->id, 4);
        }
    }
}
