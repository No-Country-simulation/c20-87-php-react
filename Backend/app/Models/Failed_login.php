<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Failed_login extends Model
{
    use HasFactory;
    protected $table = "failed_login";

    static function getFailedLogins($id){
        $fail = Failed_login::where("user_id", $id)
                            ->whereRaw("created_at >= DATE_SUB('".date("Y-m-d H:i:s")."', INTERVAL 60 MINUTE)")
                            ->get();

        return $fail;
    }
}
