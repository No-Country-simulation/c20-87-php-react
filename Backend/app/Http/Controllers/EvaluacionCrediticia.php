<?php

namespace App\Http\Controllers;

use App\Mail\AprobacionCredito;
use App\Models\Credito_user;
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
            Credito_user::create([
                'user_id' => $clients->user_id,
                'monto' => 100000,
                'fecha_pago' => null,
                'estado_credito' => 'vigente',
                'reclamado' => 0
            ]);

            Mail::to($user->email)->send(new AprobacionCredito($user));
            Notification_user::createTrack($user->id, 4);
        }
    }
}
