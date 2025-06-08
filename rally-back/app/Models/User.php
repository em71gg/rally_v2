<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'nickname',
        'email',
        'password',
        //'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    /**
     * Elimina los roles y permisos de un usuario borrado
     */
    protected static function booted()
    {
        static::deleting(function ($user) {
            $user->roles()->detach(); // Limpia roles
            $user->permissions()->detach(); // Limpia permisos directos
        });
    }

    /**
     * Un usuario puede crear muchos rallies, pero un rally sólo tiene un creador.
     */
    public function owns() {
        return $this->hasMany(Rally::class);
    }

    /**
     * Relación n:m entre rallies y participantes.
     */
    public function rallies() {
        return $this->belongsToMany(Rally::class)->withTimestamps();//withTimestampos me rellena created y updated_at en la tabla pivote
    }
    /**
     * Un usuario puede tener muchas fotos, pero una foto sólo tiene un usuario.
     */
    public function fotos() {
        return $this->hasMany(Foto::class);
    }
}
