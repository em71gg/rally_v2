<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;


class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        Role::firstOrCreate(['name' => 'administrador', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'gestor', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'creador', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'participante', 'guard_name' => 'web']);
    }
}
