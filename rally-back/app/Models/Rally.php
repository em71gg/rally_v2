<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Rally extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'category_id', 
        'propietario_id',
        //'uri_cover',
        'nombre',
        'descripcion',
        'premio1',
        'premio2',
        'premio3',
        'limite_fotos',
        'limite_votos',
        'fecha_inicio',
        'fecha_fin',
        'validado',
    ];

     /**
     * Relación n a 1 con el modelo Category.
     * Un rally sólo tiene una categoría.
     */
    public function category(){
        return $this->belongsTo(Category::class);
    }

    /**
     * Relación n a 1 con el modelo User.
     * Un rally sólo tiene un propietario.
     */
    public function propietario(){
        return $this->belongsTo(User::class);
    }

    /**
     * Relación n a m con el modelo User.
     * Un rally sólo tiene muchos participantes.
     */
    public function participantes(){
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    /**
     * Relación n a m con el modelo Foto.
     * Un rally sólo tiene muchos participantes.
     */
    public function fotos(){
        return $this->belongsToMany(Foto::class)->withTimestamps();
    }

    /**
     * En un rally se dan mucho resultados.
     */
    public function resultados() {
        return $this->hasMany(Resultado::class);
    }

     /**
     * En un rally se dan mucho resultados.
     */
    public function votos() {
        return $this->hasMany(Voto::class);
    }
}
