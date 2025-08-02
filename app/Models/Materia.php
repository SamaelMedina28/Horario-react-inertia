<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $fillable = [
        'nombre',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
