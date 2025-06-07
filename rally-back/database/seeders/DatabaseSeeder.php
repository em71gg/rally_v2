<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RolesTableSeeder::class,
        ]);
/*
        $user = User::factory()->create([
            'name' => 'Test User',
            'surname' => 'Test',
            'nickname' => 'tesu',
            'email' => 'test@example.com',
        ]);

        $user->assignRole('administrador');

        */
       
    }
}
