<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voto extends Model
{
     protected $fillable = [
        'ip',
        'foto_id',
        'rally_id',
        'calidad_tecnica',
        'calidad_artistica',
        'originalidad',
    ];


     /**
     * Un voto pertenece a una foto
     */
    public function foto() {
        return $this->belongsTo(Foto::class);
    }
    /**
     * Relación: Un voto pertenece a un rally.
     */
    public function rally()
    {
        return $this->belongsTo(Rally::class);
    }
}
