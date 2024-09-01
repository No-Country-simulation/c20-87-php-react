<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    // Especifica los campos que se pueden llenar masivamente
    protected $fillable = [
        'user_id',
        'account_number',
        'balance',
        'currency',
    ];

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}