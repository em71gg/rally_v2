<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::firstOrCreate(['category' => 'Retrato']);
        Category::firstOrCreate(['category' => 'Tecnología']);
        Category::firstOrCreate(['category' => 'Salud']);
        Category::firstOrCreate(['category' => 'Deportes']);
        Category::firstOrCreate(['category' => 'Cultura']);
        Category::firstOrCreate(['category' => 'Viajes']);
        Category::firstOrCreate(['category' => 'Naturaleza']);
        Category::firstOrCreate(['category' => 'Moda']);
        Category::firstOrCreate(['category' => 'Actualidad']);
        Category::firstOrCreate(['category' => 'Ciencia']);
    }
}
