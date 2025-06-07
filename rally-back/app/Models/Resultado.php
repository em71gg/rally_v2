<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resultado extends Model
{
    protected $fillable = [
        'rally_id',
        'foto_id',
        'posicion',
    ];

    /**
     * un resultado pertenece a una foto
     */
    public function foto() {
        return $this->belongsTo(Foto::class);
    }

    /**
     * Un resultado de una foto pertenece a un rally
     */
    public function rally() {
        return $this->belongsTo(Rally::class);
    }
}
