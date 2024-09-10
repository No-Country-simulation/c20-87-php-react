<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score_crediticio extends Model
{
    use HasFactory;

    static function scoreCrediticio($id_user){
        $score = Score_crediticio::where("user_id", $id_user)->get()->toArray();
        if (empty($score)) {
            Score_crediticio::createScoreCrediticio($id_user);
        }else{
            Score_crediticio::updateScore($id_user, $score[0]["score"]);
        }
    }

    static function createScoreCrediticio($id_user){
        $score = new Score_crediticio();
        $score->user_id = $id_user;
        $score->score = 1;
        $score->save();
    }

    static function updateScore($id_user, $score) {
        $sum_score = Score_crediticio::where("user_id", $id_user)->update([
            "score" => $score+1
        ]);
    }
}
