<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification_user extends Model
{
    use HasFactory;

    static function createTrack($user_id, $notification_id){
        $notification = new Notification_user();
        $notification->user_id = $user_id;
        $notification->notification_id = $notification_id;
        $save = $notification->save();

        return $save;
    }
}
