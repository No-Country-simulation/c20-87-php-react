<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'lastname',
        'email',
        'password',
        'phone_number',
        'type_user',
        'status',
        'session',
        'remember_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    static function getDataUser($id) {
        return User::join("type_users AS tu", "tu.id", "=", "users.type_user")
                    ->join("bank_accounts AS ba", "ba.user_id", "=", "users.id")
                    ->where("users.id", $id)
                    ->select("users.id", "ba.id AS id_account", "ba.account_number AS number_accoun", "users.username", "users.name", "users.lastname", "users.email", "tu.type_user", "ba.balance", "ba.currency", "users.status", "users.session")
                    ->get();
    }

    static function clientesAplicables() {
        $date = date("Y-m-d");
        $date_now = date("Y-m-d H:i:s");
        $clients = User::join("score_crediticios AS sc", "sc.user_id", "=", "users.id")
                        ->whereRaw("sc.score > 3")
                        ->whereNotIn("users.id", function($query) use ($date, $date_now){
                            $query->select("nu.user_id")
                                    ->from("notification_users AS nu")
                                    ->where("nu.notification_id", 4)
                                    ->whereBetween("nu.created_at", [$date." 00:00:00", $date_now]);
                        })
                        ->whereNotIn("users.id", function($query){
                            $query->select("cu.user_id")
                                    ->from("credito_users AS cu")
                                    ->where("reclamado", 1)
                                    ->whereIn("estado_credito", ["vigente", "mora"])
                                    ->where("fecha_pago", null);
                        })->get();
        return $clients;
    }
}
