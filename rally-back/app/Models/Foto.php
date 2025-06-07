<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    protected $fillable =[
        'user_id',
        'uri_imagen',
        'nombre',
        'validada',
    ];

    /**
     * Una foto pertenece a un usuario
     */
    public function users(){
        return $this->belongsTo(User::class);
    }

    /**
     * Una foto puede estar en muchos rallies
     */
    public function rallies(){
        return $this->belongsToMany(Rally::class)->withTimestamps();
    }

    /**
     * Una foto tiene muchos resultados
     */
    public function resultados() {
        return $this->hasMany(Resultado::class);
    }

    /**
     * Una foto puede tener muchos votos
     */
    public function votos() {
        return $this->hasMany(Voto::class);
    }
}
