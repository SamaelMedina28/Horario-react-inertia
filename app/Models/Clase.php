<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    protected $fillable = [
        'materia_id',
        'user_id',
        'dia',
        'salon',
        'edificio',
        'profesor',
        'hora_inicio',
        'hora_fin',
    ];

    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
